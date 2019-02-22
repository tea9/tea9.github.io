---
layout: post
title: "smali hello"
date: 2019-01-21
category: android逆向
tags: android逆向 smali
---

## smali语法

	invoke-static 是类静态方法的调用，编译时，静态确定的；
	invoke-virtual 虚方法调用，调用的方法运行时确认实际调用，和实例引用的实际对象有关，动态确认的，一般是带有修饰符protected或public的方法；
	invoke-direct 没有被覆盖方法的调用，即不用动态根据实例所引用的调用，编译时，静态确认的，一般是private或<init>方法；
	invoke-super 直接调用父类的虚方法，编译时，静态确认的。
	invokeinterface 调用接口方法，调用的方法运行时确认实际调用，即会在运行时才确定一个实现此接口的对象。

---

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

---

[Android Studio动态调试smali源码](https://blog.csdn.net/hp910315/article/details/52790740)  
[androidstudio动态调试smali](https://blog.csdn.net/shengerjianku/article/details/76511898)  

[AS动态调试smali](https://blog.csdn.net/hujiuding/article/details/79057705)  

[smali.jar download](https://bitbucket.org/JesusFreke/smali/downloads/)  

01. android studiao  Plugins Install plugin from disk  smalidea
	[smalidea](https://bitbucket.org/JesusFreke/smali/downloads/smalidea-0.05.zip)  

02. 反编译apk，修改AndroidManifest.xml中的debug属性 或者 使用mprop工具 或者 xposed xinstaller 模块（没试过）
	[android反编译一个app/签名](https://tea9.xyz/2019/01/07/android_reverse_app.html)  
	[利用mprop工具修改当前手机应用都可以调试](https://www.jianshu.com/p/e540f34cec07)  
```
	安装xposed框架（需要root，刷第三方recovery），之后安装xinstaller模块，设置xinstaller启动专家模式，在其他设置中开启“调试应用”
```

使用mprop。
```
	cd mprop/libs
	adb push armeabi-v7a/mprop /data/local/tmp

	adb shell
		su
		chmod 755 /data/local/tmp/mprop  
		data/local/tmp/mprop
		setprop ro.debuggable 1
		data/local/tmp/mprop -r
```

	cat default.prop

	ro.secure=1
	security.perf_harden=1
	ro.allow.mock.location=0
	ro.debuggable=1
	persist.sys.usb.config=adb


03. 动态调试

```
	java -jar baksmali-2.0.8.jar test_signed.apk -o ~/Downloads/SmaliDebug/src

	adb install xx.apk //安装重新打包的apk

	adb shell dumpsys window w |grep \/ |grep name= // 查看顶层activity

	adb shell am start -D -n com.example.simpleencryption/.MainActivity // 以调试模式打开
	adb shell am start -D -n com.hypay.pay.pkg/com.sytpay.paytimework.LoginActivity

	adb shell ps|grep <package-name> //查看端口号

	adb forward tcp:8700 jdwp:1924 //转发

下断点
Run-Debug
```

## ERROR

Error running 'DebugSmali': Unable to open debugger port (localhost:8700): java.net.ConnectException "Connection refused (Connection refused)"  

	adb kill-server //kill adb服务
	adb start-server

	sudo lsof -i tcp:8700 //查看8700端口占用
	netstat -nao | findstr <port>
	kill -9 8348 //kill掉进程

	把DDMS关掉 DDMS会占用8700端口
	重起AndroidStudio

## Smali 2 Java
[download链接: ](https://pan.baidu.com/s/1kh8qJOypIo_1Lse-AazmRg)   
提取码: ix9u 

## Java 2 Smali

[intellij-java2smali](https://github.com/ollide/intellij-java2smali)  

Preferences->Plugins->smali

Use:

Build->Compile to smali

---
[如何把java代码转换成smali代码](https://www.cnblogs.com/gordon0918/p/5466514.html)  

	javac smaliTest.java
	java -jar dx.jar --dex --output=smaliTest.dex smaliTest.class //android-sdk\build-tools\23.0.1\lib
	java -jar baksmali.jar smaliTest.dex //android-sdk\platform-tools\

	out目录，里面有我们的smali文件

## 写一个demo 修改smali **

## startActivity

	.method protected onCreate(Landroid/os/Bundle;)V
	    .registers 4
	    .param p1, "savedInstanceState"    # Landroid/os/Bundle;

	    .prologue
	    .line 11
	    invoke-super {p0, p1}, Landroid/support/v7/app/AppCompatActivity;->onCreate(Landroid/os/Bundle;)V

	    .line 13
	    new-instance v0, Landroid/content/Intent;

	    const-class v1, Lcom/demo/myapplication/MainActivity;

	    invoke-direct {v0, p0, v1}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

	    .line 14
	    .local v0, "intent":Landroid/content/Intent;
	    invoke-virtual {p0, v0}, Lcom/demo/myapplication/MainActivity;->startActivity(Landroid/content/Intent;)V

	    .line 15
	    return-void
	.end method

---

    new-instance v0, Landroid/content/Intent;

    invoke-virtual {p0}, Lcom/demo/myapplication/App;->getApplicationContext()Landroid/content/Context;

    move-result-object v1

    const-class v2, Lcom/demo/myapplication/LoginActivity;

    invoke-direct {v0, v1, v2}, Landroid/content/Intent;-><init>(Landroid/content/Context;Ljava/lang/Class;)V

    invoke-virtual {p0, v0}, Lcom/demo/myapplication/App;->startActivity(Landroid/content/Intent;)V


## LINKS
[用 Smali 手写一个可运行的 HelloWorld！！！](https://www.cnblogs.com/plokmju/p/7742759.html)  