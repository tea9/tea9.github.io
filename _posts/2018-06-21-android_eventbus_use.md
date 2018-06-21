---
layout: post
title: "android EventBus 使用"
date: 2018-06-21
category: android
tags: android eventbus
---


2017 10 27  
EventBus 是个什么鬼？  
首先有两个概念发布者/订阅者  

发布者就是 发送事件  
订阅者 就是接收事件  

	gradle
	
	compile 'org.greenrobot:eventbus:3.0.0'


1.定义事件

<pre><code>
// 定义事件 这个就是你要传送的数据实体类
public static class MessageEvent { /* Additional fields if needed */ }
</code></pre>
	

2.准备订阅者

<pre><code>
@Subscribe(threadMode = ThreadMode.MAIN)  
public void onMessageEvent(MessageEvent event) {/* Do something */};
	
// 订阅者 接受数据的方法 threadMode  是运行在什么线程模式
http://greenrobot.org/eventbus/documentation/delivery-threads-threadmode/
</code></pre>

注册和取消注册订阅者

	 @Override
	 public void onStart() {
		 super.onStart();
		 EventBus.getDefault().register(this);
	 }

	 @Override
	 public void onStop() {
		 super.onStop();
		 EventBus.getDefault().unregister(this);
	 }

3.发送事件

	`EventBus.getDefault().post(new MessageEvent());`