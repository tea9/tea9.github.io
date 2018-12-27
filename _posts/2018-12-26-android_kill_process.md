---
layout: post
title: "android杀死进程"
date: 2018-12-26
category: android
tags: android
---

测试手机：  
华为荣耀6 型号 H60-L01  Android版本 4.4.2   

	android.os.Process.killProcess(pid); 结束pid的进程 并释放资源

	activityManager.killBackgroundProcesses(pkgName); 

	kill -9 pid

	system.exit(int) 关闭虚拟机 结束整个app 0表示正常结束 1表示异常结束

	restartPackage(getpackageName()); 2.2之前
		ActivityManager manager = (ActivityManager)getSystemService(Context.ACTIVITY_SERVICE);
		manager.restartPackage(getPackageName());
		<user-permission android:name="android.permission.RESTART_PACKAGES"/>

	ActivityManager killBackgroundProcess(packagename) 来结束app


## 1

	ps

	USER 进程当前用户     PID Process ID 进程ID    PPID Process Parent ID 父进程ID   
	VSIZE Virtual Size 进程的虚拟内存大小      RSS Resident Set Size 实际驻留“在内存中”的内存大小
	WCHAN 休眠进程在内核中的地址     PC Program Counter     NAME 进程名

	ps|grep <package-name>

	ps|grep com.xx.xx
	u0_a150   10189 19086 913548 58872 ffffffff 00000000 S com.xx.xx:process1
	u0_a150   10258 19086 957020 75504 ffffffff 00000000 S com.xx.xx
	u0_a150   10350 19086 923572 70564 ffffffff 00000000 S com.xx.xx:pushservice
	u0_a150   10532 10350 1912   180   ffffffff 00000000 S /data/data/com.xx.xx/files/gdaemon_20161017

	su
	kill -9 10189 10258 10350 10532

	以上杀死之后应用还会自启 真的是 直接 kill -9 19086 手机会重新启动

## 2

	am force-stop <package-name>

	su
	am force-stop com.xx.xx

	ps|grep com.xx.xx 
	u0_a150   28289 1     1912   180   ffffffff 40093b20 S /data/data/com.xx.xx/files/gdaemon_20161017
	u0_a150   30093 12460 913496 58692 ffffffff 40111954 S com.xx.xx:process1
	u0_a150   30140 12460 967536 74860 ffffffff 40111954 S com.xx.xx
	u0_a150   30175 12460 923952 68276 ffffffff 40111954 S com.xx.xx:pushservice

	am start -n <package-name/class-name>

## Other
	
	试着查找了一下 父进程 发现了一个zygote

	root      12460 1     879800 71564 ffffffff 4007c8f0 S zygote

## Besides

[LBS&VirtualXposed&XposedInstaller&360极客版](https://pan.baidu.com/s/1vNqyTPEPyiWyZG306A76bw)  

尝试装了LBE加速大师 杀死进程 不到1秒就会又存在  
尝试装了Xposed 显示Xposed框架未安装 [抱歉，Xposed真的可以为所欲为——5.我自己刷的Xposed凭什么不给我用](https://blog.csdn.net/coder_pig/article/details/80586601)  [关于 Android 7.1 的 Xposed，你想知道的都在这](https://sspai.com/post/40121)  
尝试装了VirtualXposed Failure INSTALL_FAILED_OLDER_SDK [VirtualXposed APK Download Page](https://www.tricksfolks.com/vx-apk-dl/)  
尝试装绿色守护 [Greenify绿色守护酷安](https://www.coolapk.com/apk/com.oasisfeng.greenify) [googlepaly](http://www.zhihu.com/question/21007772) [Greenify](https://www.efanyh.com/archives/8250.html) Failure [INSTALL_FAILED_OLDER_SDK] 可能要试下老版本  
(可以升级继续尝试下)尝试装360极客版  清理之后 目标应用还会重启 然后开机不会自启 打开目标应用 然后清理 目标应用还会自启  
尝试装了LBE安全大师 不好使  
[冰箱](https://www.coolapk.com/apk/com.catchingnow.icebox) Failure [INSTALL_FAILED_OLDER_SDK]  
[小黑屋](https://www.coolapk.com/apk/web1n.stopapp)  Failure [INSTALL_FAILED_OLDER_SDK]  
黑域 还没下载尝试[黑域](http://zuimeia.com/app/5206/?platform=2)  
[android_background_ignore](https://github.com/Jiangyiqun/android_background_ignore)  只支持android7.0 8.0  

---

my Android tools [如何正确使用 My Android Tools 调教各大流氓软件？](https://www.zhihu.com/question/26934572) [如何遏制安卓系统中BAT系软件的后台自动唤醒？](https://www.zhihu.com/question/30971054)  
3c toolbox pro  
App Ops [给有一定动手能力又不怕麻烦的人~~ADB限制后台命令RUN_IN_B..](http://bbs.gfan.com/android-9160337-1-1.html) [IT之家学院：如何免ROOT阻止Android应用唤醒](https://www.ithome.com/html/android/323417.htm)  
Shuzuku Manager  

---
[[大型原创教程]如何完美解决Android系统后台、关联唤醒、自启动、全家桶问题](http://bbs.nga.cn/read.php?tid=8928147&rand=530)  



## Finally

最后结论是这个软件太流氓了 process1和pushservice是关键 估计要杀死应用要 先杀死这个  
阻止zygote [Android系统启动2---Zygote启动及其作用](https://www.cnblogs.com/herenzhiming/articles/4998045.html)  

你好到手机管家—权限管理—自动自启管理,第一个你进去设置一下，这个就是关联启动的  
华为荣耀6禁止应用自启动/唤醒  
开发者选项不允许后台进程  
取消app系统权限  


## LINKS

[通过adb操作安卓亮屏解锁打开app](https://blog.csdn.net/feigoliu/article/details/50505377)  

[Xposed 入坑篇](https://www.jianshu.com/p/0c75c3169abb)  
[[实用教程] 【省电教程】无需Root，Nexus 6P限制APP唤醒的方法](http://bbs.gfan.com/android-8418350-1-1.html)    
[【导航贴】绿色守护教程/资源/问答 v1.0](https://tieba.baidu.com/p/5108711355?red_tag=2001865390)  
[有没有有效的办法切断安卓app的相互唤醒路径？](https://www.zhihu.com/question/31560390)  
[Android中如何杀死后台应用而不自启动](https://blog.csdn.net/duan140524/article/details/51766695)  
[Android系统启动2---Zygote启动及其作用](https://www.cnblogs.com/herenzhiming/articles/4998045.html)  