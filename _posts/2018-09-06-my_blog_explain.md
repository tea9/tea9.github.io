---
layout: post
title: "我的博客说明指南"
date: 2018-09-06
category: blog
tags: blog
---

# 博客自定义指南

博客链接/blog link  
[tea9](https://tea9.xyz/)  

使用[Jekyll](//jekyllrb.com)博客引擎  
基于[Theme H2O](https://github.com/kaeyleo/jekyll-theme-H2O)修改  


## 前置条件/Before：  

需要你有  
[GitHub](http://www.github.com/)  
[Github Page](https://pages.github.com/)  
[Jekyll](https://jekyllrb.com/)环境  

如以上都有还有问题请参考  
[使用jekyll搭建个人博客](https://tea9.xyz/2018/05/28/create_jekyll_blog1.html)  
[jekyll-theme-H2O_README](https://github.com/kaeyleo/jekyll-theme-H2O/blob/master/README.md)  

## 步骤/Step：  

[github目录](https://github.com/tea9/tea9.github.io)

**克隆项目：**  

	git clone https://github.com/tea9/tea9.github.io.git

**目录结构：**  

```
	.
	├──_drafts # 草稿目录 -可以删除此目录/建议清空目录  
	├──_includes # 一些封装的布局  
	├──_layouts # 默认布局  
	├──_posts # 文章目录 -建议清空目录  
	├──assets # 一些前端文件  
	├──dev # 未编译的前端文件  
	├──laji # 我的之前博客文件 -目录建议删除  
	├──live2d # 首页的二次元小姐姐  
	├──pages  # 一些我自定义的页面  
	|	├──about.md #关于我页面  
	|	├──links.md # 友情链接页面  
	|	└── message.md # 留言板页面  
	├──pdf # 文章里的引用的电子书 可以删除此目录  
	├──readme_img # README.md 中引用的图片 可以删除此目录  
	├──resource # 我的一些瞎写的样式 可以删除此目录  
	├──yoone # 有药待办 如果不需要 可以删除此目录  
	├──1.mp3 # 樱花页面自动播放的音乐  
	├──403.html  
	├──404.html  
	├──CNAME # 域名配置信息 如果你有域名可以修改 没有可以删除  
	├──README.md # 可以删除  
	├──README1.md # 可以删除  
	├──TODO.md # 我写的待办 可以删除  
	├──_config.yml # jekyll 配置文件  
	├──archives.html # 归档页面  
	├──categories.html # 分类页面  
	├──favicon.ico # 图标  
	├──feed.xml # rss文件  
	├──index.html # 首页页面  
	├──package-lock.json # 包文件  
	├──rakefile.rb # rake生成文章文件 命令 rake post title="文章名称" 
	├──sakura.html # 樱花页面  
	├──search.json # 搜索配置文件  
	└──tags.html # 标签页面  
```



**建议删除的目录/文件（不删除也没事）/Suggest Delete：**  
```
_drafts / laji / pdf / readme_img / resource / yoone / CNAME / README.md / README1.md / TODO.md
```


**修改配置文件/Need Update：**  
```
_config.yml  
```

以下建议修改成你自己的博客信息/Change it your message   

	title: '' 首页标题
	description: '' 首页描述
	s-description: ''  樱花页面描述
	keyword: '' 关键字
	url: '' # your host

以下如果不需要用#注释 需要就扒#号去掉  

	nav:
	  home: '/sakura.html' 首页
	  categories: '/categories.html' 分类页
	  archives: '/archives.html' 归档页
	#  tags: '/tags.html' 标签页
	#  about: '/about' 关于我页面
	  links: '/links/' 友情链接页
	#  message: '/message/' 
	  yoone: '/yoone' 有药待办
	  rss: '/feed.xml' rss

作者信息  

	author: 'tea9'
	nickname: 'tea9'

评论配置信息（不要直接用我的，用我的肯定是不行的）  
有两个评论系统3选1 用那个就直接改成true  

然后配置改了  

disqus参考[disqus](https://disqus.com/)国内可能显示不了  

gitalk参考[jekyll-theme-H2O的gitalk相关配置](https://tea9.xyz/2018/06/24/gitali_config.html)  

valine参考[Valine -- 一款极简的评论系统](https://ioliu.cn/2017/add-valine-comments-to-your-blog/
)


	comments:
	  disqus: false
	  disqus_url: 'https://liaokeyu.disqus.com/embed.js'

	  gitalk: true
	  gitalk_clientID: ''
	  gitalk_Secret: ''
	  gitalk_repo: ''
	  gitalk_owner: ''
	  gitalk_admin: ''
	  distractionFreeMode: false

	  valine: false
	  valine_app_id: ''
	  valine_app_key: ''
	  valine_placeholder: ''
	  valine_avatar: ''


文章赞赏 不开就改成false  
然后把图片链接改成自己的（不改我也不介意）  

	reward:
	  enable: true
	  reward_comment: '' 显示的话
	  wechatpay: '' 微信支付链接
	  alipay: ''  支付宝支付链接

首页显示的社交帐号（修改成你自己的）  

	sns:
	  github: ''
	  email: ''
	  zhihu: ''
	  juejin: ''
	  weibo: ''
	  twitter: ''
	  instagram: ''
	  douban: ''
	  facebook: ''
	  jianshu: ''

百度统计修改成你自己的  

	baidu-analysis: d49f14171852506bc53c0072034d9db9

这是我的图床的链接 你要就修改成自己的  

	img_link: 'https://coding.net/u/tea9/p/image/git/raw/master/blog_img'

live-2d小姐姐开关true/false  
hitokoto [一言](https://hitokoto.cn/)true/false  

	live-2d: true
	hitokoto: true

这是自定义属性
背景图 背景颜色 字体颜色  

	sty:
	  back-img: 'https://coding.net/u/tea9/p/image/git/raw/master/blog_img/appreciate/runa.png' 首页背景图
	  back-color: 'rgb(58,60,65)' 背景颜色（建议使用背景图同色系的）
	  b2t-back: '#3A3226' 返回顶部背景颜色
	  b2t-color: '#fff' 返回顶部字体颜色
	  ban-color: '#D7C4BB' banner字体颜色
	  post-color: '#fff' 文章列表字体颜色
	  foot-color: '#B19693' 底部栏字体颜色
	  md-color: '#fff' 文章字体颜色

## 探索更多：

[README](https://github.com/tea9/tea9.github.io/blob/master/README.md)  




