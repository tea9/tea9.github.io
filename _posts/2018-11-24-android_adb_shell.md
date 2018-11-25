---
layout: post
title: "android_adb_shell"
date: 2018-11-24
category: android
tags: android
---

http://adbshell.com/

/Users/shaomiao/Library/Android/sdk/tools/moitor


	adb shell pm list packages
	打印所有包

	➜  ~ adb shell pm list packages
	package:com.huawei.floatMms
	package:com.android.defcontainer
	package:com.tencent.mm

	adb shell pm path com.android.phone
	打印制定包的apk路径

	➜  ~ adb shell pm path com.huawei.android.launcher
	package:/system/app/HwLauncher6.apk

	adb shell pm clear com.test.abc
	删除制定包


	adb shell screencap /sdcard/screen.png
	adb pull /sdcard/screen.png

	截图

	adb shell input keyevent 26
	息屏

	adb shell input tap 100 100
	点击 100 100

	input swipe [duration(ms)]
	向设备发送一个滑动指令，并且可以选择设置滑动时长。

	//滑动操作

	adb shell input swipe 100 100 200 200  300 //从 100 100 经历300毫秒滑动到 200 200

	//长按操作

	adb shell input swipe 100 100 100 100  1000 //在 100 100 位置长按 1000毫秒

	adb shell getevent
	获取被点击的位置信息
	/dev/input/event0 3 39 3e1
	/dev/input/event0 1 14a 1
	/dev/input/event0 1 145 1
	/dev/input/event0 3 35 406  //x坐标
	/dev/input/event0 3 54 1083  //y坐标
	/dev/input/event0 0 0 0
	/dev/input/event0 3 39 ffffffff
	/dev/input/event0 1 14a 0
	/dev/input/event0 1 145 0
	/dev/input/event0 0 0

	adb shell am start -n ｛包(package)名｝/｛包名｝.{活动(activity)名称}

	adb shell am start com.songheng.eastnews/com.oa.eastfirst.activity.WelcomeActivity

	adb shell dumpsys window windows | grep mCurrent     
	获得当前活动窗口的信息，包名以及活动窗体：

	 adb shell pm  path com.migu.lobby 
	包名管理命令，获得对应包名的对应apk路径

	adb shell dumpsys activity activities | findstr "Run"
	使用dumpsys命令可以查看Android手机当前正在运行的Activity

	adb shell uiautomator dump /data/local/tmp/uidump.xml
	使用 uiautomator dump 获取app上的页面元素

	adb pull /sdcard/demo.mp4 
	下载文件

	adb push test.apk /sdcard
	上传文件







[Android adb shell input 命令详解](https://blog.csdn.net/good123_2014/article/details/79107765)
[Android开发——后台获取用户点击位置坐标（可获取用户支付宝密码）](https://blog.csdn.net/seu_calvin/article/details/51916845)
[Android adb shell启动应用程序的方法](https://www.cnblogs.com/dengqing9393/p/7210479.html)
[Android通过ADB命令获取当前运行的Activity](https://blog.csdn.net/owenchan1987/article/details/52774394)
[Android adb shell启动应用程序的方法](https://www.cnblogs.com/dengqing9393/p/7210479.html)
[PC通过ADB控制Android手机模拟点击，滑动，输入等事件（包括控制多台Android手机）](https://blog.csdn.net/aoaoxiexie/article/details/53464716)
[Android开发——使用ADB Shell命令实现模拟点击（支付宝自动转账实现）](https://blog.csdn.net/seu_calvin/article/details/51916530)
[通过adb shell获取当前窗口信息](https://blog.csdn.net/wyyyh9458/article/details/83550004)
[检测弹窗与蒙层的方法 (Android )](https://testerhome.com/topics/11136)
[使用 uiautomator dump 获取app上的页面元素](https://blog.csdn.net/qq_36350532/article/details/81708339)
[通过 python 调用 adb 命令实现用元素名称、id、class 定位元素](https://testerhome.com/topics/1047)
[通过adb获取安卓应用屏幕所有控件信息](https://blog.csdn.net/hyhdcl/article/details/53340421)
[使用adb命令获取设备UI(hierarchy)信息](https://blog.csdn.net/henni_719/article/details/72953251)
[Android shell获取和模拟点击事件](https://blog.csdn.net/beyond702/article/details/69258932)
[通过adb shell命令查看当前与用户交互的activity](https://blog.csdn.net/hty1053240123/article/details/54312614)
[Android系统文件目录路径说明](https://www.cnblogs.com/CVstyle/p/6389966.html)
[彻底搞懂Android文件存储---内部存储，外部存储以及各种存储路径解惑](https://blog.csdn.net/u010937230/article/details/73303034/)
