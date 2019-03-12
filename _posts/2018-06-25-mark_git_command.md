---
layout: post
title: "github上fork了别人的项目后，再同步更新别人的提交"
date: 2018-06-25
category: git
tags: 马克 git
---

[github上fork了别人的项目后，再同步更新别人的提交](https://blog.csdn.net/qq1332479771/article/details/56087333)


	
	git remote -v
	git remote add upstream aaa
	git remote -v
	git remote remove upstream

	4.重新添加源代码库
	git remote add upstream <fork link>
	git remote -v

	5.从源仓库更新同步代码
	git fetch upstream

	6.合并到本地代码库
	git merge upstream/master

	7.拉取远程代码库
	git pull origin master

	8.更新远程代码库
	git push 
