---
layout: post
title: "android逆向z分析总结"
date: 2019-02-05
category: android
tags: android
---

## 分析
	
	找到两个有用的页面，然后不知道怎么利用

	# 二维码收款页面
	adb shell dumpsys window w |grep \/ |grep name=
	mSurface=Surface(name=com.eg.android.AlipayGphone/com.alipay.mobile.payee.ui.PayeeQRActivity)

	# 设置金额界面
	mSurface=Surface(name=com.eg.android.AlipayGphone/com.alipay.mobile.payee.ui.PayeeQRSetMoneyActivity)


## 跳转 生成二维码用扫一扫

	alipayqr://platformapi/startapp?saId=10000007 # 可以跳转转账页面
	alipays://platformapi/startapp?appId=20000067&url=www.baidu.com #可以扫码直接跳转百度
	alipays://platformapi/startapp?appId=20000067&url=http://admin.php05.cn/pay/index/ #一个其他支付平台搞来的 应该从支付宝跳转他的网站 具体不知道他是怎么判断的
	alipay?ms=OID=15489015933856&t=1548901593&tk=a53f9db256e66e4e 
	alipays://platformapi/startapp?appId=20000116&actionType=toAccount&account=yw@sytpay.cn #转账给yw@sytpay.cn 没有金额
	alipays://platformapi/startapp?appId=20000116&actionType=toAccount&account=13600000000 #转账给13600000000没有金额


	HTTPS://QR.ALIPAY.COM/FKX08616PJZ8VMCIEUUZ82 #转账页面

	总结：可以通过这种途径生成转账二维码 但是现在不知道怎么获取qrcode 就是链接后面的参数

## zfb的User-Agent

	POST /loggw/logUpload.do HTTP/1.1
	event: maxLogCount
	userId: 2088122652546913
	bizCode: RPC
	productId: Android-container
	Content-type: text/xml
	utdId: W/+IW5OSQUQDAG6PKvG5soVK
	ProcessName: tools
	productVersion: 10.1.55.6000
	Content-Encoding: gzip
	Content-Length: 4122
	Host: loggw.alipay.com:443
	Connection: close
	User-Agent: alipay

	GET /loggw/logConfig.do?templateId=2.0&utdId=W%2F%2BIW5OSQUQDAG6PKvG5soVK&productVersion=10.1.55.6000&actionType=mdapupload&userId=2088122652546913&productId=Android-container&processName=main HTTP/1.1
	Content-type: text/xml
	Accept-Encoding: gzip, deflate
	Host: mdap.alipay.com:443
	Connection: close
	User-Agent: alipay


[免签支付-一个用作分析的网站](http://admin.php05.cn/pay)  

## 结语

奋战了几天分析这个东西，几乎一点收获都没有，快崩溃了，敌人太强大了，我又太菜了，可咋整啊。总体来说，也学到了不少东西，也挺值得的。  

## LINKS
[XPosed插件自动生成支付宝收款二维码](https://www.52pojie.cn/thread-821871-1-1.html)  
[Xposed框架下实现支付宝微信生成指定金额和备注的二维码链接](https://blog.csdn.net/qq693411/article/details/83578847)  
[Android中破解某支付软件防Xposed的hook功能检测机制过程分析](https://www.52pojie.cn/thread-739521-1-1.html)  