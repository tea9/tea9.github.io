---
layout: post
title: "1.使用jekyll搭建个人博客"
date: 2018-05-28
category: jekyll
tags: blog
---

# 一、GitHub Pages的配置
## 1.申请github账号
首先要注册github账户  
访问下面的网址  
https://github.com/  
点击Sign up for GitHub 按钮注册  

![注册github](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-1.png)

注册成功后点击Sign in 按钮 登录  
登录成功后验证下邮箱

## 2.创建项目
选择Start a project 按钮 开始一个项目  

![start a project](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-2.png)

填写   用户名.github.io  
点击Create repository 按钮  

![create a new repository](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-3.png)

## 3.配置ssh
打开终端  
输入命令 
 
	ssh-keygen -t rsa  
一直回车  

![ssh](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-3.png)

输入命令  

	open ~/.ssh  

![ssh](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-4.png)

之后会打开.ssh文件夹  
打开id_rsa.pub文件  

![ssh](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-5.png)

复制里面内容  
登录github 点击头像 ->点击Settings 按钮  

![settings](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-7.png)

点击左侧 SSH and GPG keys  

![settings](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-9.png)

之后点击New SSH key 按钮  

![ssh key](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-10.png)

Title 随便填  
Key 添加复制的内容  
点击Add SSH Key 按钮  

![ssh key](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-11.png)

终端输入  

	ssh -T git@github.com  
出现下面这个就是成功了  

![ssh](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-12.png)

## 4.上传代码到github
终端输入
  
	git clone git@github.com:用户名/用户名.github.io.git  
	cd 用户名.github.io/  
	echo "Hello World" > index.html  
	
	git init  
	git add --all  
	git commit -m "first commit"  
	git remote add origin git@github.com:用户名/用户名.github.io.git  

如果出现  fatal: remote origin already exists.  

![fatal](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-13.png)

就输入  

	git remote rm origin  

再输入  

	git remote add origin git@github.com:用户名/用户名.github.io.git  
	git push  -u origin master
	
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-14.png)

## 5.访问博客页面
打开浏览器  
输入  
https://用户名.github.io  
就会显示出Hello World  
就代表成功了  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-15.png)

---

# 二、jekyll配置

## 1.jekyll本地配置
windows的小伙伴可以看这个文章   
https://www.jianshu.com/p/88e3474cef72  

配置jekyll环境  
jekyll官网https://www.jekyll.com.cn/ 有不懂的可以参考下  

打开终端输入

	gem install jekyll
	jekyll new my-site
	
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-16.png)

终端输入

	cd my-site/
	jekyll serve

浏览器访问  
http://127.0.0.1:4000/

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-17.png)

出现下面这个界面，代表jekyll本地运行成功

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-18.png)

## 2.jekyll代码上传github
打开my-site文件夹  
复制所有文件  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-19.png)

再打开 用户名.github.io 文件夹  
删除index.html  
把复制的文件粘贴用户名.github.io 文件夹  


打开终端输入  
cd 用户名.github.io  
git add --all  
git commit -m  "add jekyll"  
git push -u origin master  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-21.png)

浏览器访问  
https://用户名.github.io/  
出现这个就上传github成功了，如果没出现，就清除下浏览器缓存再试试  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-22.png)

## 3.添加文章
所有文章默认都在_posts文件夹中
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-23.png)

你要做的是点击 _posts文件夹  
新建  
YYYY-MM-DD-文章标题.markdown  

其中YYYY为4位年份，MM是两位的月份，DD是两位的日期  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-24.png)

在用文本编辑器打开它
复制下面

	---
	layout: post
	title: test
	---
	
	hello world
	
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-25.png)
然后保存关闭  
打开终端输入  

	jekyll serve	

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-26.png)

浏览器访问 http://127.0.0.1:4000/  
就会出现你添加的文章  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-27.png)

## 4.把文章上传到github
打开终端

	cd 用户名.github.io
	git add --all
	git commit -m "add post"
	git push -u origin master

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-28.png)

上传成功后  
访问  
https://用户名.github.io/  

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/01/image-29.png)
