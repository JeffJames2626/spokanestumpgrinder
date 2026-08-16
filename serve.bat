@echo off
REM Preview the site at http://localhost:8000  (Ctrl+C to stop)
cd /d "%~dp0"
python -m http.server 8000
