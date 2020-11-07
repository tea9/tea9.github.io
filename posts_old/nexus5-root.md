---
title: nexus5 root 刷机
tags:
  - android安全
abbrlink: 3980107174
date: 2019-11-07 18:40:51
---


http://eternalsakura13.com/2018/01/19/nexus51/

https://github.com/F8LEFT/FUPK3

目的：  
想要安装fupk这个脱壳机  
然后要进行解锁 root 刷机  

解锁：  
adb reboot bootloader  

fastboot -w update hammerhead.zip  

然后重启手机 就会一直停留在google界面   
可能需要刷机 然后在进行root-因为现在连系统都进入不了（摊手  

下载nexus刷机包  
rom  
https://developers.google.com/android/images?hl=zh-CN  



刷机：  
https://blog.csdn.net/u012417380/article/details/72843185  

这时如果你想重新锁定设备的话，可以再次进入fastboot 模式，执行fastboot flashing lock命令,老设备执行：fastboot oem lock命令  
1.下载rom   
2.解锁   
电源键加音量-进入 bootloader  
对于新款设备（2015 年及之后发布的设备）：` $ fastboot flashing unlock`  
对于老款设备（2014 年及之前发布的设备）：` $ fastboot oem unlock`  
3.执行  
chmod +x flash-all.sh  
./flash-all.sh  


root：
https://blog.csdn.net/u011303443/article/details/53733433
http://eternalsakura13.com/2018/01/19/nexus51/
root工具包
https://download.chainfire.eu/363/CF-Root/CF-Auto-Root/CF-Auto-Root-hammerhead-hammerhead-nexus5.zip

SuperSu
https://download.chainfire.eu/1016/SuperSU/UPDATE-SuperSU-v2.79-20161211114519.zip

bootloader音量-
recovery音量+

安装twrp
Google Nexus5，twrp-3.0.2-0-hammerhead.img
https://dl.twrp.me/hammerhead/twrp-3.0.2-0-hammerhead.img.html
adb reboot bootloader
fastboot devices 判断设备是否连接
fastboot flash recovery twrp-3.0.2-0-hammerhead.img
fastboot reboot
adb reboot recovery

root:
下载SuperSu
https://download.chainfire.eu/1016/SuperSU/UPDATE-SuperSU-v2.79-20161211114519.zip
adb push UPDATE-SuperSU-v2.79-20161211114519.zip /sdcard
adb reboot recovery
选择包install image
reboot system

android源码：
https://pan.baidu.com/s/1ngsZs#list/path=%2FAndroid%E6%BA%90%E7%A0%81

小米手机刷xposed：
http://www.miui.com/thread-16911319-1-1.html