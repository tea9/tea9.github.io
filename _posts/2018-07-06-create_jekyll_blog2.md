---
layout: post
title: "2.Markdown使用指南"
date: 2018-07-06
category: jekyll
tags: blog
---

## 一、Markdown是什么？

Markdown是一种轻量级标记语言（标记语言是用一系列规则描述简单格式的文本语言。）    

## 二、Markdown的语法

1.标题  
\# 一级标题  
\#\# 二级标题  

还可以下面这种写法  

一级标题  
\====  

二级标题  
\----  

![]({{site.img_link}}/13/01.png)

2.图片  
\!\[图片文字\]\(图片链接\)
\!\[Foo\]\(http://i.weather.com.cn/images/cn/life/2017/04/11/11141533DF572FBBA092E37E6E843C656C318272.jpg)  

![]({{site.img_link}}/13/02.png)

3.换行  
强制在末尾加两个空格 或者 加<br/>  

![]({{site.img_link}}/13/03.png)

4.斜体／粗体／删除线  
斜体：  
\*hello\*  
\_你好\_  

粗体：  
\**hello\**  
\_\_你好\_\_  

删除线：  
\~\~这是加删除线的文字\~\~

![]({{site.img_link}}/13/04.png)


5.引用  
\> 引用  

![]({{site.img_link}}/13/05.png)


\> 引用  
\>\> 引用的引用  

![]({{site.img_link}}/13/06.png)


或者这样写：  

	<blockquote><p>引用</p></blockquote>

![]({{site.img_link}}/13/07.png)


6.链接
\[链接文字\](链接)  
\[百度](http://www.baidu.com)  

或者这样写：  
\[链接文字][链接引用标签]  
\[链接引用标签]: 链接地址 "链接标题"  

\[百度][tag]  
\[tag]: http://www.baidu.com "百度"  

![]({{site.img_link}}/13/08.png)


7.分割线（不同的编辑器可能显示的形式不一样）  
\***  
\__  
\___  

![]({{site.img_link}}/13/09.png)


8.列表  
\+ aaa  
\+ bbb  
\+ ccc  

![]({{site.img_link}}/13/10.png)


### 更多语法
http://www.markdown.cn/
### md高级用法
https://www.jianshu.com/p/0b257de21eb5

## 三、Markdown编辑器


  ● Cmd Markdown https://www.zybuluo.com/mdeditor   编辑阅读器，支持实时同步预览，区分写作和阅读模式，支持在线存储，分享文稿网址。  
  ● MacDown http://macdown.uranusjr.com macOS 上的 Markdown 开源编辑器，作者称其深受 Mou 启发。  
  ● Mou http://25.io/mou/ 一个 macOS 上的Markdown编辑器。  
  ● MarkdownPad http://www.markdownpad.com Windows上的全功能 Markdown 编辑器。  
  ● MarkPad http://code52.org/DownmarkerWPF/  Windows上的Markdown编辑器，Markdown works better with MarkPad。  
  ● Typora https://www.typora.io/  
在线：  
  ● Dillinger.io https://dillinger.io 一个在线Markdown编辑器，提供实时预览以及到 GitHub 和 Dropbox 的拓展连接。  
  ● MaHua http://mahua.jser.me/ 一个在线编辑markdown文档的编辑器 向Mac下优秀的markdown编辑器mou致敬。  
  ● 马克飞象 https://maxiang.io/    马克飞象是一款专为印象笔记（Evernote）打造的Markdown编辑器。  

如果你是微信公众号er   
推荐Markdown Here这个chrome插件（需要翻墙）. 

![]({{site.img_link}}/13/11.png)


步骤：  
把用Markdown写作的文章复制过来，粘在微信后台的文本框中  
快捷键按住Control+Alt+M，即可转换成最终呈现出来的文字格式  
需要修改图片地址等。  

## 四、jekyll中使用Markdown

在blog文件夹中有一个_posts的文件夹 是存放所有文章的  

![]({{site.img_link}}/13/12.png)


进入_posts文件夹  
创建 日期-标题.md 的文件  
如：  
2018-05-24-test.md  

![]({{site.img_link}}/13/13.png)


打开新建的文件 添加这些  

	---
	layout: post
	title: test
	---

![]({{site.img_link}}/13/14.png)


现在开始用markdown写一篇文章  

![]({{site.img_link}}/13/15.png)


运行jekyll服务  
jekyll serve  

![]({{site.img_link}}/13/16.png)


在浏览器中访问  

	http://127.0.0.1:4000/

![]({{site.img_link}}/13/17.png)


访问文章就可以出现下面的  

![]({{site.img_link}}/13/18.png)


之后你就可以把文章提交到github上了  

打开终端输入  

	cd 用户名.github.io
	git add --all
	git commit -m "add post"
	git push -u origin master

## 五、Markdown图片处理

我选择的是微博的微相册作为图床  
微相册地址   
http://photo.weibo.com/5500195491/upload/index 

![]({{site.img_link}}/13/19.png)


就是选择照片->上传照片->返回相册->点开大图->复制图片地址  

**拖拽上传图床工具**
mac：  
ipic 在appstore搜索  
window  
mpic 在 http://mpic.lzhaofu.cn/ 下载  
---

## 拓展阅读
如何通过markdown写论文？ https://sspai.com/post/43471  
