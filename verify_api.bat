@echo off
echo NCF Pocket Guide Creator API Verification Tool Launcher
echo =======================================================
echo.

:menu
echo Choose a verification tool to run:
echo 1. Python Verification Script
echo 2. PowerShell Verification Script
echo 3. GUI Verification Tool
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto python
if "%choice%"=="2" goto powershell
if "%choice%"=="3" goto gui
if "%choice%"=="4" goto exit

echo Invalid choice. Please try again.
goto menu

:python
echo.
echo Running Python verification script...
python verify_api.py
echo.
pause
goto menu

:powershell
echo.
echo Running PowerShell verification script...
powershell -ExecutionPolicy Bypass -File .\verify_api.ps1
echo.
pause
goto menu

:gui
echo.
echo Launching GUI verification tool...
python api_verifier_gui.py
goto menu

:exit
echo Goodbye!
exit /b 0
