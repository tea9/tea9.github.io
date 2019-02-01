---
layout: post
title: "Burp抓Android的包"
date: 2018-08-09
category: android逆向
tags: 安全 android逆向
---

# Burp抓Android的包


## 设置ip
设置-网络-查看ip地址  

![]({{site.img_link}}/17/01.png)
burp-设置ip  

![]({{site.img_link}}/17/02.png)

手机  

电脑要跟手机连同一个wifi  
wifi-修改网络  
wifi密码钥匙串  

![]({{site.img_link}}/17/03.png)

火狐浏览器配置  

![]({{site.img_link}}/17/04.png)

## 安装证书  
设置浏览器代理  
火狐浏览器-首选项-网络代理-设置  
![]({{site.img_link}}/17/05.png)
然后访问  
http://127.0.0.1:8080/  
下载证书  
![]({{site.img_link}}/17/06.jpg)
保存文件
把后缀名修改成cer

手机-设置-高级设置-安全-从SD卡安装
![]({{site.img_link}}/17/07.png)
我是用qq传的
tencent-QQfile_recv-cacert.cer

	adb push cacert.der /sdcard

然后输入手机密码
为证书命名
![]({{site.img_link}}/17/08.png)

## Links
[Burpsuite抓手机APP包并简要分析](https://blog.csdn.net/whstylist/article/details/78178161)  