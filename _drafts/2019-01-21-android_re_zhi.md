---
layout: post
title: "android_re_zhi"
date: 2019-01-21
category: android
tags: android
---

- icodetools
- mpropo工具
---

【Android逆向之旅---破解某支付软件防Xposed的hook功能检测机制过程分析】（https://blog.csdn.net/jiangwei0910410003/article/details/80037971）

抓包信息
直接扫码

GET /test/alipayQR2.php?userId=2088702193820914&money=30&memo=5b21e38776bd HTTP/1.1
Host: api.hypay.xyz
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Linux; Android 6.0; HUAWEI VNS-AL00 Build/HUAWEIVNS-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,en-US;q=0.8
X-Wap-Profile: http://wap1.huawei.com/uaprof/HUAWEI_VNS_AL00_UAProfile.xml
Connection: close


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
---
http://admin.php05.cn/pay 免签支付
## 抓包信息

/index.php/Api/Index/createOrder?merchant=201901040156014034&orderAmount=10&orderId=15489170719852&outcome=no&payMethod=2&payType=21&signType=MD5&version=1.0&sign=80E2D844C0616193B6FF92F1D4535849&productName=%E6%B5%8B%2F%2F%2F%2F%E8%AF%95&productDesc=%E8%AE%A2%E5%8D%959677&createTime=1548917071&returnUrl=http%3A%2F%2Fwww.baidu.com%2F&notifyUrl=http%3A%2F%2Fapi.hypay.xyz%2Findex.php%2FApi%2FTest%2Fmm



http://api.hypay.xyz/index.php/Api/Index/createOrder?merchant=201901040156014034&orderAmount=10&orderId=15489170719852&outcome=no&payMethod=2&payType=21&signType=MD5&version=1.0&sign=80E2D844C0616193B6FF92F1D4535849&productName=%E6%B5%8B%2F%2F%2F%2F%E8%AF%95&productDesc=%E8%AE%A2%E5%8D%959677&createTime=1548917071&returnUrl=http%3A%2F%2Fwww.baidu.com%2F&notifyUrl=http%3A%2F%2Fapi.hypay.xyz%2Findex.php%2FApi%2FTest%2Fmm




POST /index.php/api/pay_check/ispaysuccess.html HTTP/1.1
Host: api.hypay.xyz
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:64.0) Gecko/20100101 Firefox/64.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://api.hypay.xyz/index.php/Api/Index/createOrder?merchant=201901040156014034&orderAmount=10&orderId=15489170719852&outcome=no&payMethod=2&payType=21&signType=MD5&version=1.0&sign=80E2D844C0616193B6FF92F1D4535849&productName=%E6%B5%8B%2F%2F%2F%2F%E8%AF%95&productDesc=%E8%AE%A2%E5%8D%959677&createTime=1548917071&returnUrl=http%3A%2F%2Fwww.baidu.com%2F&notifyUrl=http%3A%2F%2Fapi.hypay.xyz%2Findex.php%2FApi%2FTest%2Fmm
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 86
Connection: close
Cookie: PHPSESSID=a362i50keheptnrnpjnfdnsnb7

screenW=1920&screenH=1057&pnoi=1548917071-15489170719852-1761428725-201901040156014034


POST /SalesMerchants/ceshimer.html HTTP/1.1
Host: pay.hypay.xyz
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:64.0) Gecko/20100101 Firefox/64.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://pay.hypay.xyz/SalesMerchants/merDetail/id/1589.html
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 108
Connection: close
Cookie: PHPSESSID=a2t00u55qlvdpc0e9spoq1ct30

platform_merchant_no=201901040156014034&platform_key=ACB3CFADFA9343C163879550C6CC37AC&money=10&pay_method=21



