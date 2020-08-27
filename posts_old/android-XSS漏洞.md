---
title: android XSS攻击
abbrlink: 1228473938
date: 2019-08-01 10:22:31
tags:
	- android安全
	- APP漏洞
---

## XSS攻击
> XSS攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是JavaScript，但实际上也可以包括Java、 VBScript、ActiveX、 Flash 或者甚至是普通的HTML。攻击成功后，攻击者可能得到包括但不限于更高的权限（如执行一些操作）、私密网页内容、会话和cookie等各种内容。  

## android XSS漏洞

基于android设备上可以加载web页面，由于配置不当或过滤不当，仍可导致xss漏洞。  

## android webview相关代码

```
webview.getSettings().setJavaScriptEnabled(true); Android api <17
```

## 参考解决方案  

- webview.getSettings().setJavaScriptEnabled(false);

- 如果相关业务必须使用JavaScript交互，应过滤危险参数，使用jsbridge技术⽅案时，必须配置域名白名单，并使用URL库解析host进行校验。  
- API等于高高于17的Android系统。出于安全考虑，为了防止Java层的函数被随意调用，Google在4.2版本之后，规定允许被调用的函数必须以@JavascriptInterface进行注解。

- API等于高高于17的Android系统。建议不要使用addJavascriptInterface接口，一面带来不必要的安全隐患，如果一定要使用该接口：
d.如果使用https协议加载url，应用进行证书校验防止访问的页面被篡改挂马.
e.如果使用http协议加载url，应进行白名单过滤、完整性校验等防止访问的页面被篡改.
f.如果加载本地html，应将html文件内置在apk中，以及进行对html页面完整性的校验.

- 使用removeJavascriptInterface移除Android系统内部的默认内置接口： searchBoxJavaBridge_、accessibility、accessibilityTraversal