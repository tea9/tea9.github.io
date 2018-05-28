---
layout: post
title: "1.使用jekyll搭建个人博客"
date: 2018-05-28
category: blog
tags: jekyll blog
---

# 一、GitHub Pages的配置
## 1.申请github账号
首先要注册github账户  
访问下面的网址  
https://github.com/  
点击Sign up for GitHub 按钮注册  

![注册github](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/806C4C4FAB9D4B2FAEEDB0A7EACAF460/4909)

注册成功后点击Sign in 按钮 登录  
登录成功后验证下邮箱

## 2.创建项目
选择Start a project 按钮 开始一个项目  

![start a project](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/C21B71EE395E43E398B7E2F2CC77DE6A/4805)

填写   用户名.github.io  
点击Create repository 按钮  

![create a new repository](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/61B5E74841BC4734A38B8A73C60577A3/4914)

## 3.配置ssh
打开终端  
输入命令 
 
	ssh-keygen -t rsa  
一直回车  

![ssh](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/54E706F80DC34B23B30D8F6DE537FB10/4918)

输入命令  

	open ~/.ssh  

![ssh](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/B159DB0AE6764D50BB0D95F64D8D9A36/4920)

之后会打开.ssh文件夹  
打开id_rsa.pub文件  

![ssh](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/16EE30BED2FE451FBC427AA83C0AAB2B/4863)

复制里面内容  
登录github 点击头像 ->点击Settings 按钮  

![settings](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/5551E2B0BCBF481986E2585870DAD317/4867)

点击左侧 SSH and GPG keys  

![settings](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/970BE37B40A34BD583E9FB8F5CAEE3D4/4869)

之后点击New SSH key 按钮  

![ssh key](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/77411FC94C86461BBE10898E2826D529/4871)

Title 随便填  
Key 添加复制的内容  
点击Add SSH Key 按钮  

![ssh key](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/81048A040B89427D97078C822116B4A0/4873)

终端输入  

	ssh -T git@github.com  
出现下面这个就是成功了  

![ssh](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/E4F4B19EBDB443B6A8631EC3BC26C3DE/4922)

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

![fatal](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/0DA4C34B32704CDA8FEA2ED827EE0F13/4890)

就输入  

	git remote rm origin  

再输入  

	git remote add origin git@github.com:用户名/用户名.github.io.git  
	git push  -u origin master
	
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/718ABA76346747CCB3AA3DB021C0DBC2/4879)

## 5.访问博客页面
打开浏览器  
输入  
https://用户名.github.io  
就会显示出Hello World  
就代表成功了  
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/87EAC16F039343F2A3EBAE77BB0495EE/4895)

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
	
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/DE738BD9F74F4A849B09A3C83CF1EC8B/4945)

终端输入

	cd my-site/
	jekyll serve

浏览器访问  
http://127.0.0.1:4000/

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/5498ADDEA98A455C90CBFE1E41E69F79/4949)

出现下面这个界面，代表jekyll本地运行成功

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/29CD81AC56194CF2B63CD9046162BDF0/4953)

## 2.jekyll代码上传github
打开my-site文件夹  
复制所有文件  
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/04624E9244334067A74A6DEDBA5D869E/4961)

再打开 用户名.github.io 文件夹  
删除index.html  
把复制的文件粘贴到这个文件夹  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/C3EEEB1B27CE4AC284B35B0884E28FB9/4966)

打开终端输入  
cd 用户名.github.io  
git add --all  
git commit -m  "add jekyll"  
git push -u origin master  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/8AAAA75CE4EB41D2ADB879399AA4EE43/4969)

浏览器访问  
https://用户名.github.io/  
出现这个就上传github成功了，如果没出现，就清除下浏览器缓存再试试  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/09B9A9330A8B43EBA1080B64368F7C47/4978)

## 3.添加文章
所有文章默认都在_posts文件夹中
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/D4DA7ABB202F4CF191C8C0BA143C67D7/4993)

你要做的是点击 _posts文件夹  
新建  
YYYY-MM-DD-文章标题.markdown  

其中YYYY为4位年份，MM是两位的月份，DD是两位的日期  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/24907B93A5A744F3A842E7312E6DC5A4/5001)

在用文本编辑器打开它
复制下面

	---
	layout: post
	title: test
	---
	
	hello world
	
![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/4DE6B8E89653415B9B8A2E790265683A/5009)
然后保存关闭  
打开终端输入  

	jekyll serve	

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/E90A2C0B0AEC429780A1F4B0603B96E5/5012)

浏览器访问 http://127.0.0.1:4000/  
就会出现你添加的文章  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/82F2E70C7C794111B24CF25BC07D45A0/5014)

## 4.把文章上传到github
打开终端

	cd 用户名.github.io
	git add --all
	git commit -m "add post"
	git push -u origin master

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/16F54FD210A249F7885B850A70C03FE4/5023)

上传成功后  
访问  
https://用户名.github.io/  

![](https://note.youdao.com/yws/public/resource/d7196cb9897bff713f5b2e7b0df7f989/xmlnote/F4CE9C4C308043D48737855E23D62D86/5031)


















