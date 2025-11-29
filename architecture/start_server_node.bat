@echo off
echo Starting Node.js server on port 3000...
echo Open: http://localhost:3000/architecture_full_complete.html
echo Press Ctrl+C to stop
cd /d "%~dp0"
npx http-server -p 3000 -c-1
pause