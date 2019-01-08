---
layout: post
title: "android反编译一个app/签名"
date: 2019-01-07
category: android逆向
tags: android逆向
---
	

	java -jar apktool.jar -r d xx.apk -o xx 
	java -jar apktool.jar b xx 


	xx文件夹dist有生成apk链接

[signapk下载链接](https://github.com/as0ler/Android-Tools/tree/master/Autosign/Auto-Sign)  

	重新签名
	java -jar signapk.jar testkey.x509.pem testkey.pk8 xx.apk test_signed.apk


## LINKS

[一步一步带你反编译apk，并教你修改smali和重新打包](https://blog.csdn.net/sxk874890728/article/details/80486223)  

