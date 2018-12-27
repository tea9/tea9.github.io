---
layout: post
title: "android多线程笔记"
date: 2018-12-25
category: android
tags: android
---

《Android进阶之光》第四章多线程编程 学习笔记

## 为什么使用多线程

- 使用多线程可以减少程序响应时间。
- 与进程相比 线程创建和切换开销更小，同时多线程在数据共享方面效率非常高。
- 多CPU或者多核计算机本身就具备执行多线程的能力。如果使用单个线程，将无法重复利用

---

	JAVA Future  
	notifyall()  
	Thread.yield()
	Thread join();

---
## ERROR

	TimerTask is scheduled already

[TimerTask is scheduled already 解决方法](https://blog.csdn.net/lishouyi710/article/details/53671014)  


## LINKS

[Android线程池得要这么用](https://www.jianshu.com/p/6c1b18723197)  
[Android 线程池原理及使用](https://www.jianshu.com/p/7b2da1d94b42)  
[（转载）Android开发——Android中常见的4种线程池（保证你能看懂并理解）](https://www.cnblogs.com/1925yiyi/p/9040605.html)  
[Android--多线程之Handler](https://www.cnblogs.com/shirley-1019/p/3557800.html)  
[JAVA Future类详解](https://blog.csdn.net/u014209205/article/details/80598209)  
[Java多线程学习之wait、notify/notifyAll 详解](http://www.cnblogs.com/moongeek/p/7631447.html)  
[Thread中yield方法](https://www.cnblogs.com/java-spring/p/8309931.html)  
[【Bugly干货】Android性能优化典范之多线程篇](http://www.cnblogs.com/bugly/p/5519510.html)  
[Android耗时任务处理方案--AsyncTask](https://blog.csdn.net/madahe/article/details/53043463)  
[Android 多线程----AsyncTask异步任务详解](https://www.cnblogs.com/smyhvae/p/3866570.html)  
[详解AsyncTask的cancel的有效用法，强制停止AsyncTask异步任务](https://www.aliyun.com/jiaocheng/39574.html)  
[Android定时执行和停止某任务](https://www.cnblogs.com/lanceblog/p/6600846.html)  
[关于同步、异步与阻塞、非阻塞的理解](https://www.cnblogs.com/Anker/p/5965654.html)  
[Java中终止正在运行线程](https://www.cnblogs.com/bosongokay/p/6832409.html?utm_source=itdadao&utm_medium=referral)  
[Java 浅析 Thread.join()](http://www.cnblogs.com/huangzejun/p/7908898.html)  

[Android 定时器Timer的使用](https://www.jianshu.com/p/dd5de8dbbe81)  
[Android中定时器Timer和TimerTask的启动，停止，暂停，继续等操作实例](https://blog.csdn.net/dj0379/article/details/50877746)  

