@echo off
:: Set Environment Variables for X-Ray AI (Local Development)
:: This script sets environment variables for the current session only
:: NEVER commit your actual API keys to git!

echo ================================================================================
echo                  X-RAY AI - ENVIRONMENT SETUP
echo ================================================================================
echo.
echo This script will set environment variables for local development.
echo Variables are session-only and will NOT be saved permanently.
echo.
echo ================================================================================

:: Check if API key is already set
if defined DEEPSEEK_API_KEY (
    echo [OK] DEEPSEEK_API_KEY is already set
    echo     Key prefix: %DEEPSEEK_API_KEY:~0,10%...
    echo.
) else (
    echo [!] DEEPSEEK_API_KEY is not set
    echo.
    echo Please enter your OpenRouter API key:
    echo (Get it from: https://openrouter.ai/keys)
    echo Format: sk-or-v1-xxxxxxxx...
    echo.
    set /p DEEPSEEK_API_KEY="Paste your API key here: "

    if not defined DEEPSEEK_API_KEY (
        echo.
        echo [ERROR] No API key provided!
        pause
        exit /b 1
    )

    echo.
    echo [OK] DEEPSEEK_API_KEY has been set for this session
    echo     Key prefix: %DEEPSEEK_API_KEY:~0,10%...
)

echo.
echo ================================================================================
echo Environment variables are ready!
echo These will be available for this terminal session only.
echo.
echo Next steps:
echo 1. Run START_LOCAL_TEST.bat to start the server
echo 2. Or run: node server.js
echo ================================================================================
echo.

:: Export to current session
set PYTHON_PATH=py

echo Press any key to continue...
pause >nul
