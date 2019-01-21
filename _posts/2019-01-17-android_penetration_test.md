---
layout: post
title: "android渗透测试学习笔记"
date: 2019-01-17
category: android逆向
tags: android逆向
---
《Android渗透测试学习手册》写的学习笔记  

## 工具

- ProGuard 压缩、优化和混淆Java字节码的工具
- DashO java混淆器代码保护

## links

[attify/lot exploitation/penetration testing](https://www.attify.com/)  
[Drozer](https://labs.mwrinfosecurity.com/tools/drozer/)    
[Exploit-Me漏洞](http://labs.securitycompass.com/exploit-me/)   


## Android Debug Bridge adb

	$ adb devices //连接设备

	$ adb shell //与设备shell交互

		ps //正在运行的进程
			system 系统拥有
			root 根进程
			radio 电话和无线电相关的进程
			app_ 用户已下载的所有应用程序 正在运行

	$ adb kill-server //杀死服务器
	$ adb start-server //启动服务器

	$ adb shell pm list packages //pm包管理器 工具获取所有已安装的软件包列表

	$ adb shell dumpsys meminfo //获取所有应用程序及其当前内存列表

	$ adb logcat -d -f /data/local/logcats.log
	$ adb logcat -d -f /sdcard/xx.log // 保存logcat日志
		-d标志指定转储完整日志文件并退出
		-f标志指定写入文件而不是在终端打印

### 路径
	
	二进制文件
	/system/bin
	/system/xbin

	应用数据
	/data/data

		应用程序 文件 数据库 缓存
		/data/data/xx.xx.xx # ls
		cache
		databases
		files
		lib

	安装文件
	/data/apk

	Play商店应用
	/data/app-private

	密码锁定路径
	password.key  gesture.key
	/data/system

	cd /data/system
	rm gesture.key

	组和权限
	platform.xml
	/system/etc/permissions/
	cat platform.xml

	sd卡
	/mnt/sdcard/

	version
	cat /proc/version

## 命令

	android虚拟设备的列表
	android list avd

## MonkeyRunner

	adb shell
	# monkey 10 //10个自动化触摸，敲击和事件来测试应用程序

## Burp Suite

[download](http://portswigger.net/burp/download.html)  
	
	java -jar burp-suite.jar

	启动模拟器与bp代理

	emulator -avd [name of the avd] -http-proxy 127.0.0.1:8080
	emulator.exe -avd AttifyAVD -http-proxy 127.0.0.1:8080

## APKtool

[download](https://code.google.com/p/android-apktool/downloads/list)  

apktool安装在/usr/bin中  

.dex文件转换为smali文件  

[smali-wiki](https://github.com/JesusFreke/smali/wiki)  

	反编译
	apktool d [app-name].apk // d 标示反编译
	构建
	apktool b [decompiled folder name] [target-app-name].apk

## Virtuous Ten Studio (VTS) 只能在Windows环境中运行
[download](http://www.virtuous-ten-studio.com)  

与Apktool类似功能，VTS提供一个漂亮的图形界面

## dex2jar******

[download](https://code.google.com/p/dex2jar)  

dex2jar

win:

	d2j-dex2jar.bat "xx.apk" dex2jar xx.apk -> xx.jar

mac:
	
	sh d2j-dex2jar.sh

## JD-GUI

打开jar文件  
[download](http://jd.benow.ca)  



## 签名

	检查应用程序签名
	$ jarsigner -verify -certs -verbose testing.apk

	解压缩.apk文件 解析META-INF文件夹中出现的CERT.RSA文件的ASCII内容 以获取签名

	$unzip testing.apk
	$cd META-INF
	$openssl pkcs7 -in CERT.RSA -print_certs -inform DER -out out.cer
	$cat out.cer

## Android启动流程

	解锁引导加载程序
	Nexus 7
	$fastboot oem unlock

### 创建自己的Bootloader

在引导加载程序启动内核并启动init之后，它挂载Android系统运行的一些重要目录  
	
	/dev /sys /proc

	init从配置文件init.rc和init.[device-name].rc中获取自己的配置，在某些情况下从位于相同位置的.sh文件获取自己的配置

	$ls -l | grep 'init'

	# cat init.rc

	加载时使用的属性
	location/system/build.prop
	system/build.prop

	一但所有东西被加载，init最后会加载一个称为Zygote的进程，负责以最小空间加载Dalvik虚拟机和共享库，来加快整个进程的加载速度。
	一旦完成整个引导过程，系统发送BOOT_COMPLETED的广播，许多应用程序可能使用称为广播接收器的Android应用程序中的组件来监听。

## Android应用程序拆解
	

- Classes.dex 文件
- AndroidManifest.xml 文件
- META-INF 文件夹
- resources.arsc 文件
- res 文件夹
- assets 文件夹
- lib 文件夹

---

	unzip -l simple_game.apk // -l 展示压缩包内容
	file simple_game.apk //查看是否是一个有效的压缩包

## 审计Android应用******

ContentProvider(内容提供器)泄露

所有ContentProvider具有唯一的统一资源标识符(URI)以便被识别和查询。  
命名标准惯例以content://开始  
AndroidAPI版本低于17 ContentProvider默认属性时始终导出。
需要在AndroidManifest.xml文件检查ContentProvider  

	<provider
		android:name="com.test.example.DataProvider"
		android:authorities="com.test.example.DataProvider">
	</provider>

example:  

1. 反编译apk  
2. 查看AnroidManifest.xml文件中的ContentProvider  
3. `grep -R 'content://'`  
4. `adb install vulnerable-app.apk`  
5. 创建另一个没有任何权限的app来查询ContentProvider，然后查询漏洞app的ContentProvider。  
	`adb shell content query --uri [URI of the content provider]`  
	`adb shell content query --uri content://com.xx.xx.provider.NotePad/notes`  
	或者使用[Drozer](https://labs.mwrinfosecurity.com/tools/drozer)在app中找到泄漏的ContentProvider  
6. 将agent.apk安装到模拟器，.zip文件内  
	启动模拟器转发端口(31415)  
	`adb install agent.apk`  
	`adb forward tcp:31415 tcp:31415`  
7. 启动app 单击 “Embedded Server(嵌入式服务器)” 没看懂  
8. 终端启动Drozer  
	`drozer console connect`  
9. 运行`app.provider.finduri`模块来查找ContentProvider  
	`run app.provider.finduri com.threebanana.notes`  
10. 运行`app.provider.query`	模块指定ContentProviderURI    
	`run app.provider.query conntent://com.threebanana.notes.provider.NotePad/notes --vertical`  
	如果Drozer能查询和显示来自ContentProvider的数据，意味着ContentProvider泄漏数据并存在漏洞  
11. 修复漏洞在创建ContentProvider时指定参数`android:exported=false`,或者创建一些新的权限，另一个应用程序在访问供应器之前必须请求它。  

## 不安全的文件存储****

目录遍历或本地文件包含漏洞：读取系统文件  

客户端注入攻击：sqlite注入  

## pdf
[链接](https://pan.baidu.com/s/1g7cNFyClXOeakjLQqkb49A)  
提取码: 6jp4 