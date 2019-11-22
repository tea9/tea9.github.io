---
title: scrcpy记录
tags:
  - android
abbrlink: 4119910921
date: 2019-08-28 13:46:38
---


设备要求  
Android 5.0以上  

macos  

```
brew install scrcpy
```

打开usb调试  

```
启动scrcpy
scrcpy
获取序列号
adb devices 
指定设备
scrcpy -s a1171b8  你的设备ID
设置端口
scrcpy -p 27184
查看帮助
scrcpy --help
设置码率（默认8M）
scrcpy -b 8M
限制投屏尺寸
scrcpy -m 1024
```
wifi没测试成功  
```
192.168.50.228
adb devices
adb tcpip 5555
adb -s VBJ0218814008992 tcpip 6666
adb connect 192.168.1.xx:5555
```
关闭手机屏幕  
```
scrcpy --turn-screen-off
scrcpy -S
```
查看ip  
```
adb shell netcfg
```

## LINKS
[scrcpy](https://github.com/Genymobile/scrcpy)  
[scrcpy - Android无需ROOT的跨平台投屏工具](https://blog.csdn.net/aa464971/article/details/83349215)  
[Github开源Android投屏软件——Scrcpy](https://www.geekersq.cc/2019/06/github-android-scrcpy/)  
[Scrcpy 教程—教你打通手机和电脑](http://zuimeia.com/app/6771/?platform=2)  