支付宝的ua
POST /usercontext/v1/controllerhub/getconfig?key=AIzaSyAP-gfH3qvi6vgHZbSYwQ_XHqV_mXHhzIk HTTP/1.1
Content-Type: application/x-protobuf
X-Android-Cert: 38918A453D07199354F8B19AF05EC6562CED5788
X-Android-Package: com.google.android.gms
Accept-Encoding: gzip, deflate
User-Agent: GmsCore/9879440 (HWVNS-Q HUAWEIVNS-AL00); gzip
Content-Length: 295
Host: www.googleapis.com
Connection: close


¤
_
com.google.android.gms9.8.79 (440-137224771)ÿÚ"(38918A453D07199354F8B19AF05EC6562CED57885
com.google.android.gms9.8.79 (440-137224771)ÿÚº§-"&1:08e5ea32-6923-4b47-af5a-f437fa9e74f2*"
HUAWEIHUAWEI VNS-AL00"6.0(2


GET /?from=844b&vit=fps HTTP/1.1
Cookie: BAIDUID=11607CE761D69F243DD71D2472A90F7D:FG=1; rsv_i=59a2hA0qWicSzgO03BJiiYVrrxudB3HuBBa4%2B8ujoRCSABmiJUEZMQ2rB0O%2FM9QQRm4KLN%2BM6wYR03nXVFiRy0ELGGgNgJc; FEED_SIDS=872875_0131_14; BDSVRTM=39; plus_lsv=ddc613f2c501e5a7; plus_cv=1::m:d03af37f; BDORZ=AE84CDB3A529C0F8A2B9DCDD1D18B695; Hm_lvt_12423ecbc0e2ca965d84259063d35238=1548917272; Hm_lpvt_12423ecbc0e2ca965d84259063d35238=1548917272; __bsi=10796172367000851816_00_81_N_R_2_0303_c02f_Y; SE_LAUNCH=5%3A25815287; H_WISE_SIDS=126887_126703_128698_127235_129070_109776_128070_127488_120763_120188_123018_128638_122156_118883_118871_118857_118822_118802_107316_126996_129180_127771_129088_127768_117330_128449_117428_128450_128820_128402_129036_127025_128789_129010_128967_128247_127797_126720_129144_127763_128933_124030_128343_110085_123290_129252_128762_128807_128601_127416_128960
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
User-Agent: Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; HUAWEI VNS-AL00 Build/HUAWEIVNS-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.8.8.968 UWS/2.13.2.48 Mobile Safari/537.36 UCBS/2.13.2.48_181222104309 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:WIFI,ws:360|0|3.0) AliApp(AP/10.1.55.6000) AlipayClient/10.1.55.6000 Language/zh-Hans useStatusBar/true isConcaveScreen/false
Upgrade-Insecure-Requests: 1
Accept-Language: zh-CN,en-US;q=0.8
Accept-Encoding: gzip, deflate
Host: m.baidu.com
Connection: close



GET /?from=844b&vit=fps HTTP/1.1
Cookie: BAIDUID=11607CE761D69F243DD71D2472A90F7D:FG=1; rsv_i=59a2hA0qWicSzgO03BJiiYVrrxudB3HuBBa4%2B8ujoRCSABmiJUEZMQ2rB0O%2FM9QQRm4KLN%2BM6wYR03nXVFiRy0ELGGgNgJc; FEED_SIDS=872875_0131_14; BDSVRTM=39; plus_lsv=ddc613f2c501e5a7; plus_cv=1::m:d03af37f; BDORZ=AE84CDB3A529C0F8A2B9DCDD1D18B695; Hm_lvt_12423ecbc0e2ca965d84259063d35238=1548917272; Hm_lpvt_12423ecbc0e2ca965d84259063d35238=1548917272; __bsi=10796172367000851816_00_81_N_R_2_0303_c02f_Y; SE_LAUNCH=5%3A25815287; H_WISE_SIDS=126887_126703_128698_127235_129070_109776_128070_127488_120763_120188_123018_128638_122156_118883_118871_118857_118822_118802_107316_126996_129180_127771_129088_127768_117330_128449_117428_128450_128820_128402_129036_127025_128789_129010_128967_128247_127797_126720_129144_127763_128933_124030_128343_110085_123290_129252_128762_128807_128601_127416_128960
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
User-Agent: Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; HUAWEI VNS-AL00 Build/HUAWEIVNS-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.8.8.968 UWS/2.13.2.48 Mobile Safari/537.36 UCBS/2.13.2.48_181222104309 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:WIFI,ws:360|0|3.0) AliApp(AP/10.1.55.6000) AlipayClient/10.1.55.6000 Language/zh-Hans useStatusBar/true isConcaveScreen/false
Upgrade-Insecure-Requests: 1
Accept-Language: zh-CN,en-US;q=0.8
Accept-Encoding: gzip, deflate
Host: m.baidu.com
Connection: close



