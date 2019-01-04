---
layout: post
title: "android启动一个app的命令"
date: 2019-01-04
category: android
tags: android
---


	01/04 14:52:52: Launching app
	$ adb push /Users/shaomiao/Documents/product/adb_check_qr/app/build/outputs/apk/debug/app-debug.apk /data/local/tmp/com.demo.adbcheckqr
	$ adb shell pm install -t -r "/data/local/tmp/com.demo.adbcheckqr"
	Success
	APK installed in 11 s 648 ms
	$ adb shell am start -n "com.demo.adbcheckqr/com.demo.adbcheckqr.activity.TestActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
	Client not ready yet..Waiting for process to come online
	Waiting for process to come online
	Connected to process 24996 on device huawei-col_al10-VBJ0218814008992
	Capturing and displaying logcat messages from application. This behavior can be disabled in the "Logcat output" section of the "Debugger" settings page.
	D/CrashReport: [Util] Try to lock file:local_crash_lock (pid=24996 | tid=25024)
	D/CrashReport: [Util] Successfully locked file: local_crash_lock (pid=24996 | tid=25024)
	D/CrashReport: Size of crash list loaded from DB: 0
	D/CrashReport: [Util] Try to unlock file: local_crash_lock (pid=24996 | tid=25024)
	D/CrashReport: [Util] Successfully unlocked file: local_crash_lock (pid=24996 | tid=25024)
	W/InputMethodManager: startInputReason = 8
	D/CrashReport: >>> com.demo.adbcheckqr.activity.TestActivity onPaused <<<
	V/ActivityThread: Finishing stop of ActivityRecord{43160d4 token=android.os.BinderProxy@6f9f93f {com.demo.adbcheckqr/com.demo.adbcheckqr.activity.TestActivity}}
	W/libEGL: EGLNativeWindowType 0x705d3b7010 disconnect failed
	V/ActivityThread: Handle window ActivityRecord{43160d4 token=android.os.BinderProxy@6f9f93f {com.demo.adbcheckqr/com.demo.adbcheckqr.activity.TestActivity}} visibility: false


	adb push /Users/shaomiao/Documents/product/adb_check_qr/app/build/outputs/apk/debug/app-debug.apk /data/local/tmp/com.demo.adbcheckqr

	adb shell pm install -t -r "/data/local/tmp/com.demo.adbcheckqr"

	adb shell am start -n "com.demo.adbcheckqr/com.demo.adbcheckqr.activity.TestActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER


	adb push 上传
	adb shell pm install 安装
	adb shell am start 启动


