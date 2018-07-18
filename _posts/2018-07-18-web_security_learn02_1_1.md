---
layout: post
title: "2.1.1-文件上传流动原理与流程-文件上传漏洞原理"
date: 2018-07-18
category: web安全
tags: 文件上传漏洞
---

## 上传&上传漏洞&上传检测流程

**什么是文件上传**  

> 文件上传是一个网站的常见功能，多用于上传照片、视频、文档等许多类型文件。

**上传文件流程**  

1.前端选择文件，进行提交。  
2.浏览器形成POST MultiPart报文发送到服务器。  
3.服务器中间件接受到报文，解析后交给相关后端代码进行处理。  
4.后端代码将上传的文件内容写入到临时文件中（PHP特有）。  
5.写入到文件中，文件名为提交的文件名或以一定规则生成的文件名。  

---

通过burp截取到上传文件的请求信息  

![通过burp截取到上传文件的请求信息]({{site.img_link}}/14/01.png)

前端代码对应请求到的信息  
![前端代码对应请求到的信息]({{site.img_link}}/14/02.png)

前后端代码  
![前后端代码 ]({{site.img_link}}/14/03.png)

后端：

	<?php
	$uploaddir = 'uploads/';
	if (isset($_POST['submit']) {
		if(file_exists($uploaddir)) {
			if (move_uploaded_file($_FILES['upfile']['tmp_name'], $uploaddir . '/' . $_FILES['upfile']['name'])) {
				echo '文件上传成功，保存于：' . $uploaddir . $_FILES['upfile']['name'] . "\n";
			}
		} else {
			exit($uploaddir . '文件夹不存在，请手工创建!');
		}
	}
	?>


前端：

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
		<meta http-equiv="Content-Type" content="text/html;charset=gbk"/>
		<meta http-equiv="content_language" content="zh-CN"/>
		<title>文件上传漏洞演示脚本</title>
		<body>
		<h3>文件上传漏洞演示脚本</h3>
		<form>
			<input type="hidden" name="MAX_FILE_SIZE" vlaue="204800"/>
			请选择要上传的文件：<input type="file" name="upfile"/>
			<input type="submit" name="submit" value="上传"/>
		</form>
		</body>
	</html>
---

### 文件上传漏洞产生的原因

> 当文件上传点未对上传的文件进行严格的验证和过滤时，就容易造成任意文件上传，包括上传动态文件（asp/php/jsp等等）。   
> 如果上传的目标目录没有限制执行权限，导致所上传的动态文件（比如webshell）可以正常执行并且可以访问，即造成了文件上传漏洞。  

**上传漏洞必要条件是：**

1.存在上传点  
2.可以上传动态文件  
3.上传目录有执行权限，并且上传的文件可执行  
4.可访问到上传的动态文件

