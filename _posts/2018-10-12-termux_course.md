---
layout: post
title: "termux相关"
date: 2018-10-12
category: termux
tags: 安全 termux
---

## 前言：

Termux是一款开源且不需要root，运行在Android终端上极其强大的linux模拟器，支持apt管理软件包，完美支持python,ruby,go,nodejs。本文使用termux搭建Nmap、Sqlmap、BBScan、subDomainsBrute、Hydra、RouterSploit等实现支持端口扫描、注入检测、子域名爆破、多协议弱口令爆破、路由器漏洞检测框架多种功能的Android手机渗透神器。  

## LINKS

- 下载地址

[Termux GooglePlay](https://play.google.com/store/apps/details?id=com.termux)  

[Termux Youtube](https://www.youtube.com/playlist?list=PLbg6BPamoIGbXR52TdQAJwTkeDw8E6hIf)  

- 资料地址

[链接:](https://pan.baidu.com/s/1dpdn0vvA-aKQPmJCRLgSxQ)  
提取码: y27f  

## 常用命令

**Jupyter Notebook**  

	jupyter notebook --ip=0.0.0.0

**Sqlmap**

	cd sqlmap
	python2 sqlmap.py -h

**whatportis**
whatportis是一款离线查询端口号对应服务的工具  

	whatportis 3306


## LINKS

[电脑通过ssh连接android手机上的termux](https://www.aliyun.com/jiaocheng/120639.html)  