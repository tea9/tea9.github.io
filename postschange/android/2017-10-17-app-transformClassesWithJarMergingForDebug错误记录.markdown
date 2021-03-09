---
layout: post
title: app-transformClassesWithJarMergingForDebug错误记录
author: shaomiao
header-img: img/post-bg-android.jpg
tags:
  - android
abbrlink: 28077
date: 2017-10-21 00:00:00
---
Error:Execution failed for task ':app:transformClassesWithJarMergingForDebug'.
> com.android.build.api.transform.TransformException: java.util.zip.ZipException: duplicate entry: android/support/multidex/BuildConfig.class

http://blog.csdn.net/sahadev_/article/details/50314141


一般就是jar包冲突
