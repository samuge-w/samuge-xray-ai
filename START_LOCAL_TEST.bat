@echo off
:: X-Ray AI Local Test Server - Auto-closes in 15 minutes
:: Created by Claude Code for quick local testing

echo ================================================================================
echo                    X-RAY DIAGNOSIS AI - LOCAL TEST SERVER
echo ================================================================================
echo.
echo Starting local server at: http://localhost:10000
echo Server will auto-close in 15 minutes
echo.
echo Close this window to stop the server manually
echo ================================================================================
echo.

:: Set console colors for better visibility
color 0A

:: Navigate to project directory
cd /d "C:\Users\Administrator\Downloads\xray-diagnosis-ai"

:: Check if environment variable is set
if not defined DEEPSEEK_API_KEY (
    echo.
    echo [WARNING] DEEPSEEK_API_KEY environment variable not set!
    echo.
    echo Option 1: Run SET_ENV_VARS.bat first to set your API key
    echo Option 2: Set it now
    echo.
    choice /C 12 /M "Choose an option"

    if errorlevel 2 (
        echo.
        echo Please enter your OpenRouter API key:
        set /p DEEPSEEK_API_KEY="Paste key here: "

        if not defined DEEPSEEK_API_KEY (
            echo [ERROR] No API key provided!
            pause
            exit /b 1
        )

        echo [OK] API key set for this session
    ) else (
        call SET_ENV_VARS.bat
        if errorlevel 1 (
            echo [ERROR] Failed to set environment variables
            pause
            exit /b 1
        )
    )
)

echo.
echo [OK] DEEPSEEK_API_KEY: %DEEPSEEK_API_KEY:~0,10%...
echo.

:: Set Python path
set PYTHON_PATH=py

:: Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo [WARNING] node_modules not found. Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

:: Show environment info
echo [INFO] Node version:
node --version
echo.
echo [INFO] Python version:
python --version
echo.

:: Open browser after 3 seconds delay
echo [INFO] Browser will open in 3 seconds...
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:10000"

:: Start the server with full debugging output
echo [INFO] Starting server... (Press Ctrl+C to stop)
echo.
echo ================================================================================
echo                           SERVER LOGS BELOW
echo ================================================================================
echo.
echo [DEBUG MODE] All errors and logs will be displayed below
echo.

:: Start server in foreground to see all debug output
node server.js

:: This line only runs when server stops (Ctrl+C or error)
echo.
echo ================================================================================
echo [INFO] Server stopped
echo ================================================================================
echo.
pause
