layout: post
title: Burp抓Android的包
category:
  - android逆向
tags:
  - android安全
  - android逆向
abbrlink: 1340440380
date: 2018-08-09 00:00:00
---
# Burp抓Android的包


## 设置ip
设置-网络-查看ip地址  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/01.png)
burp-设置ip  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/02.png)

手机  

电脑要跟手机连同一个wifi  
wifi-修改网络  
wifi密码钥匙串  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/03.png)

火狐浏览器配置  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/04.png)

## 安装证书  
设置浏览器代理  
火狐浏览器-首选项-网络代理-设置  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/05.png)
然后访问  
http://127.0.0.1:8080/  
下载证书  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/06.jpg)
保存文件
把后缀名修改成cer

华为手机：手机-设置-高级设置-安全-从SD卡安装  
小米手机：设置-更多设置-系统安全-从存储设备安装-内部存储空间  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/07.png)
我是用qq传的
tencent-QQfile_recv-cacert.cer

	adb push cacert.der /sdcard

然后输入手机密码
为证书命名
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/08.png)

手机访问网页  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/17/09.png)

## Links
[Burpsuite抓手机APP包并简要分析](https://blog.csdn.net/whstylist/article/details/78178161)