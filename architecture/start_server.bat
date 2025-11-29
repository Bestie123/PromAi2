@echo off
echo Starting local server on port 8000...
echo Open: http://localhost:8000/architecture_full_complete.html
echo Press Ctrl+C to stop
cd /d "%~dp0"
python -m http.server 8000
pause