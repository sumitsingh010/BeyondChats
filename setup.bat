@echo off
echo ========================================
echo BeyondChats Assignment - Quick Start
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo [2/4] Installing backend dependencies...
cd backend
if not exist node_modules (
    echo Installing packages... This may take a few minutes.
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies already installed
)
cd ..
echo.

echo [3/4] Installing frontend dependencies...
cd frontend
if not exist node_modules (
    echo Installing packages... This may take a few minutes.
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies already installed
)
cd ..
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Start Backend (in this window):
echo    cd backend
echo    npm start
echo.
echo 2. Start Frontend (in new window):
echo    cd frontend
echo    npm start
echo.
echo 3. Scrape articles (in new window):
echo    cd backend
echo    npm run scrape
echo.
echo ========================================
echo For detailed instructions, see START_HERE.md
echo ========================================
echo.
pause
