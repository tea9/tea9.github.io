---
layout: post
title: "android反编译一个app/签名"
date: 2019-01-07
category: android逆向
tags: android逆向
---
## 一些学习网站

[吾爱破解移动安全](https://www.52pojie.cn/forum-65-1.html)  
[看雪论坛Android安全](https://bbs.pediy.com/forum-161.htm)  

## 一些工具

[Unicode工具](http://tool.chinaz.com/tools/unicode.aspx)  


[mprop](https://github.com/wpvsyou/mprop)  
[mprop 临时修改设备的系统调试状态值](https://pan.baidu.com/s/1ZfYCq-zHdAq-KUa1BkJ6bg)  
[[原创]修改ro属性的小工具新版本-170119](https://bbs.pediy.com/thread-215311.htm)  
[利用mprop工具修改当前手机应用都可以调试](https://www.jianshu.com/p/e540f34cec07)  
[[原创]android ro.debuggable属性调试修改(mprop逆向)](https://bbs.pediy.com/thread-246081.htm)  
[BDOpener——开启APK调试与备份选项的Xposed模块](https://security.tencent.com/index.php/opensource/detail/17)  


[Android中带你开发一款自动爆破签名校验工具kstools](https://blog.csdn.net/jiangwei0910410003/article/details/70483088)  
[带你开发一款给Apk中自动注入代码工具icodetools(开凿篇)](https://blog.csdn.net/jiangwei0910410003/article/details/53386071)  

- AXMLEditor xml二进制 更改工具
- Brida
	Brida是一款 Burp Suite 扩展，作为一座桥梁连接着Burp Suite以及Frida，以帮助用户修改应用程序与后端服务器之间的通信数据为己任。在分析移动端应用时遇到应用使用随机密钥式对称加密，如果不知道其使用的密钥就无法篡改其通信数据，通过Burp也就无法对所有的交换数据进行更改了，于是Brida就这样出现在我们视野中。

	参考：https://www.anquanke.com/post/id/86567

## apk反编译
	
	正常情况d反编译 b重新编译 xx是生成的文件夹
	java -jar apktool.jar d xx.apk -o xx
	java -jar apktool.jar b xx

	这个包是因为重新打包资源文件有问题 所以用-r不反编译资源文件 -f强制删除现有文件夹
	java -jar apktool.jar -r -f d xx.apk -o xx 
	java -jar apktool.jar b xx 

	apktool 参数
	-f 如果目标文件夹已存在，则强制删除现有文件夹（默认如果目标文件夹已存在，则解码失败）。
	-o 指定解码目标文件夹的名称（默认使用APK文件的名字来命名目标文件夹）。
	-s 不反编译dex文件，也就是说classes.dex文件会被保留（默认会将dex文件解码成smali文件）。
	-r 不反编译资源文件，也就是说resources.arsc文件会被保留（默认会将resources.arsc解码成具体的资源文件）。

	大体的思路就是，先看java代码，看逻辑，然后改smali代码，重新打包

[smali text](https://tea9.xyz/2019/01/21/android_smali_text.html)  

	修改AndroidManifest.xml中的android:debuggable=”true”
	<application android:debuggable=”true”/>

[signapk下载链接](https://github.com/as0ler/Android-Tools/tree/master/Autosign/Auto-Sign)  

	xx文件夹dist有生成没签名的apk

	重新签名
	java -jar signapk.jar testkey.x509.pem testkey.pk8 xx.apk test_signed.apk


## LINKS

[你知道哪些Android逆向分析方法？](https://pockr.org/activity/detail?activity_no=act_0e6b60b83ec0357bce)  
[一步一步带你反编译apk，并教你修改smali和重新打包](https://blog.csdn.net/sxk874890728/article/details/80486223)  
[Android安全攻防战，反编译与混淆技术完全解析（上）](https://blog.csdn.net/guolin_blog/article/details/49738023)  
[Android逆向之旅---解析编译之后的AndroidManifest文件格式](https://blog.csdn.net/jiangwei0910410003/article/details/50568487)  
