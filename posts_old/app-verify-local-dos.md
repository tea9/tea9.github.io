---
title: app本地拒绝服务验证程序
tags:
  - android安全
  - 组件导出
  - 本地拒绝服务
abbrlink: 1546350071
date: 2019-08-13 19:07:09
---

## 本地拒绝服务
TODO  
还没写完  

主要思路就是  
启动组件然后传参  

```
adb shell am start -n com.qihoo.checkextracrash/.MainActivity -e package_name packagename -e class_name componentname

```

## CODES

[verify_local_dos_app](https://github.com/tea9/verify_local_dos_app)  

## LINKS

[APP漏洞扫描器之本地拒绝服务检测详解](https://bbs.pediy.com/thread-213434.htm)  
[Android应用本地拒绝服务漏洞浅析](http://www.droidsec.cn/android%e5%ba%94%e7%94%a8%e6%9c%ac%e5%9c%b0%e6%8b%92%e7%bb%9d%e6%9c%8d%e5%8a%a1%e6%bc%8f%e6%b4%9e%e6%b5%85%e6%9e%90/)  
[本地拒绝服务](https://www.jianshu.com/p/fa27cdbca90d)  
[Android常见漏洞之本地拒绝服务漏洞](https://bbs.ichunqiu.com/thread-38078-1-1.html)  
[利用Drozer进行app本地拒绝服务漏洞测试](http://rui0.cn/archives/30)  
[Android APP通用型拒绝服务漏洞分析报告](
)  