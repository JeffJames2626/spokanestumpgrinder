// POST /api/lead — creates the website lead in Homeworks (customer of type Lead + a property with the stump
// details and photos). Called by the request form's JS (components/v2/RequestDialog.astro). If anything here
// fails the browser falls back to the FormSubmit email, so a lead is never lost.
//
// Env (set in Vercel → Settings → Environment Variables; never in the repo):
//   HOMEWORKS_USERNAME / HOMEWORKS_PASSWORD  — a Homeworks user for the website (ideally a dedicated one)
//   HOMEWORKS_API_URL      optional, default https://api.home.works
//   HOMEWORKS_LEAD_TYPE_ID optional, default 2356  (customer type "Lead")
//   HOMEWORKS_SOURCE_ID    optional, default 14953 (customer source "Spokane Stump Grinder Website")
// See CLAUDE.md "Intake form".

export const config = { maxDuration: 30 };

const API = (process.env.HOMEWORKS_API_URL || 'https://api.home.works').replace(/\/$/, '');
const LEAD_TYPE_ID = Number(process.env.HOMEWORKS_LEAD_TYPE_ID || 2356);
const SOURCE_ID = Number(process.env.HOMEWORKS_SOURCE_ID || 14953);
const TAGS = ['Spokane Stump Grinder', 'Website lead'];
const MAX_PHOTOS = 6, MAX_PHOTO_BYTES = 2_500_000;

