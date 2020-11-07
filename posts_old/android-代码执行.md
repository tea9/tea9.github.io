---
title: android 代码执行
abbrlink: 693736904
date: 2019-08-01 10:07:25
tags:
	- android安全
	- APP漏洞
---

## android代码执行
 Android API level 16以及之前的版本存在远程代码执行安全漏洞，该漏洞源于程序没有正确限制使用WebView.addJavascriptInterface方法，远程攻击者可通过使用Java Reflection API利用该漏洞执行任意Java对象的方法，简单的说就是通过addJavascriptInterface给WebView加入一个JavaScript桥接接口，JavaScript通过调用这个接口可以直接操作本地的JAVA接口。该漏洞最早公布于CVE-2012-6636【1】，其描述了WebView中addJavascriptInterface API导致的远程代码执行安全漏洞。  

同时，在2014年发现在Android系统中webkit中默认内置的一个searchBoxJavaBridge_ 接口同时存在远程代码执行漏洞，该漏洞公布于CVE-2014-1939[7], 建议开发者通过以下方式移除该Javascript接口:      
```
removeJavascriptInterface("searchBoxJavaBridge_")
```
2014年香港理工大学的研究人员Daoyuan Wu和Rocky Chang发现了两个新的攻击向量存在于android/webkit/AccessibilityInjector.java中，分别是"accessibility" 和"accessibilityTraversal" ，调用了此组件的应用在开启辅助功能选项中第三方服务的安卓系统中会造成远程代码执行漏洞。该漏洞公布于CVE-2014-7224, 此漏洞原理与searchBoxJavaBridge_接口远程代码执行相似，均为未移除不安全的默认接口，建议开发者通过以下方式移除该JavaScript接口：

```
removeJavascriptInterface("accessibility")；
 removeJavascriptInterface("accessibilityTraversal")；
```

## 相关代码

```

webview.addJavascriptInterface(); Google Android <= 4.1.2 (API level 16) 受到此漏洞的影响。
 
webview内置导出的searchBoxJavaBridge_对象 Google Android <= 4.3.1 受到此漏洞的影响
 
webview内置导出的accessibility和accessibilityTraversal Object对象 Google Android < 4.4 受到此漏洞的影响。
```

## 参考解决方案

* 尽量不使用webview.addJavascriptInterface()方法
webview.removeJavascriptInterface("searchBoxJavaBridge_");
webview.removeJavascriptInterface("accessibility");
webview.removeJavascriptInterface("accessibilityTraversal");

* API等于高于17的Android系统。出于安全考虑，为了防止Java层的函数被随意调用，Google在4.2版本之后，规定允许被调用的函数必须以@JavascriptInterface进行注解。

* API等于高于17的Android系统。建议不要使用addJavascriptInterface接口，以免带来不必要的安全隐患，如果一定要使用该接口：

	a.如果使用https协议加载url，应用进行证书校验防止访问的页面被篡改挂马
	
	b.如果使用http协议加载url，应进行白名单过滤、完整性校验等防止访问的页面被篡改
	
	c.如果加载本地html，应将html文件内置在apk中，以及进行对html页面完整性的校验

* 使用removeJavascriptInterface移除Android系统内部的默认内置接口：searchBoxJavaBridge_、accessibility、accessibilityTraversal

## LINKS
[关于Android中WebView远程代码执行漏洞浅析](https://www.jb51.net/article/139432.htm)  