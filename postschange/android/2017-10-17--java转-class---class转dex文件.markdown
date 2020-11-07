---
layout:     post
title:      "-java转-class---class转dex文件"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
javac Hello.java
dx --dex -- output=Hello.dex Hello.class
javap -c -classpath . Hello

使用dexdump.exe 位于Android SDK 的 platform-tools

dexdump.exe -d Hello.dex


如果使用JDK1.7编译Hello.java 生成的Hello.class默认的版本会比较低 使用dx生成dex文件会提示class文件无效
javac -source 1.6 -target 1.6 Hello.java
