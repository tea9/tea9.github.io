---
layout: post
title: "SQL注入-SQL盲注-布尔盲注"
date: 2018-06-21
category: web安全
tags: web安全 sql注入 布尔盲注
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
【图片】

### 02布尔盲注方法

构造逻辑判断语句，判断信息的真假，取出所有的真值，实现SQL注入  

	left() left(database(),1)>'s'
			database()显示数据库名称，left(a,b)从左侧截取a的前b位
	regexp select user() regexp '^r'
			正则表达式的用法user()结果位root_re




[MySql正则表达式](http://www.runoob.com/mysql/mysql-regexp.html)














