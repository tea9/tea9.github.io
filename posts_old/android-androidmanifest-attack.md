---
title: android androidmanifest需要检测的安全问题
tags:
  - android安全
abbrlink: 1654160465
date: 2019-07-22 18:25:57
---

## AndroidManifest系统权限使用检测
系统权限设置，并且放置在/system/app，否则就是一个恶意app。  

```
android.permission.MOUNT_FORMAT_FILESYSTEM
android.permission.MOUNT_UNMOUNT_FILESYS
android.permission.RESTART_PACKAGES
```

## AndroidManifest permission protectionLevel属性
会导致组件（如 contennt provider）数据泄露危险。最好的权限设置应为"signature"或"signatureOrSystem",进而避免被第三方应用利用。  

检查所有自定义permission protectionLevel属性。  未设置protectionLevel 默认情况下 permission 的protectionLevel为"normal",若protectionlevel为“normal”或“dangerous”或者未设置protectionLevel，均认为不安全。  

注意使用“signature”或“signatureOrSystem”防止其他app注册或接受该app的消息，提高安全性。  

##  AndroidManifest sharedUserId 检测
(1)描述
通过sharedUserId，可以让拥有同一个User Id的多个apk运行在同一个进程中，互相访问任意资源。将sharedUserId设置为“android.uid.system”，可以把app放到系统进程中，app将获得极大的权限。如果app同时有master key漏洞，容易导致被root。

(2)风险等级
如果sharedUserId设置为“android.uid.system”且app有master key漏洞，则是高危漏洞； 若没有master key漏洞，则是提醒
(3)检测方法
检测类型：静态分析 通过apktool分析AndroidManifest.xml。
(4)参考资料
http://www.cnblogs.com/wotakuc/archive/2013/03/27/2984423.html
http://www.saurik.com/id/17
https://books.google.com.hk/books?id=UgVhBgAAQBAJ&pg=PA230&lpg=PA230&dq=android.uid.system+master+key&source=bl&ots=SWA4ugfgI1&sig=Nx6X1ORGXHWnntVrlNP15R32wSw&hl=zh-CN&sa=X&ved=0ahUKEwinrqDvwanNAhVCUZQKHbXZDRgQ6AEIMzAD#v=onepage&q=android.uid.system%20master%20key&f=false

## AndroidManifest allowBackup标志
当这个标志被设置成true或不设置该标志位时，应用程序数据可以备份和恢复。
 `adb backup -nosystem -noshared -apk -f com.xx.xxx.ab com.xx.xxx`
 `adb restore com.xx.xxx.ab`
 设置AndroidManifest.xml的android:allowBackup标志为false  

 ## AndroidManifest Debuggable标志
 如果该项被打开，app存在被恶意程序调试的风险，可能导致敏感信息泄露等问题。  

 显示设置AndroidManifest.xml的debuggable标志为false。  

 ## 非必要权限检测
 是否使用android.permission.ACCESS_MOCK_LOCATION权限，该权限是使在模拟器中使用，用于获取模拟定位信息。  

 移除”android.permission.ACCESS_MOCK_LOCATION”权限

## app最低版本检测
罗列出跟版本相关的漏洞。  

## Implicit Service漏洞检测
为了确保应用的安全性，启动 Service 时，请始终使用显式 Intent，且不要为服务声明 Intent 过滤器。使用隐式 Intent 启动服务存在安全隐患，因为您无法确定哪些服务将响应 Intent，且用户无法看到哪些服务已启动。从 Android 5.0（API 级别 21）开始，如果使用隐式 Intent 调用 bindService()，系统会抛出异常。  

首先检测exported属性，再检测permission及其对应的protectionLevel属性，最后检测组件是否有设置intent-filter设置过滤action  

## Provider grant-uri-permission属性检测
grant-uri-permission若设置为true，可被其它程序员通过uri访问到content provider的内容，容易造成信息泄露。默认是false。  

##  Intent-Based攻击检测
在AndroidManifest文件中定义了android.intent.category.BROWSABLE属性的组件，可以通过浏览器唤起，这会导致远程命令执行漏洞攻击。  

Activity只有配置了category filter才有被android.intent.category.BROWSABLE通过这种方式在浏览器中打开

通过扫描Minifest中的所有组件，检测出所有组件中intent-filter带有<category android:name="android.intent.category.BROWSABLE"/>属性的。  

修复：
APP中任何接收外部输入数据的地方都是潜在的攻击点，过滤检查来自网页的参数

不要通过网页传输敏感信息，有的网站为了引导已经登录的用户到APP上使用，会使用脚本动态的生成URL Scheme的参数，其中包括了用户名、密码或者登录态token等敏感信息，让用户打开APP直接就登录了。恶意应用也可以注册相同的URL Sechme来截取这些敏感信息。Android系统会让用户选择使用哪个应用打开链接，但是如果用户不注意，就会使用恶意应用打开，导致敏感信息泄露或者其他风险。  


## manifest组件未实现检测
在manifest文件中定义的组件导出，且没有代码实现，则攻击者可以通过ddos攻击导致app奔溃。  

首先获取app源码中所有的类路径（包名+类名），然后检测manifest中声明的所有组件是否存在于类路径中即可。

删除manifest文件中无效的导出组件

检测manifest的所有组件是否有对应类。  




