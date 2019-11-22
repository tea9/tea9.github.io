---
layout: post
title: android busybox
category: 
  - android逆向
tags: 
  - android逆向
abbrlink: 1663513283
date: 2019-02-25 00:00:00
---

# 安装busybox
> 手机要root

## 查看对应arm

```
adb shell getprop ro.product.cpu.abi
> arm64-v8a
```

## 下载busybox

下载最新版本下，对应的arm
[busybox download](http://www.busybox.net/downloads/binaries)  
修改名称为busybox

[busybox-armv6l](https://busybox.net/downloads/binaries/1.26.2-defconfig-multiarch/busybox-armv6l)

## push

	adb push busybox /sdcard

## 修改/system 目录可读写

```
adb shell
su
mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system
```

![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/28/01.png)

```
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
```

## copy

```
adb shell
cp /sdcard/busybox /system/xbin
cd /system/xbin
chmod 755 busybox

cd /system/xbin
busybox --install .
```

## Tips

### 如果没有cp命令
```
1|root@android:/ # cp /sdcard/busybox /system/xbin
sh: cp: not found

mv /sdcard/busybox /system/bin  

cat /sdcard/busybox > /system/bin/busybox 
```

## ERROR

如果执行`mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /syste`出现```mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system
mount: Permission denied```这个问题就新开一个命令行窗口执行```adb remount```在执行```mount -o remount,rw -t yaffs2 /dev/block/mtdblock3 /system```就可以了

## LINKS

[在Android上安装BusyBox](https://blog.csdn.net/hp910315/article/details/79510223)  
[android安装busybox](https://www.cnblogs.com/shamoguzhou/p/6233407.html)  
