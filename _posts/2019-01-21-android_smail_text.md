---
layout: post
title: "smali hello"
date: 2019-01-21
category: android逆向
tags: android逆向 smali
---

## smali语法

	.class public LHelloWorld; #定义类名
	.super Ljava/lang/Object; #定义父类
	.method public static main(Ljava/lang/String;)V #声明静态main()方法
		.registers 4 #程序中使用v0、v1、v2寄存器与一个蚕食寄存器
		.parameter	#一个参数
		.prologue #代码起始指令
		#空指令
		nop
		nop
		nop
		nop
		#数据定义指令
		const/16 v0, 0x8
		const/4 v1, 0x5
		const/4 v2, 0x3
		#数据操作指令
		move v1, v2
		#数组操作指令
		new-array v0,v0,[I
		array-length v1,v0
		#实例操作指令
		new-instance v1, Ljava/lang/StringBuilder;
		#方法调用指令
		invoke-direct {v1},Ljava/lang/StringBuilder;-><init>()V
		#跳转指令
		if-nez v0,:cond_0
		goto :goto_0
		:cond_0
		#数据转换指令
		int-to-float v2,v2
		#数据运算指令
		add-float v2,v2,v2
		#比较指令
		cmpl-float v0,v2,v2
		#字段操作指令
		sget-object v0, Ljava/lang/System;->out:Ljava/io/PrintStream;
		const-string v1,"Hello World"
		#方法调用指令
		invoke-virtual {v0,v1},Ljava/io/PrintStream;->println(Ljava/lang/String;)V
		#返回指令
		:goto_0
		return-void #返回空
	.end method


## smali动态调试-android studio

[Android Studio动态调试smali源码](https://blog.csdn.net/hp910315/article/details/52790740)  
[smali.jar download](https://bitbucket.org/JesusFreke/smali/downloads/)  

	java -jar apktool.jar d xx.apk -o xx

## LINKS
[用 Smali 手写一个可运行的 HelloWorld！！！](https://www.cnblogs.com/plokmju/p/7742759.html)  