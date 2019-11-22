---
title: android webview 漏洞
abbrlink: 4272460574
date: 2019-05-05 19:41:27
tags:
- android安全
- webview
---
## 0x01 跨站脚本攻击
webview.getSettings().setJavaScriptEnabled(true) 设置WebView是否允许执行JavaScript脚本，默认false，不允许
	API <= 17
	需要注意的是在 API17 版本之后，需要在被调用的地方加上 @addJavascriptInterface 约束注解，因为不加上注解的方法是没有办法被调用的

## 0x02 任意代码执行漏洞
webview中addJavascriptInterface()接口

API <= 17
1、使用WebView.addJavascriptInterface方法注册可供javascript调用的java对象。
2、使用WebView加载外部网页。
3、Android系统版本低于4.2
在4.2以下放弃使用addJavascriptInterface，采用onJsPrompt或其它方法替换
或者使用一些方案来降低该漏洞导致的风险：如使用https并进行证书校验，如果是http则进行页面完整性校验，如上面所述移除隐藏接口

webview内置导出的searchBoxJavaBridge_对象
API < 17
webview内置导出的accessibility和accessibilityTraversal Object对象
Android3.0到4.4

## 0x03 密码明文存储漏洞
API for all
webview.setSavePassword(true)
开启后，在用户输入密码时，会弹出提示框 询问用户是否保存密码
选择是密码会明文保存到/data/data/com.package.name/databases/webview.db

## 0x04 域控制不严格漏洞
API for all(其实 android4.1 之后下面的值默认为 false)
file 协议 -- WebView域控制不严格漏洞
对于file协议的 url 从而获取内部私有文件
webview.setAllowFileAccess(false);

## 0x05 不校验证书漏洞
关于webview签名验证
绕过证书校验漏洞

1.https认证

自签名证书
WebViewClient onReceivedSslError 默认handler.cancel()(白屏) 直接使用handler.proceed() 忽略了证书存在安全隐患
读取asserts中根证书 通过了 继续执行handler.proceed() 否则执行handler.cancel()


## 其他

webview 基础设置
```
settings.setPluginState(WebSettings.PluginState.OFF);// 支持插件
如务必要设置off
``

## LINKS

https://www.cnblogs.com/liyiran/p/7011317.html
https://blog.csdn.net/lsyz0021/article/details/54669914
https://www.cnblogs.com/sslwork/p/6193258.html
https://blog.csdn.net/harvic880925/article/details/51523983
https://blog.csdn.net/carson_ho/article/details/64904635
https://blog.csdn.net/qq_30993595/article/details/80678795
https://www.freebuf.com/articles/terminal/159787.html
https://www.cnblogs.com/goodhacker/p/3343837.html
https://www.jianshu.com/p/cbd5e84c60e0
https://www.jianshu.com/p/2c69f19e8316
https://blog.csdn.net/andy_5826_liu/article/details/88096596
https://blog.csdn.net/weixin_41508948/article/details/86066400
https://www.cnblogs.com/laughingQing/p/6392455.html
https://blog.csdn.net/henry_alpha/article/details/53314294
https://www.cnblogs.com/harry335/p/4546965.html
https://blog.csdn.net/li15225271052/article/details/73730321
https://blog.csdn.net/amazing_alex/article/details/71410670
https://www.jianshu.com/p/56e2b0bf9ab2
https://www.jianshu.com/p/3a345d27cd42
https://blog.csdn.net/u013107656/article/details/51728576
https://blog.csdn.net/xundh/article/details/53065788

乌云漏洞库



