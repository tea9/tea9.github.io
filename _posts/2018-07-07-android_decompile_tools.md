---
layout: post
title: "android反编译工具和命令"
date: 2018-07-07
category: android
tags: adnroid
---

## TOOLS

[apktool](https://bitbucket.org/iBotPeaches/apktool/downloads/)  

[dex2jar](https://sourceforge.net/projects/dex2jar/files/)  

[jd-gui](http://jd.benow.ca/) 

[jadx](https://github.com/skylot/jadx/releases/tag/v0.7.1) 


## SHELL

**jadx:**简直是神器啊  

打开jadx-gui  
直接把apk拖进去就可以了  

**apktool:**获取资源文件  
	
	java -jar apktool.jar d -f <xx.apk> -o <XX>

	java -jar apktool_2.3.3.jar d -f xx.apk -o XX

**dex2jar:**获取java代码  
	
	1.把apk的后缀名修改成.zip
	2.解压
	3.获取classes.dex(可能是安卓64k包所以会有多个classes.dex，有的时候会有好几个，可能因为混淆，或者加了壳，现在裸奔的应用很少了吧)
	4.把classes.dex 文件放到 dex2jar 文件夹内

	命令：

	d2j-dex2jar classes.dex // 会生成classes-dex2jar.jar

	mac:
	sh d2j-dex2jar.sh classes.dex


**jd-gui:**查看代码工具

	使用jd-gui打开classes-dex2jar.jar就可以看到源代码了


## 遇到的一些问题

使用dex2jar会提示没有权限  
> d2j-dex2jar.sh: line 36: ./d2j_invoke.sh: Permission denied  

使用命令把dex2jar提升下权限就可以了  

	sudo chmod -R 777 dex2jar-2.0

## 相关链接

[Android 反编译神器jadx的使用](https://blog.csdn.net/Fisher_3/article/details/78654450)  
