---
title: android_activity_启动模式
tags:
  - android
abbrlink: 2166465850
date: 2019-07-25 18:10:02
---

standard：标准模式，也是默认模式。每当我们启动一个Activity，系统就会相应的创建一个实例，不管这个实例是否已经存在。

singleTop：栈顶复用模式，如果要启动的Activity处于栈的顶部，那么此时系统不会创建新的实例，而是直接打开此页面，同时它的onNewIntent()方法会被执行，可以通过Intent进行传值，而且它的onCreate()，onStart()方法不会被调用，因为它并没有发生任何变化。  

singleTask：栈内复用模式，如果栈中存在这个Activity的实例就会复用这个Activity，不管它是否位于栈顶，复用时，会将它上面的Activity全部出栈，因为singleTask本身自带clearTop这种功能。并且会回调该实例的onNewIntent()方法。  

singleInstance：单实例模式，该模式具备singleTask模式的所有特性外，与它的区别就是，这种模式下的Activity会单独占用一个Task栈，具有全局唯一性。以singleInstance模式启动的Activity在整个系统中是单例的，如果在启动这样的Activiyt时，已经存在了一个实例，那么会把它所在的任务调度到前台，重用这个实例。  

taskAffinity：  

[组件导出导致钓鱼欺诈：防护](https://tea9.xyz/post/2470166639.html#%E7%BB%84%E4%BB%B6%E5%AF%BC%E5%87%BA%E5%AF%BC%E8%87%B4%E9%92%93%E9%B1%BC%E6%AC%BA%E8%AF%88%EF%BC%9A%E9%98%B2%E6%8A%A4)  

TODO  

## LINKS
[探索Activity之启动Intent Flag和taskAffinity](https://www.jianshu.com/p/c97688eb5056)  
[Android爬坑之路（十三）Activity启动模式](https://baijiahao.baidu.com/s?id=1616439180421446209&wfr=spider&for=pc)  