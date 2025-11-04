@echo off
REM CARVI(cu) Electron Desktop App Builder for Windows
REM This script builds the Windows .msi installer

echo ==================================
echo CARVI(cu) Desktop App Builder
echo ==================================
echo.

REM Check if SERVER_URL is set
if "%SERVER_URL%"=="" (
    echo WARNING: SERVER_URL not set!
    echo Please set your deployed Replit URL:
    echo set SERVER_URL=https://your-app.replit.app
    echo.
    set /p input_url="Enter your Replit app URL (or press Enter to use placeholder): "
    if not "!input_url!"=="" (
        set SERVER_URL=!input_url!
        echo SERVER_URL set to: %SERVER_URL%
    ) else (
        echo Using placeholder URL - you'll need to update electron/main.js manually
    )
)

echo.
echo Building Electron app for Windows...
echo.

REM Build the .msi installer
call npx electron-builder --win --config electron-builder.yml

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==================================
    echo Build completed successfully!
    echo ==================================
    echo.
    echo Your .msi installer is ready at:
    echo dist-electron\CARVI(cu)-Setup-1.0.0.msi
    echo.
    dir dist-electron\*.msi
    echo.
) else (
    echo.
    echo Build failed. Please check the errors above.
    exit /b 1
)
