---
title: Burp抓ios的包
tags:
  - ios安全
abbrlink: 2864432996
date: 2019-07-25 17:39:01
---

## 安装证书  
1.浏览器访问http://127.0.0.1:8080/  
下载证书  
2.放到局域网服务器、或者发邮件  

```
cd ~/Sites 
cacert.der
```
3.局域网访问  
（在局域网启动一个服务器，把证书丢到服务器上，在手机上下载）
http://1.11.11/cacert.der  
下载证书  
安装证书  

## 设置代理
burp-options-add 设置代理  
ios端设置代理  