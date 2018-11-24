---
layout: post
title: "android里的TextView"
date: 2018-11-21
category: android
tags: android
---


	<string name="str_event_statistics">事件统计 &lt;small&gt;（近 %1$s 场）&lt;small&gt;</string>

    String textSource = context.getResources().getString(R.string.str_event_statistics)+"<small>（近10场）</small>";


	String textSource = context.getResources().getString(R.string.str_event_statistics,"11");
    title_tv.setText(Html.fromHtml(textSource));

[给TextView加上多彩效果：改变部分字体的大小和颜色](https://blog.csdn.net/singwhatiwanna/article/details/18363899)  
[android中string.xml中%1$s、%1$d等的用法](https://www.cnblogs.com/Eric-zhao/p/5230007.html)  
[修改TextView中部分文本的字体及颜色](https://www.jianshu.com/p/f6cef78e8652)  
