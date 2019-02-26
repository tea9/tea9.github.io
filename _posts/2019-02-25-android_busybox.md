---
layout: post
title: "android busybox"
date: 2019-02-25
category: android逆向
tags: android逆向
---

# 安装busybox
> 手机要root

## 查看对应arm
	adb shell getprop ro.product.cpu.abi
	> arm64-v8a

## 下载busybox

下载最新版本下，对应的arm
[busybox download](http://www.busybox.net/downloads/binaries)  
修改名称为busybox

## push

	adb push busybox /sdcard

## 修改/system 目录可读写

	adb shell
	su
	mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system

![]({{site.img_link}}/28/01.png)

	adb shell 
	su
	> su
	mount -o rw,remount -t yaffs2 /system
	> mount -o rw,remount -t yaffs2 /system
	mount -o rw,remount -t yaffs2 /system
	> mount -o rw,remount -t yaffs2 /system
	mount -o rw,remount -t yaffs2 /system
	> mount -0 rw,remount -t yaffs2 /system

	adb remount
	>remount succeeded

## copy
	cp /sdcard/busybox /system/xbin
	chmod 755 busybox

	cd /system/xbin
	busybox --install .

## LINKS

[在Android上安装BusyBox](https://blog.csdn.net/hp910315/article/details/79510223)  
[android安装busybox](https://www.cnblogs.com/shamoguzhou/p/6233407.html)  
