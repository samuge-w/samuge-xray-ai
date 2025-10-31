@echo off
:: Toggle DeepSeek Report Generation ON/OFF
:: Created by Claude Code for fast diagnosis results

echo ================================================================================
echo                    DEEPSEEK REPORT TOGGLE
echo ================================================================================
echo.
echo Current Mode:
findstr "USE_DEEPSEEK" .env
echo.
echo.
echo Choose mode:
echo.
echo [1] FAST MODE (Instant results, skip DeepSeek)
echo [2] FULL MODE (Wait for professional DeepSeek reports)
echo.
choice /C 12 /M "Select option"

if errorlevel 2 goto FULL
if errorlevel 1 goto FAST

:FAST
echo.
echo Setting FAST MODE - Results in 5-10 seconds!
powershell -Command "(Get-Content .env) -replace 'USE_DEEPSEEK=.*', 'USE_DEEPSEEK=false' | Set-Content .env"
echo.
echo [OK] FAST MODE enabled
echo      - OpenCLIP diagnosis: INSTANT
echo      - DeepSeek reports: DISABLED
echo      - Results: 5-10 seconds
echo.
goto END

:FULL
echo.
echo Setting FULL MODE - Professional reports enabled
powershell -Command "(Get-Content .env) -replace 'USE_DEEPSEEK=.*', 'USE_DEEPSEEK=true' | Set-Content .env"
echo.
echo [OK] FULL MODE enabled
echo      - OpenCLIP diagnosis: ENABLED
echo      - DeepSeek reports: ENABLED
echo      - Results: 30-90 seconds
echo.
goto END

:END
echo.
echo Restart the server for changes to take effect:
echo   1. Press Ctrl+C in server window
echo   2. Run START_LOCAL_TEST.bat again
echo.
pause
