---
layout: post
title: "jekyll-theme-H2O的gitalk相关配置"
date: 2018-06-24
category: jekyll
tags: blog gitalk
---

[jekyll-theme-H2O](https://github.com/tea9/jekyll-theme-H2O)的gitalk配置

[gitalk](https://github.com/gitalk/gitalk)

## 01.注册GitHub Application

[注册GitHub Application](https://github.com/settings/applications/new)

<pre>
	<code class="language-javascript">
Application name:项目名称  
Homepage URL:域名地址  
Application description:项目描述  
Authorization callback URL:回掉地址  
	</code>
</pre>

![注册GitHub Application](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/07/01.png)

![Client ID](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/07/02.png)

注册成功后会获得Client ID和Client Secret  

## 02.配置_config.yml

<pre>
	<code class="language-javascript">
gitalk: true
gitalk_clientID: 'clientID'
gitalk_Secret: 'Secret'
gitalk_repo: '用户名.github.io'
gitalk_owner: 'github用户名'
gitalk_admin: 'github用户名'
distractionFreeMode: true
	</code>
</pre>

![config](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/07/03.png)