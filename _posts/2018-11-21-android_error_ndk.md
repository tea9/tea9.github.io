---
layout: post
title: "android_No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android"
date: 2018-11-21
category: android
tags: android
---

主要是缺少这个问题 mips64el-linux-android  

	ndk目录
	/Users/shaomiao/Library/Android/sdk/ndk-bundle

1.打开项目local.properties文件
2.打开ndk.dir文件夹

[ndk下载](https://developer.android.com/ndk/downloads/?hl=zh-cn)  

3.下载对应的ndk  

4.打开toolchains文件夹  

5.从toolchains/mips64el-linux-android-4.9 复制到 项目ndk-bundle/toolchains目录里

6.make project

## LINKS

[完美解决 No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android](https://blog.csdn.net/qq_24118527/article/details/82867864)  