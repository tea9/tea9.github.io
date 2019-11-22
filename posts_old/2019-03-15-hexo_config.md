layout: post
title: hexo_config
category:
  - hexo
tags:
  - hexo
abbrlink: 1144770046
date: 2019-03-15 00:00:00
---
## 前言：

为什么要用hexo，首先是因为gitalk 出现了一个Error: Validation Failed.问题，具体原因是gitalk 的id 有50个字符的限制，因为是用的pathname，然后pathname长度超了，然后去网上搜索问题，发现有的解决方法是要改成site.title,但是我有部分文章的title也是超长的，然后这个问题一直搁置了，后来我看到了一个hexo的持久化链接的文章，可以随机生成一个字符串作为持久化链接，是通过一个hexo-abbrlink的一个插件，我搜索了一下发现jekyll并没有这个插件，然后还发现了一些hexo的一些其他插件很好用，如hexo-admin，恩，就打算迁移到hexo。  

## hexo基础命令

```
hexo new [layout] <title> 新建文章
hexo generate 生成静态文件
hexo publish [layout] <filename> 发表草稿
hexo server 启动服务器
hexo deploy 部署网站
hexo clean 清除缓存文件 (db.json) 和已生成的静态文件 (public)。
hexo --draft 显示草稿

```

## hexo 初始化

在使用hexo之前你需要安装nodejs  

[nodejs官网](https://nodejs.org/en/)  
[hexo官网](https://hexo.io/zh-cn/)  

安装nodejs之后安装hexo  

	npm install hexo-cli -g
	hexo init blog
	cd blog
	npm install
	hexo server

## hexo 主题

[hexo theme](https://hexo.io/themes/)  

或者在github 上搜索 hexo theme找到你喜欢的主题  

这个是一个我比较喜欢的主题  
[aircloud github](https://github.com/aircloud/hexo-theme-aircloud)  
[aircloud](http://niexiaotao.cn/)  

	切换到博客目录
	mkdir themes/aircloud
	git clone https://github.com/aircloud/hexo-theme-aircloud.git themes/aircloud/

	aircloud 搜索功能
	npm i hexo-generator-search --save
	添加_config.yml
	search:
	  path: search.json
	  field: post

	修改_config.yml theme
	theme: aircloud

其他的一些配置参照[aircloud readme](https://github.com/aircloud/hexo-theme-aircloud/blob/master/readme.md)  

然后修改了一些地方，包括配置，头像，评论，文章之类的  

## hexo命令

	hexo new <title>
	hexo generate //生成静态文件
	hexo clean //清理

	hexo server
	hexo deploy //部署到网站
	hexo new page tags 
    
	hexo new draft "new draft" //新建草稿
    
    render_drafts: true //如果你希望强行预览草稿，更改配置文件：
    hexo server --drafts //或者，如下方式启动server

    hexo publish [layout] <filename>
	hexo publish <title> //草稿移动到 source/_posts (没有试过
  
   

## jekyll to hexo 

因为我之前的博客是jekyll 来的 迁移到hexo 有一些问题或者差异然后记录下  

1.我遇到的第一个差异就是tags的格式不一样  

jekyll  
```
tags: android逆向 xposed
```

hexo  
```
tags: 
  - android逆向 
  - xposed
```
这样要是没什么大问题几乎我就不改了，但是会出现tags的直接识别成一个，就需要修改。  

---

2.
jekyll
下面是用作图片链接引用的  
```
_config.yml
img_link: http://xx.com

文章中
{{site.img_link}}
```
hexo
hexo在文章中无法引用config定义的标签  
[Is it possible to refer a config variable in Markdown content？](https://github.com/hexojs/hexo/issues/2756)然后群里大佬给我发了一个issue描述的跟我遇到的问题一样，但是解决方法有点不满意，最后的回复有个插件，但是用法不清晰，然后图片链接的问题，就是全局替换了，😭😭😭😭😭😭

---

3.还有个差异是在hexo的md文章中不能使用`<!---->`使用了就会有问题，要不是内容丢失，要不是就是排版会乱掉。

## hexo plugin

[hexo-abbrlink](https://github.com/Rozbo/hexo-abbrlink)  
可以用作链接持久化  
效果就是生成一串短链接，而且这个链接是固定的，可以直接访问  
```
npm install hexo-abbrlink --save

_config.yml
permalink: posts/:abbrlink/
# abbrlink config
abbrlink:
  alg: crc32  #support crc16(default) and crc32
  rep: hex    #support dec(default) and hex
```

---
[hexo-admin](https://github.com/jaredly/hexo-admin)  
就是一个后台管理hexo博客的插件，使用效果就是访问http://localhost:4000/admin就会有一个管理页面  
```
npm install --save hexo-admin
hexo s
访问
http://localhost:4000/admin
```

## other 

这个就是推荐几个博客可以使用的一些api或者插件，算是比较通用的。

---

[gitalk](https://github.com/gitalk/gitalk)  
一个评论插件，作用就是会在github生成issue，作为评论  

---

[一言](https://hitokoto.cn/)  
中二一句话？？？？？

---

[google adsense](http://www.google.cn/adsense)  

在博客上插入谷歌广告，应该大概可以赚钱（反正我还没有盈利  

---

[live2d 小姐姐](https://www.live2d.com/ja/)  
这个配置就麻烦点了，但是小姐姐挺可爱的  

## LINKS
[hexo文档](https://hexo.io/zh-cn/docs/)  