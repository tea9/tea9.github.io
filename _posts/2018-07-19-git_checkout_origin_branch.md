---
layout: post
title: "git切换远程分支命令"
date: 2018-07-19
category: git
tags: git branch
---

1.克隆项目  

	git clone <项目链接>

2.进入项目  

	cd work

3.列出所有分支  
	
	git branch -a

输出  

	remotes/origin/dev
	remotes/origin/release

4.切换远程开发分支  

	git checkout -b dev origin/dev

	切换远程分支origin/dev

5.切换远程正式分支  

	git checkout -b release origin/release

6.切换回本地dev分支，开始开发  

	git checkout dev

## git图形化工具

[GitHub Desktop](https://desktop.github.com/)  

[Sourcetree](https://www.sourcetreeapp.com/)墙裂推荐！！！超好用  

## 相关链接

[git 切换远程分支](https://www.cnblogs.com/libertycode/p/5858450.html)  
[Git常用命令大全，迅速提升你的Git水平](http://www.jqhtml.com/8235.html)
