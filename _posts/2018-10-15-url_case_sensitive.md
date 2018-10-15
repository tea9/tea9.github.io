---
layout: post
title: "URL中的大小写敏感"
date: 2018-10-15
category: web安全
tags: tips
---

## URL中的大小写敏感

	http://fred:wilma@www.example.com/private.asp?doc=3&part=4#footer

1. 协议标示符 （http/https） 大小写不敏感 HTTP、http、hTtP  

2. 用户ID和密码 （fred和wilma）可能大小写敏感 取决于你的服务器软件  

3. 机器的名称（www.example.com） 不是大小写敏感 www.eXamplE.coM 或者其他大小写组合  

4. 获取资源情况 （private.asp） ASP是Windows动态服务器扩展名 Windows服务器都不是大小写敏感的，因此/PRIvate.aSP可能也有效  
