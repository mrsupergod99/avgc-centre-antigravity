@echo off
title AVGC Campus 3D Architectural Visualizer
echo Starting AVGC 3D Architectural Visualization Server...
powershell -ExecutionPolicy Bypass -File "%~dp0serve-avgc.ps1"
pause
