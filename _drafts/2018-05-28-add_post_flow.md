---
layout: post
title: "添加文章流程"
date: 2018-05-28
category: jekyll
tags: blog
---

## 1.创建文章

使用命令  
	
	rake post title="文章名称"

## 2.编辑文章
使用编辑器编写文章
## 3.本地预览
运行命令

	jekyll serve

访问浏览器
	
	http://127.0.0.1:4000/

## 4.把新建的文章上传到github
运行命令
	
	git init
	git add --all
	git commit -m "add post"
	git push -u origin master

## 5.在线预览
访问网址
	
	https://tea9.github.io
