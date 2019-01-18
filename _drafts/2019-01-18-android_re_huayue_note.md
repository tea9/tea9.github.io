---
layout: post
title: "android_re_huayue_note"
date: 2019-01-18
category: 
tags: 
---
[unicode工具](http://tool.chinaz.com/tools/unicode.aspx)

包名：

com.sytpay.paytimework.SplashActivity
com.hypay.pay.pkg provider
com.sytpay.paytimework.AutoTransferActivity
com.azhon.appupdate.service.DownloadService

0x00
修改
com.sytpay.paytimework.MainActivity
对应的smali
的字符串判断位置
当前登录微信账号 replace 当前登录微信账号hacked
当前登录支付宝账号 replace 当前登录支付宝账号hacked

smali位置
hueyue/smali/com/paytimework/MainActivity.smali

java

	class BillReceived extends BroadcastReceiver {

smali
	
	search
	unicode
	\u5f53\u524d\u767b\u5f55\u5fae\u4fe1\u8d26\u53f7
	当前登录微信账号

	

