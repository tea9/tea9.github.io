---
layout: post
title: "android_re_zhi"
date: 2019-01-21
category: android
tags: android
---

- icodetools
- mpropo工具

## 分析

	# 二维码收款页面
	adb shell dumpsys window w |grep \/ |grep name=
	mSurface=Surface(name=com.eg.android.AlipayGphone/com.alipay.mobile.payee.ui.PayeeQRActivity)


##
跳转支付宝

alipayqr://platformapi/startapp?saId=10000007
alipays://platformapi/startapp?appId=20000067&url=www.baidu.com
alipays://platformapi/startapp?appId=20000067&url=http://admin.php05.cn/pay/index/alipay?ms=OID=15489015933856&t=1548901593&tk=a53f9db256e66e4e

HTTPS://QR.ALIPAY.COM/FKX08616PJZ8VMCIEUUZ82


https://blog.csdn.net/qq693411/article/details/83578847

PayHelperUtils sendAppMsg

---

项目：

[AlipayQRHook](https://github.com/wayu002/AlipayQRHook)  

[XPosed插件自动生成支付宝收款二维码](https://www.52pojie.cn/thread-821871-1-1.html)  

[Android支付宝蚂蚁森林能量自动收取插件开发原理解析](https://www.52pojie.cn/forum.php?mod=viewthread&tid=794312&extra=page%3D1%26filter%3Ddigest%26digest%3D1)  

[Android中破解某支付软件防Xposed的hook功能检测机制过程分析](https://www.52pojie.cn/thread-739521-1-1.html)  