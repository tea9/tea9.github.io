---
layout: post
title: "安卓逆向工具/使用命令"
date: 2018-10-22
category: android逆向
tags: android逆向
---

	链接: https://pan.baidu.com/s/1WZSw1HRk2N_RNgZGYZVtVg 提取码: 96x7 

## 反汇编工具

**apktool**  
[apktool下载](https://bitbucket.org/iBotPeaches/apktool/downloads/)  
[apktool文档](https://ibotpeaches.github.io/Apktool/documentation/)  

获取资源文件  

	java -jar apktool.jar d -f <xx.apk> -o <XX>

	java -jar apktool_2.3.3.jar d -f xx.apk -o XX


	java -jar apktool.jar -r d xx.apk -o xx  //-r忽略资源文件
	java -jar apktool.jar b xx 



**dex2jar**  
[dex2jar下载](https://sourceforge.net/projects/dex2jar/files/)  

获取java代码  

	1.把apk的后缀名修改成.zip
	2.解压
	3.获取classes.dex(可能是安卓64k包所以会有多个classes.dex，有的时候会有好几个，可能因为混淆，或者加了壳，现在裸奔的应用很少了吧)
	4.把classes.dex 文件放到 dex2jar 文件夹内

	命令：

	d2j-dex2jar classes.dex // 会生成classes-dex2jar.jar

	mac:
	sh d2j-dex2jar.sh classes.dex


## 签名工具

**signapk**
[signapk](https://github.com/as0ler/Android-Tools/tree/master/Autosign/Auto-Sign)  

	java -jar signapk.jar testkey.x509.pem testkey.pk8 xx.apk test_signed.apk

## 静态分析工具

**jd-gui**  
[jd-gui下载](http://jd.benow.ca/)   
查看代码工具  

	使用jd-gui打开classes-dex2jar.jar就可以看到源代码了

**jadx**  
[jadx下载](https://github.com/skylot/jadx/releases/tag/v0.7.1)   
直接把apk拖进去就可以了  

**Android Killer**  
[Android Killer下载](https://down.52pojie.cn/Tools/Android_Tools/AndroidKiller_v1.3.1.zip)  

**010Editor**  

**smalidea**  

[smalidea下载](https://bitbucket.org/JesusFreke/smali/downloads/)  

## 动态调试工具

**Android Studio/Intellij IDEA**  

**IDA**  

## 脱壳

**ZjDroid**  

[ZjDroid github](https://github.com/halfkiss/ZjDroid)  

## 遇到的一些问题

使用dex2jar会提示没有权限  
> d2j-dex2jar.sh: line 36: ./d2j_invoke.sh: Permission denied  

使用命令把dex2jar提升下权限就可以了  

	sudo chmod -R 777 dex2jar-2.0

## 相关链接

[Android 反编译神器jadx的使用](https://blog.csdn.net/Fisher_3/article/details/78654450)  
[Smalidea+IntelliJ IDEA/Android Studio动态调试安卓app教程](https://blog.csdn.net/linchaolong/article/details/51146492)  
[ZjDroid工具介绍及脱壳详细示例](https://www.cnblogs.com/goodhacker/p/3961045.html)  
[Android中Xposed框架篇---基于Xposed的一款脱壳神器ZjDroid工具原理解析](https://blog.csdn.net/jiangwei0910410003/article/details/52840602)  
