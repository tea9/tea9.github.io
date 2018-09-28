---
layout: post
title: "使用pyenv切换python版本"
date: 2018-06-12
category: python
tags: python pyenv
---

## 关键代码

	which python3.6

	brew install pyenv

	pyenv install --list // 可安装的python版本
	pyenv install -v 2.7.10 // 安装python
	pyenv rehash // 更新
	pyenv versions // 查看已经安装的python版本
	pyenv global 2.7.10 // 切换python版本
	pyenv global system // 切换原来版本

	python --version

## LINKS

[在macOS上通过pyenv安装和切换多版本Python](https://www.cnblogs.com/blackmatrix/p/5591341.html)   

[python安装目录](https://blog.csdn.net/shelldawn/article/details/77912902)  

[使用pyenv管理不同的python版本](https://www.cnblogs.com/zydev/p/7802079.html)  

[Mac Python路径总结](https://blog.csdn.net/transformer_wsz/article/details/72848547)  