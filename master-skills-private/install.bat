@echo off
REM Real AI Examples - Master Skills Installer (Windows)
REM This script installs all 5 Master Skills from the extracted ZIP

echo.
echo ==============================================
echo Real AI Examples - Master Skills Installer
echo ==============================================
echo.

REM Detect the skills folder
if exist "%USERPROFILE%\.claude\skills" (
    set SKILLS_DIR=%USERPROFILE%\.claude\skills
    echo Found Claude Code skills folder: %SKILLS_DIR%
) else if exist "%USERPROFILE%\.agents\skills" (
    set SKILLS_DIR=%USERPROFILE%\.agents\skills
    echo Found agents skills folder: %SKILLS_DIR%
) else (
    set SKILLS_DIR=%USERPROFILE%\.claude\skills
    echo Creating skills folder: %SKILLS_DIR%
    mkdir "%SKILLS_DIR%"
)

echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

REM Check if skill files exist
if exist "%SCRIPT_DIR%sales-ops.md" (
    echo Installing Master Skills from local files...
    echo.
    
    REM Copy skill files (skip README files)
    for %%f in ("%SCRIPT_DIR%*.md") do (
        set filename=%%~nxf
        if not "%%~nxf"=="README.md" (
            if not "%%~nxf"=="README-private.md" (
                copy "%%f" "%SKILLS_DIR%" >nul
                echo Installed: %%~nxf
            )
        )
    )
    
    echo.
    echo ==============================================
    echo Installation Complete!
    echo.
    echo All 5 Master Skills have been copied to:
    echo   %SKILLS_DIR%
    echo.
    echo Usage examples:
    echo   "From a sales-ops standpoint, review my pipeline"
    echo   "Using the marketing-ops framework, audit this campaign"
    echo   "From a seo-content perspective, analyze this page"
    echo.
    echo ==============================================
    echo.
    pause
) else (
    echo Error: Skill files not found in this directory
    echo.
    echo Make sure you:
    echo 1. Extracted the ZIP file completely
    echo 2. Are running this script from the extracted folder
    echo.
    echo If you downloaded the ZIP, extract it first:
    echo   1. Right-click on the ZIP file
    echo   2. Select "Extract All..."
    echo   3. Open the extracted folder
    echo   4. Double-click install.bat
    echo.
    pause
)
