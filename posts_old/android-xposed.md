---
title: android安装xposed
tags:
  - android安全
abbrlink: 1442253982
date: 2019-07-11 11:10:43
---

## 解锁&&刷机
```
开机时
bootloader音量-
recovery音量+
```

[小米手机解锁刷机](https://tea9.xyz/post/2987589929.html)  

下载nexus刷机包  
[rom](https://developers.google.com/android/images?hl=zh-CN)  
[romcn](https://developers.google.cn/android/images#sailfish)  

我选择的是4.4.4(KTU84P)  

[刷机](https://blog.csdn.net/u012417380/article/details/72843185)  


这时如果你想重新锁定设备的话，可以再次进入fastboot 模式，执行fastboot flashing lock命令,老设备执行：fastboot oem lock命令  
1.下载rom  
2.解锁   
开机时 电源键加音量-进入 bootloader  
对于新款设备（2015 年及之后发布的设备）：` $ fastboot flashing unlock`  
对于老款设备（2014 年及之前发布的设备）：` $ fastboot oem unlock`  
3.执行  
chmod +x flash-all.sh //flash-all.sh在rom里解压后可以看到  
./flash-all.sh  


## twrp
[Google Nexus5，twrp-3.0.2-0-hammerhead.img](https://dl.twrp.me/hammerhead/twrp-3.0.2-0-hammerhead.img.html)  

```
adb reboot bootloader
fastboot devices 判断设备是否连接
fastboot flash recovery twrp-3.0.2-0-hammerhead.img
fastboot reboot
adb reboot recovery
```

## 三方twrp
[twrpcn](https://pan.baidu.com/s/1noqUurLtzwwqKOWC1SHrlQ)  

安装第三方recovery：  
步骤：  
1.手机进入fastboot模式 开机时同时按住关机键+“音量+”键  
2.`fastboot flash recovery twrp.img`   
3.长按“音量+”和电源键直到手机进入TWRP（不要直接重启手机，这会导致官方recovery覆盖TWRP）  


官方TWRP下载地址：https://twrp.me/xiaomi/xiaomimi6.html  （找不到下载地方的人请寻找Download Links，下面的链接随便找一个就行了）  

修改版TWRP下载地址（支持8.0+，目前9.0无可以揭秘内部存储的方法）：https://www.androidfilehost.com/?fid=818070582850499029  
（需fan强），搬运地址：   
链接: https://pan.baidu.com/s/1AAw2kBJ-138JybaTrJkMRg 密码: bqfj  


## root

[root：](https://blog.csdn.net/u011303443/article/details/53733433)  

[root工具包](https://download.chainfire.eu/363/CF-Root/CF-Auto-Root/CF-Auto-Root-hammerhead-hammerhead-nexus5.zip)  

[SuperSu](https://download.chainfire.eu/1016/SuperSU/UPDATE-SuperSU-v2.79-20161211114519.zip)  

```
adb push UPDATE-SuperSU-v2.79-20161211114519.zip /sdcard
adb reboot recovery
选择包install image
reboot system
```

## 解锁system分区

[Syslock](https://www.coolapk.com/apk/com.lerist.syslock)  

## xposed

[xposed download](https://forum.xda-developers.com/showthread.php?t=3034811)  

[xposed](https://pan.baidu.com/s/1Gl0xz2MypraJxBCSDAuy1Q)  

[小米手机刷xposed：](http://www.miui.com/thread-16911319-1-1.html)  

1.安装三方twrp  
2.adb push xposed-v86-sdk23-arm.zip /sdcard  
3.关机-关机键和音量+键  
4.选择xposed-v86-sdk23-arm.zip install  

或者
[xposed](https://pan.baidu.com/s/1Gl0xz2MypraJxBCSDAuy1Q)  

1.安装三方twrp  
2.下载XposedInstaller_3.1.5.apk  
3.授权root权限  
4.菜单-设置-禁用资源钩子  
5.安装/更新 Install via recovery  
6.过一会手机请求是否进入第三方recovery，然后选择是，重启会自动进入第三方recovery，然后自动会刷入，完成后，选择重启系统就可以了  


## xposed模块
[dingpass](https://pan.baidu.com/s/1Ewka-m5x5RjLrBijAu98SQ)  

[钉钉](https://www.coolapk.com/apk/com.alibaba.android.rimet)  

[模拟位置-1.2.681.apk](https://www.lanzous.com/i4fuyve)  


## 资源

[android源码](https://pan.baidu.com/s/1ngsZs#list/path=%2FAndroid%E6%BA%90%E7%A0%81)  


## LINKS

[nexus5刷机、root及安装xposed](http://eternalsakura13.com/2018/01/19/nexus51/)  
[MIUI10 刷入Xposed](https://www.jianshu.com/p/deda23174d69)  
[小米刷机包[ROM] [2018.9.14更新]官方公测最新版本刷机包](http://www.miui.com/thread-16168539-1-1.html)  
[[教程] 手把手教你怎么root（TWRP卡刷方式，持续更新）](http://www.miui.com/thread-12263814-1-1.html)  
[MIUI9 Android6.0.1适用的xposed](https://www.52pojie.cn/thread-657193-1-1.html)  
[[教程] 无需卡刷！Xposed框架MIUI9官方包刷入教程](http://www.miui.com/thread-12259633-1-1.html)  
[[教程] MIUI10 Xposed框架安装教程,依旧无需卡刷!](http://www.miui.com/thread-16911319-1-1.html)  
[xposed框架-Hook修改imei imsi](https://blog.csdn.net/d3soft/article/details/53209352)  