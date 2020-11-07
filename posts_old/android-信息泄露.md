---
title: android 信息泄露
abbrlink: 3540884968
date: 2019-08-01 10:09:37
tags:
	- android安全
	- APP漏洞
---
## ContentProvider目录遍历

> 该漏洞由于Content Provider组件暴露，没有对Content Provider组件访问权限进行限制且对Uri路径没有进行过滤，攻击者通过Content Provider实现的OpenFile接口进行攻击，如通过”../”的方式访问任意的目录文件，造成隐私泄露。  


[7.3 ContentProvider目录遍历漏洞检测](http://01hackcode.com/wiki/7.3)  

## 本地存储泄露信息
