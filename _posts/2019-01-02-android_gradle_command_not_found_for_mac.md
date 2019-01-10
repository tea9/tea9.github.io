---
layout: post
title: "android gradle command not found在Mac中"
date: 2019-01-02
category: android
tags: android
---

[[Mac] gradle command not found 解决方法](https://blog.csdn.net/blue_zy/article/details/79862373)  

这个问题是在命令行中使用gradle命令不存在  
只需要找到本地的gradle然后加到.zshrc文件中


## OTHER

实际操作中发现bin目录没有权限  

	然后改了一个文件夹权限 
	bin是 gradle的目录
	
	sudo chmod -R bin