---
layout: post
title: "SQL注入学习"
date: 2018-06-11
category: 笔记
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
+ docker run -dt --name sqli -p 80:80 --rm acgplano/sqli-labs  (-dt 后台运行 --name 命名 -p 端口名  80:80 本地：docker --rm 当停止后删除产生镜像)


### tips
对应代码，边看代码边理解，学会一半，就基本没问题。  

	