// ---- auth: log in once per warm instance, re-login a minute before expiry ----
let session = null; // { token, exp }
async function token() {
  if (session && Date.now() < session.exp - 60_000) return session.token;
  const user = process.env.HOMEWORKS_USERNAME, pass = process.env.HOMEWORKS_PASSWORD;
  if (!user || !pass) throw new Error('HOMEWORKS_USERNAME / HOMEWORKS_PASSWORD not set');
  const r = await fetch(API + '/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: user, password: pass }) });
  if (!r.ok) throw new Error('Homeworks login failed: HTTP ' + r.status);
  const j = await r.json();
  const t = j.accessToken || j.access_token;
  if (!t) throw new Error('Homeworks login: no accessToken in response');
  const ttl = Number(j.expiresIn || j.expires_in || 3600) * 1000;
  session = { token: t, exp: Date.now() + Math.min(ttl, 12 * 3600 * 1000) };
  return t;
}

async function gql(query, variables) {
  const r = await fetch(API + '/graphql', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + (await token()) }, body: JSON.stringify({ query, variables }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || (j.errors && j.errors.length)) {
    const msg = (j.errors && j.errors.map((e) => e.message).join('; ')) || ('HTTP ' + r.status);
    const err = new Error('Homeworks GraphQL: ' + msg); err.status = r.status; throw err;
  }
  return j.data;
}

// ---- helpers ----
const s = (v, max = 500) => (v == null ? '' : String(Array.isArray(v) ? v.join(', ') : v)).trim().slice(0, max);
const digits = (v) => s(v).replace(/\D/g, '');
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = ''; req.setEncoding('utf8');
    req.on('data', (c) => { data += c; if (data.length > 6_000_000) { reject(new Error('body too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(new Error('invalid JSON')); } });
    req.on('error', reject);
  });
}

// The lead details, as one readable block for the property notes (and the customer description).
function notesFor(b, origin) {
  const lines = [
    `Website request — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC (${origin || 'spokanestumpgrinder.com'})`,
    `Service: ${s(b.service)}`,
    `Stumps: ${s(b.count) || '1'} · Largest: ${s(b.diameter)}`,
    `Access: ${s(b.access)}`,
    `After the stump: ${s(b.after)}`,
    b.nearby && b.nearby.length ? `Nearby: ${s(b.nearby)}` : null,
    `Preferred contact: ${s(b.contact)}`,
    b.heard ? `Heard about us: ${s(b.heard)}` : null,
    b.notes ? `Notes: ${s(b.notes, 2000)}` : null,
  ].filter(Boolean);
  return lines.join('\n');
}

async function uploadPhotos(photos, report) {
  const keys = [];
  for (const p of (photos || []).slice(0, MAX_PHOTOS)) {
    const r = { name: s(p && p.name, 80), srcType: s(p && p.srcType, 40), srcSize: Number(p && p.srcSize) || 0, browser: s(p && p.reason, 120) };
    report.push(r);
    if (!p || typeof p.data !== 'string' || !p.data) { r.result = 'no data from browser'; continue; }
    const type = /^image\/(jpeg|png|webp)$/.test(p.type || '') ? p.type : 'image/jpeg';
    const buf = Buffer.from(p.data, 'base64');
    if (!buf.length) { r.result = 'empty'; continue; }
    if (buf.length > MAX_PHOTO_BYTES) { r.result = 'too large after shrink: ' + buf.length; continue; }
    try {
      const { createUpload } = await gql('mutation($t: String!, $n: SafeInt!) { createUpload(contentType: $t, size: $n) { key uploadUrl } }', { t: type, n: buf.length });
      const put = await fetch(createUpload.uploadUrl, { method: 'PUT', headers: { 'content-type': type }, body: buf });
      if (!put.ok) { r.result = 'S3 PUT failed: HTTP ' + put.status; continue; }
      keys.push(createUpload.key); r.result = 'uploaded ' + buf.length + ' B';
    } catch (e) { r.result = 'upload error: ' + e.message; }
  }
  return keys;
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('content-type', 'application/json');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ ok: false, error: 'POST only' })); }
  let b;
  try { b = await readBody(req); } catch (e) { res.statusCode = 400; return res.end(JSON.stringify({ ok: false, error: e.message })); }

  // bot / validation gate (mirrors the form's own rules)
  if (b.website || b._honey) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true })); } // honeypot: pretend success
  const name = s(b.name, 120), email = s(b.email, 200).toLowerCase(), phone = s(b.phone, 40), street = s(b.street, 200), city = s(b.city, 100);
  if (!name || !isEmail(email) || digits(phone).length < 7 || !street || !city) { res.statusCode = 422; return res.end(JSON.stringify({ ok: false, error: 'missing required fields' })); }
  const state = s(b.state, 2).toUpperCase() || 'WA', zip = digits(b.zip).slice(0, 5);
  const origin = s(req.headers.origin || req.headers.referer, 120);
  const notes = notesFor(b, origin);

  try {
    // 1. existing customer? (by email, then by cell) — reuse rather than duplicate
    const found = await gql(
      'query($e: String!, $c: String!) { byEmail: customers(where: { email: { equals: $e }, isDeleted: false }, take: 1) { id fullName } byCell: customers(where: { cell: { contains: $c }, isDeleted: false }, take: 1) { id fullName } }',
      { e: email, c: digits(phone).slice(-10) || '0000000000' }
    );
    let customer = (found.byEmail && found.byEmail[0]) || (found.byCell && found.byCell[0]) || null;
    let created = false;
    if (!customer) {
      const parts = name.split(/\s+/); const firstName = parts.shift(); const lastName = parts.join(' ');
      const r = await gql('mutation($in: CustomerInput!) { createCustomer(input: $in) { id fullName } }', {
        in: {
          fullName: name, firstName, lastName: lastName || undefined, email, cell: phone,
          address: { street1: street, city, state, zip: zip || undefined, country: 'US' },
          customerTypeId: LEAD_TYPE_ID, sourceId: SOURCE_ID, tags: TAGS,
          description: notes,
          isReceiveEmail: true, isReceiveText: s(b.contact) !== 'Email', isReceivePhone: true,
        },
      });
      customer = r.createCustomer; created = true;
    }

    // 2. the property at the service address, with the stump details + photos
    const photoReport = [];
    const mediaFileKeys = await uploadPhotos(b.photos, photoReport).catch((e) => { console.error('photos skipped:', e.message); return []; });
    const p = await gql('mutation($in: PropertyInput!) { createProperty(input: $in) { id } }', {
      in: { customerId: customer.id, name: `${street}, ${city}`, address: { street1: street, city, state, zip: zip || undefined, country: 'US' }, notes, tags: TAGS, mediaFileKeys: mediaFileKeys.length ? mediaFileKeys : undefined },
    });

    console.log(JSON.stringify({ lead: 'ok', customerId: customer.id, created, propertyId: p.createProperty.id, photos: mediaFileKeys.length, photosIn: (b.photos || []).length, photoReport }));
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, customerId: customer.id, propertyId: p.createProperty.id, created, photos: mediaFileKeys.length }));
  } catch (e) {
    console.error('lead failed:', e.message);
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'homeworks unavailable' }));
  }
}
