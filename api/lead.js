// POST /api/lead — creates the website lead in Homeworks (customer of type Lead + a property with the stump
// details and photos), then sends two emails: an alert to Jeff and a thank-you to the customer. Called by
// the request form's JS (components/v2/RequestDialog.astro). If the Homeworks part fails the browser falls
// back to the FormSubmit email, so a lead is never lost. Email failures are logged, never fatal.
//
// Env (set in Vercel → Settings → Environment Variables; never in the repo):
//   HOMEWORKS_USERNAME / HOMEWORKS_PASSWORD  — a Homeworks user for the website (ideally a dedicated one)
//   RESEND_API_KEY         — Resend (resend.com) key for the two emails; without it, emails are skipped + logged
//   LEAD_NOTIFY_TO         optional, default jeff@spokanestumpgrinder.com
//   MAIL_FROM              optional, default "Spokane Stump Grinder <requests@spokanestumpgrinder.com>" (domain must be verified in Resend)
//   HOMEWORKS_API_URL      optional, default https://api.home.works
//   HOMEWORKS_LEAD_TYPE_ID optional, default 2356  (customer type "Lead")
//   HOMEWORKS_SOURCE_ID    optional, default 14953 (customer source "Spokane Stump Grinder Website")
// See CLAUDE.md "Intake form".

export const config = { maxDuration: 30 };

