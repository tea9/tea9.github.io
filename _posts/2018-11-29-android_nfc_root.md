---
layout: post
title: "android nfc模拟卡"
date: 2018-11-29
category: android
tags: android
---

[搞定加密卡！小米门禁卡模拟那些事](http://bbs.xiaomi.cn/t-30553502-1-o1)  

## 手机信息
```
手机：小米5s
版本：MIUI10 8.11.1 开发版
```
## 0x00 解锁&&刷机

**解锁**  

首先登录小米官网获取解锁工具  
[解锁工具下载](https://unlock.update.miui.com)  
[小米手机解锁 Bootloader 教程以及常见问题](http://www.miui.com/thread-3367802-1-1.html)  
<!-- 
官网给的解决方案：  
```
请按照以下流程进行操作：
1.进入“设置 -> 开发者选项 -> 设备解锁状态”中绑定账号和设备；
2.手动进入Bootloader模式（关机后，同时按住开机键和音量下键）；
3.通过USB连接手机，点击 “解锁”按钮；
``` -->
 

解锁的时候要检查解锁账号，要3天验证在这个手机登录  

1.小米手机设置  
设置-小米账号-登录小米账号  
关机  
进入Bootloader模式(同时按住开机键和音量下键)  
会出现一个安卓小机器人下面FASTBOOT文字  
usb连接电脑  

2.电脑端  
打开下载的手机解锁工具  
点击解锁  
然后弹出确认解锁  
等待解锁  

![]({{site.img_link}}/25/01.png)

<!-- ```

设置 -> 更多设置 -> 开发者选项 -> 设备解锁状态 -> 绑定账号和设备  
关机 -> 同时按住开机键和音量下键 -> 打开下载的工具 -> 手机连接 -> 解锁  
``` -->

<!-- ```
开发者选项:
我的设备 - 全部参数 - MIUI版本 多次按 进入开发者模式  
``` -->

**刷机**  

[通用线刷教程](http://www.miui.com/shuaji-393.html)  

参考了上面的文章  

步骤：
下载通用解锁工具  
下载线刷包下载开发版的(开发版自带root)   
手机关机状态下，同时按住 音量下+电源键 进入Fastboot模式将手机USB连接电脑。  
usb连接电脑  
解压线刷包  
打开通用解锁工具  
选择解压目录  
点击加载设备  
刷机  
等待成功  

![]({{site.img_link}}/25/02.png)

## 0x01 nfc软件
在酷安找到了一些app  
[nfc list](https://www.coolapk.com/search?q=nfc)  
然后测试了一下NFC卡模拟  

然后给NFC卡模拟 root权限 和 nfc权限  

安全中心-应用管理-权限-ROOT权限管理 给 NFC卡模拟  

**然后测试软件**  
卡读取成功了  
然后测试门禁不好使  

-----后文再续

[【教程】让你的手机模拟门禁卡 拿着手机进小区 加密也模拟](http://www.miui.com/thread-5869303-1-1.html)  
[成功复制加密门禁卡！！！](http://tieba.baidu.com/p/5759500931)  
[【原创】浅谈NFC手机模拟门禁卡、饭卡（非ROOT）-精华帖](https://club.huawei.com/thread-12231900-1-1.html)  
[NFC卡模拟](https://www.coolapk.com/apk/com.yuanwofei.cardemulator)  
[如何利用Nexus 5伪造一张门禁卡](https://www.freebuf.com/geek/80368.html)  
[搞定加密卡！小米门禁卡模拟那些事](http://www.jinciwei.cn/f268134.html)  
[Root神器--超级授权SuperSU_v2.82-SR5专业破解最新版！](https://club.huawei.com/thread-14272732-1-1.html)  
[【HRT_梦里无念】荣耀6X TWRP3.1 EMUI5.0专用 支持Data解密](https://club.huawei.com/forum.php?mod=viewthread&tid=12832132)  
[小米线刷](http://www.miui.com/shuaji-393.html)  
[小米手机MIUI9开发版开启ROOT权限方法](https://jingyan.baidu.com/article/a3a3f8112501e38da3eb8a65.html)  
[小米开发版获取完整root教程](http://www.miui.com/thread-8282972-1-1.html)  
[【解锁教程&ROOT教程】支持全系华为](https://blog.csdn.net/xCnhYKoHj3eK/article/details/79016306)  
[怎么强制解华为锁bl锁](https://jingyan.baidu.com/article/363872ec7246e36e4ba16f24.html)  
[求这个型号的华为手机强制解除BL锁有效方法](https://www.52pojie.cn/thread-780859-1-1.html)  
[Browse files by Device](http://downloadandroidrom.com/)  
[Driver Binaries for Nexus and Pixel Devices](https://developers.google.com/android/drivers)  
[xda-developers](https://www.xda-developers.com/)  