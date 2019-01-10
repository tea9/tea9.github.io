---
layout: post
title: "android_No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android"
date: 2018-11-21
category: android
tags: android
---

主要是缺少这个文件 mips64el-linux-android  
同理一些相同NDK目录可能也是缺少某些文件  

	ndk目录
	/Users/shaomiao/Library/Android/sdk/ndk-bundle

1.打开项目local.properties文件

	Project/local.properties

	ndk.dir

2.打开ndk.dir文件夹

3.下载对应的ndk  

[ndk下载](https://developer.android.com/ndk/downloads/?hl=zh-cn)  

4.打开toolchains文件夹  

5.从下载的ndk目录中toolchains/mips64el-linux-android-4.9 复制到 项目ndk-bundle/toolchains目录里

6.make project
	
	build/Make Project

## LINKS

[完美解决 No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android](https://blog.csdn.net/qq_24118527/article/details/82867864)  