## 分析

	# 二维码收款页面
	adb shell dumpsys window w |grep \/ |grep name=
	mSurface=Surface(name=com.eg.android.AlipayGphone/com.alipay.mobile.payee.ui.PayeeQRActivity)

	# 设置金额界面
	mSurface=Surface(name=com.eg.android.AlipayGphone/com.alipay.mobile.payee.ui.PayeeQRSetMoneyActivity)


##
跳转支付宝

alipayqr://platformapi/startapp?saId=10000007
alipays://platformapi/startapp?appId=20000067&url=www.baidu.com
alipays://platformapi/startapp?appId=20000067&url=http://admin.php05.cn/pay/index/alipay?ms=OID=15489015933856&t=1548901593&tk=a53f9db256e66e4e

HTTPS://QR.ALIPAY.COM/FKX08616PJZ8VMCIEUUZ82

alipays://platformapi/startapp?appId=20000116&actionType=toAccount&account=yw@sytpay.cn

alipays://platformapi/startapp?appId=20000116&actionType=toAccount&account=13674633874



https://qr.alipay.com/fkx06182mk5n6j9t83bh37e?t=1548919501665

alipayqr://platformapi/startapp?saId=10000007&qrcode=HTTPS%3a%2f%2fQR.ALIPAY.COM%2fFKX09099VQZDCJ1QFGXA9F


[Xposed框架下实现支付宝微信生成指定金额和备注的二维码链接](https://blog.csdn.net/qq693411/article/details/83578847)  

PayHelperUtils sendAppMsg

---

intent://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2F{urlCode}%3F_s%3Dweb-other&_t=1472443966571#Intent;scheme=alipayqr;package=com.eg.android.AlipayGphone;end



alipayqr://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=FKX08616PJZ8VMCIEUUZ82


http://api.hypay.xyz/index.php/Api/Index/createOrder?merchant=201901040156014034&orderAmount=1&orderId=15488396014756&outcome=no&payMethod=2&payType=21&signType=MD5&version=1.0&sign=D93ED8A3DDEDC60FF8199ACA9C63B338&productName=%E6%B5%8B%2F%2F%2F%2F%E8%AF%95&productDesc=%E8%AE%A2%E5%8D%959677&createTime=1548839601&returnUrl=http%3A%2F%2Fwww.baidu.com%2F&notifyUrl=http%3A%2F%2Fapi.hypay.xyz%2Findex.php%2FApi%2FTest%2Fmm


HTTPS://QR.ALIPAY.COM/FKX08616PJZ8VMCIEUUZ82
https://qr.alipay.com/fkx02271y5g6sbxgf
gp3h7f

---

项目：

[AlipayQRHook](https://github.com/wayu002/AlipayQRHook)  

[XPosed插件自动生成支付宝收款二维码](https://www.52pojie.cn/thread-821871-1-1.html)  

[Android支付宝蚂蚁森林能量自动收取插件开发原理解析](https://www.52pojie.cn/forum.php?mod=viewthread&tid=794312&extra=page%3D1%26filter%3Ddigest%26digest%3D1)  

[Android中破解某支付软件防Xposed的hook功能检测机制过程分析](https://www.52pojie.cn/thread-739521-1-1.html)  