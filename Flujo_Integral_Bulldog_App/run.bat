@echo off
title Bulldog Design - Flujo Maestro Interactivo
chcp 65001 >nul
cls

cd /d "%~dp0"

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python serve_app.py
) else (
    echo ===============================================================================
    echo      BULLDOG DESIGN — APLICACION DE FLUJO DE TRABAJO
    echo ===============================================================================
    echo.
    echo [!] Python no fue detectado en PATH. Abriendo directamente en el navegador...
    start "" "%~dp0app\index.html"
    pause
)

exit /b 0
