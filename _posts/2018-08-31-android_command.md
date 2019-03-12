---
layout: post
title: "Android的命令"
date: 2018-08-31
category: android逆向
tags: Android
---

## Tips
[oh-my-zsh ，“zsh: command not found: adb”解决方法](https://blog.csdn.net/yianemail/article/details/51693583)
 
	open .zshrc

	在# User configuration添加
	source ~/.bash_profile

	执行
	source .zshrc


## 关于Android的命令


	更新Android SDK

	$ adnroid update sdk --no-ui

**ADB**  
adb位于platform-tools文件夹，早期版本在tools文件夹内。  

	列出所有命令
	adb help all

	列出所有连接的Android设备和虚拟机
	adb devices

	将电脑上的文件复制到设备（通常存到SD卡）
	adb push <local> <remote>

	将设备上的文件复制到电脑
	adb pull <remote> <local>


**ADB和多设备**  

	$ adb devices
	$ adb -s xxxxx logcat
	$ adb logcat MyActivity:* *:S // <tag>:<prioroty>  *表示可能的值  AndroidRuntime:*参数 Android系统相关的日志信息以及由平台引起的应用程序异常


**Wi-Fi连接adb**  

	$ adb devices
	List of devices attached
	0000000  device
	$ adb tcpip 5555
	$ adb commect 192.168.1.104
	$ adb devices
	List of devices attached
	192.168.1.104:5555 device


**执行命令**  

	$ adb shell
	$ adb shell am startservice -a <intent action> // 启动service
	$ adb shell pm list packages // 列出所有已安装的包

**更多adb命令**  

[adb命令](http://developer.android.com/tools/help/adb.html)
