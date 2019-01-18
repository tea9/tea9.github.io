---
layout: post
title: "android反编译一个app/签名"
date: 2019-01-07
category: android逆向
tags: android逆向
---
	
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

	xx文件夹dist有生成apk链接

	大体的思路就是，先看java代码，看逻辑，然后改smail代码，重新打包

	

[signapk下载链接](https://github.com/as0ler/Android-Tools/tree/master/Autosign/Auto-Sign)  

	重新签名
	java -jar signapk.jar testkey.x509.pem testkey.pk8 xx.apk test_signed.apk


## LINKS

[一步一步带你反编译apk，并教你修改smali和重新打包](https://blog.csdn.net/sxk874890728/article/details/80486223)  
[Android安全攻防战，反编译与混淆技术完全解析（上）](https://blog.csdn.net/guolin_blog/article/details/49738023)  
[Android逆向之旅---解析编译之后的AndroidManifest文件格式](https://blog.csdn.net/jiangwei0910410003/article/details/50568487)  
[Unicode工具](http://tool.chinaz.com/tools/unicode.aspx)  


