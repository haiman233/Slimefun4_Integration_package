@echo off
title 云铭生存服 - 启动时间%date% %time%

:: 配置部分
set SERVER_JAR=purpur-1.21.1.jar
:: 设置最小运行内存
set MIN_MEM=4G
:: 设置最大的运行内存
set MAX_MEM=8G
:: 服务器崩溃后自动重启时间
set RESTART_DELAY=5

:start
echo [%date% %time%] 正在启动服务器...
jdk-21\bin\java.exe -Xms%MIN_MEM% -Xmx%MAX_MEM% -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -jar purpur-1.21.1.jar nogui

:: 检查退出状态
if %errorlevel% == 0 (
    echo [%date% %time%] 服务器正常关闭,%RESTART_DELAY%秒后重启...
    timeout /t %RESTART_DELAY% >nul
    goto start
) else (
    echo [%date% %time%] 服务器异常关闭，%RESTART_DELAY%秒后重启...
    timeout /t %RESTART_DELAY% >nul
    goto start
)