@echo off
echo Starting simple HTTP server...
echo Open: http://localhost:8080/architecture_full_complete.html
cd /d "%~dp0"
php -S localhost:8080
pause