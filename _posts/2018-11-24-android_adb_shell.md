---
layout: post
title: "android adb shell 常用命令"
date: 2018-11-24
category: android逆向
tags: android android逆向
---

	monitor

## 一些路径

	密码锁
		/data/system
			password.key
			gesture.key

		cd /data/system
		rm gesture.key

	二进制文件
		/system/bin
		/system/xbin

	应用数据
		/data/data
		/data/data/xx.xx
		>ls
		cache
		databases
		files
		lib

	原始安装文件
		/data/app

	play商店购买app
		/data/app-private

	系统app存放目录
		/system/app/xx.apk

	应用app存放目录
		/data/app/xx.apk

	install存放app的临时目录
		/data/local/tmp/xx.apk

	缓存目录
	adb pull /sdcard/tencent/MobileQQ/diskcache/ 


---

	 ps|grep com.songheng.eastnews  
	com.songheng.eastnews/com.oa.eastfirst.activity.WelcomeActivity

	http://adbshell.com/

	/Users/shaomiao/Library/Android/sdk/tools/monitor  

[Android ADB命令?这一次我再也不死记了!【简单说】](https://www.jianshu.com/p/56fd03f1aaae)  

## 分辨率

	adb shell wm size
	> Physical size: 1080x1920

## abi

	adb shell getprop ro.product.cpu.abi
	> arm64-v8a

## adb forword

	adb forward tcp:11111 tcp:22222
	感觉这个命令挺酷的

[adb forward的细节（1）：原理概述](https://blog.csdn.net/u013553529/article/details/80036227)  
[adb forward的细节（4）：使用adb forward打造一个PC端与手机端交互的工具](https://blog.csdn.net/u013553529/article/details/80296870)  
[ANDROID: 超级好用的ADB FORWARD命令](https://blog.csdn.net/omnispace/article/details/80018705)  
[Android - adb forward实现PC和App的Socket通讯](https://blog.csdn.net/merrylilili/article/details/74641369)  

## am
	
	am start -a android.intent.action.CALL -d tel:10086  拨打电话
	-a表示动作 -d 表示传入的数据 -t表示传入的类型


	am start -a android.intent.action.VIEW -d http://www.baidu.com  打开网页


	打开音乐播放器
	am start -a android.intent.action.MUSIC_PLAYER 
	am start -n com.android.music/om.android.music.MusicBrowserActivity 


	启动服务
	am startservice <服务名称> 
	am startservice -n com.android.music/com.android.music.MediaPlaybackService (这里-n表示组件) 
	am startservice -a com.smz.myservice (这里-a表示动作，就是你在Androidmanifest里定义的) 

	停止服务
	am stopservice


	发送广播
	am broadcast -a <广播动作> 
	am broadcast -a com.smz.mybroadcast 


	启动app
	am start -n <packagename>
	am start -n com.android.browser/com.android.browser.BrowserActivity

	杀死进程
	am kill <packagename>

	ps|grep <packagename> 查看进程是否存在


## pm

	pm list packages  列出手机所有的包名

	pm install/uninstall  安装/卸载

## input
	
	input text <text> 

	input keyevent <keycode> 

	input tap <x> <y>

	input swipe <x1> <y1> <x2> <y2> <time>



## service

	service list
	service list|grep com.android

	service check xx


## activity




## adb常用命令

1.**模拟点击**  
	
	adb shell input tap 100 100

2.**滑动**  

	adb shell input swipe x1 y1 x2 y2 
	adb input touchscreen swipe x1 y1 x2 y2 100

	adb shell input swipe 100 100 400 100  300 #左往右
	adb shell input swipe 400 100 100 100  300 #右往左
	adb shell input swipe 100 100 100 400  300 #上往下
	adb shell input swipe 100 400 100 100  300 #下往上
	adb shell input swipe 100 100 400 400  300 #上往下斜
	adb shell input swipe 400 400 100 100  300 #下往上斜

3.**长按**  

	adb shell input swipe 100 100 100 100  1000 //在 100 100 位置长按 1000毫秒

	adb shell input swipe 367 469 367 469 800

4.**打印所有包名**  

	adb shell pm list packages

	➜  ~ adb shell pm list packages
	package:com.huawei.floatMms
	package:com.android.defcontainer
	package:com.tencent.mm

5.**打印制定包的apk路径**  

	adb shell pm path com.android.phone

	➜  ~ adb shell pm path com.huawei.android.launcher
	package:/system/app/HwLauncher6.apk

6.**删除制定包**  

	adb shell pm clear com.test.abc

7.**截图**  

	adb shell screencap /sdcard/screen.png
	adb pull /sdcard/screen.png #下载到本地

8.**获取被点击的位置信息**  

	adb shell getevent
	
	>
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

	getevent -l -c 16
	输出所有event设备的基本信息

	add device 1: /dev/input/event2
	  name:     "hi6421_on"
	could not get driver version for /dev/input/mouse0, Not a typewriter
	add device 2: /dev/input/event4
	  name:     "huawei,touchscreen"
	add device 3: /dev/input/event0
	  name:     "mhl_rcp_dev"
	could not get driver version for /dev/input/mice, Not a typewriter
	add device 4: /dev/input/event1
	  name:     "hisi_gpio_key.14"
	add device 5: /dev/input/event3
	  name:     "hi3630_hi6401_CARD Headset Jack"

	getevent -c 10 //输出10条信息后退出
	getevent -l  //将type、code、value以对应的常量名称显示

9.**打开对应的activity**  

	adb shell am start -n ｛包(package)名｝/｛包名｝.{活动(activity)名称}

	adb shell am start com.songheng.eastnews/com.oa.eastfirst.activity.WelcomeActivity

10.**获得当前活动窗口的信息，包名以及活动窗体**  

	adb shell dumpsys window windows | grep mCurrent 

11.**包名管理命令，获得对应包名的对应apk路径**  

	adb shell pm  path com.migu.lobby

12.**使用dumpsys命令可以查看Android手机当前正在运行的Activity**  

	adb shell dumpsys activity activities | findstr "Run"

**查看当前打开的app包名**

顶层activity:  

	adb shell dumpsys activity top

windows:  

	adb shell dumpsys window w |findstr \/ |findstr name=

mac:  

	adb shell dumpsys window w |grep \/ |grep name=

	➜  ~ adb shell dumpsys window w |grep \/ |grep name=
      mSurface=Surface(name=com.weikuai.wknews/com.weikuai.wknews.ui.activity.RegisterActivity)


13.**使用 uiautomator dump 获取app上的页面元素**  

	adb shell uiautomator dump /data/local/tmp/uidump.xml
	adb shell uiautomator dump /sdcard/dump.xml

14.**下载文件**  

	adb pull /sdcard/demo.mp4 

15.**上传文件**  

	adb push test.apk /sdcard

16.**息屏**  

	adb shell input keyevent 26

17.**keyevent**

	adb shell input keyevent 19 #导航键向下

	adb shell input keyevent 20 #导航键向下

	adb shell input keyevent 92 #向上翻页键

    adb shell input keyevent 93 #向下翻页键

	adb shell input keyevent 4 #返回

	adb shell input keyevent 3 #Home

	adb shell input keyevent 6 #挂机

	adb shell input keyevent 84 #搜索

	adb shell input keyevent 26 #电源

	adb shell input keyevent 24 #音量+

	adb shell input keyevent 25 #音量-

**导航**  




	3 Home
	4 Back
	19 Up
	20 Down
	21 Left
	22 Right
	23 Select/Ok
	24 Volume+
	25 Volume-
	82 Menu 菜单


	adb shell input text "ANDROID" 支持的KEYCODE
	0 -->  "KEYCODE_UNKNOWN"
	1 -->  "KEYCODE_MENU"
	2 -->  "KEYCODE_SOFT_RIGHT"
	3 -->  "KEYCODE_HOME"
	4 -->  "KEYCODE_BACK"
	5 -->  "KEYCODE_CALL" 
	6 -->  "KEYCODE_ENDCALL" 
	7 -->  "KEYCODE_0" 
	8 -->  "KEYCODE_1" 
	9 -->  "KEYCODE_2" 
	10 -->  "KEYCODE_3"
	11 -->  "KEYCODE_4" 
	12 -->  "KEYCODE_5" 
	13 -->  "KEYCODE_6" 
	14 -->  "KEYCODE_7" 
	15 -->  "KEYCODE_8" 
	16 -->  "KEYCODE_9" 
	17 -->  "KEYCODE_STAR" 
	18 -->  "KEYCODE_POUND" 
	19 -->  "KEYCODE_DPAD_UP" 
	20 -->  "KEYCODE_DPAD_DOWN" 
	21 -->  "KEYCODE_DPAD_LEFT" 
	22 -->  "KEYCODE_DPAD_RIGHT"
	23 -->  "KEYCODE_DPAD_CENTER"
	24 -->  "KEYCODE_VOLUME_UP" 
	25 -->  "KEYCODE_VOLUME_DOWN" 
	26 -->  "KEYCODE_POWER" 
	27 -->  "KEYCODE_CAMERA" 
	28 -->  "KEYCODE_CLEAR" 
	29 -->  "KEYCODE_A" 
	30 -->  "KEYCODE_B" 
	31 -->  "KEYCODE_C" 
	32 -->  "KEYCODE_D" 
	33 -->  "KEYCODE_E" 
	34 -->  "KEYCODE_F" 
	35 -->  "KEYCODE_G" 
	36 -->  "KEYCODE_H" 
	37 -->  "KEYCODE_I" 
	38 -->  "KEYCODE_J" 
	39 -->  "KEYCODE_K" 
	40 -->  "KEYCODE_L" 
	41 -->  "KEYCODE_M"
	42 -->  "KEYCODE_N" 
	43 -->  "KEYCODE_O" 
	44 -->  "KEYCODE_P" 
	45 -->  "KEYCODE_Q" 
	46 -->  "KEYCODE_R" 
	47 -->  "KEYCODE_S" 
	48 -->  "KEYCODE_T" 
	49 -->  "KEYCODE_U" 
	50 -->  "KEYCODE_V" 
	51 -->  "KEYCODE_W" 
	52 -->  "KEYCODE_X"
	53 -->  "KEYCODE_Y" 
	54 -->  "KEYCODE_Z" 
	55 -->  "KEYCODE_COMMA" 
	56 -->  "KEYCODE_PERIOD"
	57 -->  "KEYCODE_ALT_LEFT" 
	58 -->  "KEYCODE_ALT_RIGHT" 
	59 -->  "KEYCODE_SHIFT_LEFT" 
	60 -->  "KEYCODE_SHIFT_RIGHT" 
	61 -->  "KEYCODE_TAB" 
	62 -->  "KEYCODE_SPACE" 
	63 -->  "KEYCODE_SYM" 
	64 -->  "KEYCODE_EXPLORER" 
	65 -->  "KEYCODE_ENVELOPE" 
	66 -->  "KEYCODE_ENTER" 
	67 -->  "KEYCODE_DEL" 
	68 -->  "KEYCODE_GRAVE" 
	69 -->  "KEYCODE_MINUS" 
	70 -->  "KEYCODE_EQUALS" 
	71 -->  "KEYCODE_LEFT_BRACKET" 
	72 -->  "KEYCODE_RIGHT_BRACKET" 
	73 -->  "KEYCODE_BACKSLASH"
	74 -->  "KEYCODE_SEMICOLON" 
	75 -->  "KEYCODE_APOSTROPHE"
	76 -->  "KEYCODE_SLASH" 
	77 -->  "KEYCODE_AT" 
	78 -->  "KEYCODE_NUM" 
	79 -->  "KEYCODE_HEADSETHOOK" 
	80 -->  "KEYCODE_FOCUS"
	81 -->  "KEYCODE_PLUS"
	82 -->  "KEYCODE_MENU"
	83 -->  "KEYCODE_NOTIFICATION"
	84 -->  "KEYCODE_SEARCH" 
	85 -->  "TAG_LAST_KEYCODE"  

[adb shell input keyevent值所对应的字符](https://blog.csdn.net/chen825919148/article/details/18732041)  
[adb命令模拟按键事件 KeyCode](https://blog.csdn.net/jlminghui/article/details/39268419)  

18.**输入框输入**  

	adb shell input text "ANDROID"

19.**利用无线来查看adb shell**

	> adb tcpip 5555

	连接：
	> adb connect IP:5555

[ADB高级命令](https://blog.csdn.net/fuyuehua22/article/details/45875209)  

20.**查看所有已经连接上的设备**  

	adb devices

21.**安装卸载**  

	adb install <apk文件路径>
	adb install -r <apk文件路径>     通过install命令来安装apk文件，-r参数可以重新安装某个应用并保留应用数据

	adb install -r ~/chrome.apk

	卸载应用：
	adb uninstall <软件名>
	adb uninstall -k < 软件名>         如果加 -k 参数,为卸载软件但是保留配置和缓存文件
	
	adb uninstall com.android.chrome

22.**关机命令**  

	adb shell
	su
	reboot -p

**重启**  

	reboot

23.**停止App后台进程**

	adb shell ps | grep tencent.mm   检查指定进程

	adb shell am force-stop com.tencent.mm 关闭指定进程

	adb shell pm clear com.tencent.mm  清楚指定进程 不仅会停止APP进程，而且会清除这个APP进程产生的所有数据

## 重启 关机 休眠 唤醒 (还没试)

	adb shell reboot 重启
	echo mem > /sys/power/state 休眠
	echo on > /sys/power/state 唤醒
	reboot -p 关机

## tips
### 解决网页滑动问题

	adb shell input keyevent 19 #导航键向下

	adb shell input keyevent 20 #导航键向下

	adb shell input keyevent 92 #向上翻页键
	
    adb shell input keyevent 93 #向下翻页键

---

## 安装apk的问题

	INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES
	签名冲突

## LINKS

这个没试过还挺有趣的[android adb shell循环模拟点击](https://www.jianshu.com/p/c2120e27ee4c)  
[Android应用程序 --- WakeLock 保持后台唤醒状态](https://blog.csdn.net/andyhuabing/article/details/8988161)  
[Android利用root权限开关机、休眠和唤醒](https://blog.csdn.net/benbenxiongyuan/article/details/53032443)  
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
[adb shell 常用命令](https://www.cnblogs.com/JianXu/p/5161179.html)  
[玩转ADB命令（ADB命令使用大全）](https://blog.csdn.net/zhonglunshun/article/details/78362439)  
[Android系统文件目录路径说明](https://www.cnblogs.com/CVstyle/p/6389966.html)  
[彻底搞懂Android文件存储---内部存储，外部存储以及各种存储路径解惑](https://blog.csdn.net/u010937230/article/details/73303034/)  
[Android--多线程之Handler](https://www.cnblogs.com/shirley-1019/p/3557800.html)  
[android在adb下模拟长按事件](https://zhuanlan.zhihu.com/p/26236061)  
[android 自动化测试检测弹窗或蒙层](https://blog.csdn.net/yeshennet/article/details/78667777)  
[Android ADB命令大全(通过ADB命令查看wifi密码、MAC地址、设备信息、操作文件、查看文件、日志信息、卸载、启动和安装APK等)](https://zmywly8866.github.io/2015/01/24/all-adb-command.html)  
[使用adb命令停止APP后台进程的方法](https://yq.aliyun.com/articles/62892)  