const API = (process.env.HOMEWORKS_API_URL || 'https://api.home.works').replace(/\/$/, '');
const RESEND = (process.env.RESEND_API_URL || 'https://api.resend.com').replace(/\/$/, '');
const LEAD_TYPE_ID = Number(process.env.HOMEWORKS_LEAD_TYPE_ID || 2356);
const SOURCE_ID = Number(process.env.HOMEWORKS_SOURCE_ID || 14953);
const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'jeff@spokanestumpgrinder.com';
const MAIL_FROM = process.env.MAIL_FROM || 'Spokane Stump Grinder <requests@spokanestumpgrinder.com>';
const SITE = 'https://www.spokanestumpgrinder.com/';
const PHONE = '509-434-9554', TEL = '+15094349554';
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
const esc = (v) => s(v, 5000).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// WA unless the ZIP is North Idaho (838xx)
const stateFor = (zip, city) => (/^838/.test(zip) ? 'ID' : /coeur|hayden|post falls|sandpoint|priest|rathdrum|athol|spirit lake/i.test(city) ? 'ID' : 'WA');

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = ''; req.setEncoding('utf8');
    req.on('data', (c) => { data += c; if (data.length > 6_000_000) { reject(new Error('body too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(new Error('invalid JSON')); } });
    req.on('error', reject);
  });
}

// The lead, as one readable block for Homeworks (customer description + property notes).
function notesFor(L, origin) {
  return [
    `Website request — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC (${origin || 'spokanestumpgrinder.com'})`,
    `Service: ${L.service}`,
    `Phone: ${L.phone || '(not given)'} · Email: ${L.email || '(not given)'}`,
    L.notes ? `Notes: ${L.notes}` : 'Notes: (none)',
  ].join('\n');
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

// ---- emails (Resend; plain fetch, no SDK) ----
async function sendEmail(msg) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { skipped: 'RESEND_API_KEY not set' };
  const r = await fetch(RESEND + '/emails', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key }, body: JSON.stringify({ from: MAIL_FROM, ...msg }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('Resend HTTP ' + r.status + ': ' + (j.message || j.error || ''));
  return { id: j.id };
}

function alertEmail(L, hw, photoUrls) {
  const rows = [['Name', L.name], ['Phone', L.phone || '(not given)'], ['Email', L.email || '(not given)'], ['Address', L.address || `${L.street}, ${L.city}, ${L.state} ${L.zip}`.trim()], ['Service', L.service], ['Notes', L.notes || '(none)'], ['Homeworks', hw ? `customer ${hw.customerId}${hw.created ? ' (new)' : ' (existing)'}, property ${hw.propertyId}` : 'not created — see Vercel log'], ['Photos', photoUrls.length ? `${photoUrls.length} attached in Homeworks` : 'none']];
  const text = [`New stump request from the website`, '', ...rows.map(([k, v]) => `${k}: ${v}`), ...(photoUrls.length ? ['', 'Photos:', ...photoUrls] : []), '', `Reply to this email to answer ${L.name} directly, or call/text ${L.phone}.`].join('\n');
  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.5;color:#161616"><h2 style="margin:0 0 12px">New stump request — ${esc(L.name)}, ${esc(L.city)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>${photoUrls.length ? `<p style="margin:16px 0 8px"><strong>Photos</strong></p><div>${photoUrls.map((u) => `<a href="${esc(u)}" style="display:inline-block;margin:0 8px 8px 0"><img src="${esc(u)}?width=320&amp;height=320&amp;format=auto" alt="" style="width:160px;height:160px;object-fit:cover;border-radius:8px"></a>`).join('')}</div>` : ''}<p style="margin-top:16px;color:#666">${L.email ? `Reply to this email to answer ${esc(L.name)} directly` : 'No email given'}${L.phone ? ` — call/text <a href="tel:${esc(L.phone)}">${esc(L.phone)}</a>` : ''}.</p></div>`;
  return { to: [NOTIFY_TO], reply_to: L.email || undefined, subject: `New stump request — ${L.name}, ${L.city}`, text, html };
}

function thankYouEmail(L) {
  const first = L.name.split(/\s+/)[0];
  const summary = [['Service', L.service], ['Address', L.address || `${L.street}, ${L.city}`], ['Phone', L.phone || '(not given)'], ['Notes', L.notes || '(none)']];
  const steps = ['We review the details. If your notes cover the size and access, we can often price the job without coming out.', "You get it in writing. Scope and price, spelled out — what's included and what isn't — before anything is scheduled.", "You pick a date. Approve the estimate and we'll find a slot that fits the job and the equipment it needs.", "We grind and clean up, and walk the finished spot with you if you're home."];
  const text = [`Hi ${first},`, '', "Thanks for reaching out — your request is in. We'll look over the details and any photos, and follow up with a written estimate. No obligation, no pressure.", '', 'What you sent us:', ...summary.map(([k, v]) => `  ${k}: ${v}`), '', 'What happens next:', ...steps.map((t, i) => `  ${i + 1}. ${t}`), '', `Need it sooner, or want to add photos? Call or text ${PHONE}. You can also book a free on-site visit: ${SITE}booking.html`, '', '— Jeff, Spokane Stump Grinder', `${SITE.replace(/\/$/, '')} · ${PHONE}`].join('\n');
  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.55;color:#161616;max-width:600px"><p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#ba0000;font-weight:700">Request received</p><h2 style="margin:0 0 12px">Thanks, ${esc(first)} — we've got it.</h2><p>We'll look over the details and any photos, and follow up with a written estimate. No obligation, no pressure.</p><p style="margin:18px 0 6px"><strong>What you sent us</strong></p><table cellpadding="5" style="border-collapse:collapse;background:#f6f3ed;border-radius:8px">${summary.map(([k, v]) => `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table><p style="margin:18px 0 6px"><strong>What happens next</strong></p><ol style="padding-left:20px;margin:0">${steps.map((t) => `<li style="margin:0 0 6px">${esc(t)}</li>`).join('')}</ol><p style="margin:18px 0 0">Need it sooner, or want to add photos? Call or text <a href="tel:${TEL}" style="color:#ba0000;font-weight:600">${PHONE}</a>. You can also <a href="${SITE}booking.html" style="color:#ba0000">book a free on-site visit</a>.</p><p style="margin:18px 0 0;color:#666">— Jeff, Spokane Stump Grinder<br><a href="${SITE}" style="color:#666">${SITE.replace(/^https:\/\//, '').replace(/\/$/, '')}</a> · ${PHONE}</p></div>`;
  return { to: [L.email], reply_to: NOTIFY_TO, subject: "We got your request — Spokane Stump Grinder", text, html };
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('content-type', 'application/json');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ ok: false, error: 'POST only' })); }
  let b;
  try { b = await readBody(req); } catch (e) { res.statusCode = 400; return res.end(JSON.stringify({ ok: false, error: e.message })); }

  // bot / validation gate (mirrors the form's own rules)
  if (b.website || b._honey) { res.statusCode = 200; return res.end(JSON.stringify({ ok: true })); } // honeypot: pretend success
  const L = {
    name: s(b.name, 120), email: s(b.email, 200).toLowerCase(), phone: s(b.phone, 40),
    address: s(b.address, 250), street: s(b.street, 200), city: s(b.city, 100), state: s(b.state, 2).toUpperCase(), zip: digits(b.zip).slice(0, 5),
    service: s(b.service, 120) || 'Not sure — help me decide', notes: s(b.notes, 2000),
  };
  if (L.email && !isEmail(L.email)) L.email = '';
  if (digits(L.phone).length < 7) L.phone = '';
  // the address box is one field; Google Places fills street/city/state/zip behind it — if it didn't
  // (no key, no pick, typed in full) split "street, city, state zip" ourselves as best we can
  if (!L.street && L.address) {
    const bits = L.address.replace(/,?\s*(USA|United States)$/i, '').split(',').map((x) => x.trim()).filter(Boolean);
    L.street = bits[0] || L.address;
    L.city = L.city || (bits[1] || '').replace(/\s+[A-Z]{2}(\s+\d{5})?$/, '').trim();
    const tail = bits.slice(1).join(' ');
    const st = /\b(WA|ID)\b/i.exec(tail); if (st && !L.state) L.state = st[1].toUpperCase();
    const z = /\b(\d{5})\b/.exec(tail); if (z && !L.zip) L.zip = z[1];
  }
  if (!L.state) L.state = stateFor(L.zip, L.city);
  if (!L.name || (!L.email && !L.phone) || !L.street) { res.statusCode = 422; return res.end(JSON.stringify({ ok: false, error: 'missing required fields' })); }
  const origin = s(req.headers.origin || req.headers.referer, 120);
  const notes = notesFor(L, origin);

  let hw = null; const photoReport = []; let photoUrls = [];
  try {
    // 1. existing customer? (by email, then by cell) — reuse rather than duplicate
    const found = await gql(
      'query($e: String!, $c: String!) { byEmail: customers(where: { email: { equals: $e }, isDeleted: false }, take: 1) { id fullName } byCell: customers(where: { cell: { contains: $c }, isDeleted: false }, take: 1) { id fullName } }',
      { e: L.email || 'no-email@none.invalid', c: digits(L.phone).slice(-10) || '0000000000' }
    );
    let customer = (found.byEmail && found.byEmail[0]) || (found.byCell && found.byCell[0]) || null;
    let created = false;
    if (!customer) {
      const parts = L.name.split(/\s+/); const firstName = parts.shift(); const lastName = parts.join(' ');
      const r = await gql('mutation($in: CustomerInput!) { createCustomer(input: $in) { id fullName } }', {
        in: {
          fullName: L.name, firstName, lastName: lastName || undefined, email: L.email || undefined, cell: L.phone || undefined,
          address: { street1: L.street, city: L.city, state: L.state, zip: L.zip || undefined, country: 'US' },
          customerTypeId: LEAD_TYPE_ID, sourceId: SOURCE_ID, tags: TAGS, description: notes,
          isReceiveEmail: true, isReceiveText: true, isReceivePhone: true,
        },
      });
      customer = r.createCustomer; created = true;
    }
    // 2. the property at the service address, with the details + photos
    const mediaFileKeys = await uploadPhotos(b.photos, photoReport).catch((e) => { console.error('photos skipped:', e.message); return []; });
    const p = await gql('mutation($in: PropertyInput!) { createProperty(input: $in) { id media { url } } }', {
      in: { customerId: customer.id, name: L.city ? `${L.street}, ${L.city}` : L.street, address: { street1: L.street, city: L.city, state: L.state, zip: L.zip || undefined, country: 'US' }, notes, tags: TAGS, mediaFileKeys: mediaFileKeys.length ? mediaFileKeys : undefined },
    });
    photoUrls = (p.createProperty.media || []).map((m) => m.url).filter(Boolean);
    hw = { customerId: customer.id, created, propertyId: p.createProperty.id, photos: mediaFileKeys.length };
  } catch (e) {
    console.error('lead failed:', e.message);
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, error: 'homeworks unavailable' }));
  }

  // 3. emails — never fatal; the lead is already safe in Homeworks
  const mail = {};
  await Promise.all([
    sendEmail(alertEmail(L, hw, photoUrls)).then((r) => { mail.alert = r; }, (e) => { mail.alert = { error: e.message }; }),
    L.email ? sendEmail(thankYouEmail(L)).then((r) => { mail.thanks = r; }, (e) => { mail.thanks = { error: e.message }; }) : Promise.resolve(mail.thanks = { skipped: 'no email given' }),
  ]);

  console.log(JSON.stringify({ lead: 'ok', ...hw, photosIn: (b.photos || []).length, photoReport, mail }));
  res.statusCode = 200;
  return res.end(JSON.stringify({ ok: true, ...hw, mail: { alert: !!(mail.alert && mail.alert.id), thanks: !!(mail.thanks && mail.thanks.id) } }));
}
