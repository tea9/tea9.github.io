---
layout:     post
title:      "genymotion运行ARM架构程序"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
原生的Genymotion模拟器只支持x86架构，很多使用了.so文件的应用不支持x86架构，因此无法运行。如果想要运行，必须安装ARM转换包。
下载地址
http://pan.baidu.com/s/1sl1vhzJ
下载地址：[http://pan.baidu.com/s/1pJ5YZl5](http://pan.baidu.com/s/1pJ5YZl5) 密码：w3ol
把genymotion arm translation拖进genymotion模拟器里


5.x的使用方法
使用方法：
在 Genymotion 里面建立 5.0 or 5.1 的模拟器。

开机后把 ARM_Translation_Lollipop.zip
（请勿解压）拖到模拟器中，自动安装。

先不要重启模拟器，打开CMD命令行，输入adb shell /system/etc/houdini_patcher.sh

完成后重启模拟器。

方法及安装包来自二三接脚大神：[http://23pin.logdown.com/posts/294446-genymotion-use-arm-translation-on-5x-image](http://23pin.logdown.com/posts/294446-genymotion-use-arm-translation-on-5x-image)

[](http://smarxpan.github.io/2015/12/29/Genymotion%20%E5%9C%A8Android5.x%E4%B8%8A%E8%BF%90%E8%A1%8CARM%E6%9E%B6%E6%9E%84%E7%A8%8B%E5%BA%8F/#5-0以下的使用方法)5.0以下的使用方法
在 Genymotion 里面建立4.x的模拟器。

开机后把Genymotion-ARM-Translation
或者Genymotion-ARM-Translation_v1.1
（请勿解压）拖到模拟器中，自动安装。

完成后重启模拟器。
