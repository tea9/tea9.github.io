---
layout: post
title: "android加固"
date: 2019-03-06
category: android安全
tags: android安全
---

## app加固威胁

- 代码修改(广告植入、替换广告id)
- 资源修改(界面替换广告，链接替换)
- 破解(应用收费，内购)
- 篡改数据(无限金币,钻石)
- 加入恶意代码(木马，隐私，交易)
- 动态注入，数据拦截，窃取，修改；协议修改

## app加固的目的

- 需要防止逆向分析-防止核心代码被反编译
- 控制被二次打包-校验完整性，签名，防止盗版
- 防止调试和注入-防止动态调试，注入获取关键数据
- 防止应用数据窃取-加密敏感数据
- 防止协议直接被盗刷-加密协议通信

## 常见加固厂商

- 加固保360

[360加固保](http://jiagu.360.cn/#/global/index)

- 娜迦nagapt

[娜迦加固](http://www.nagain.com/)  

- 梆梆bangcle

[梆梆加固](https://www.bangcle.com/)

- 爱加密ijm

[爱加密加固](http://www.ijiami.cn/appprotect_encrypt_way)

- 阿里
- 百度，盛大，腾讯，网秦，通付盾

## 常见加固方式

类加载技术：  
针对apk中的classes.dex文件进行处理，放入待定的文件中，通过native代码来进行对其运行时解密。  

使用厂商：娜迦，爱加密，梆梆等。  

方法替换技术：  
将classes.dex中的方法中代码进行提取，抽取方法，在运行时对其动态进行解密还原  

梆梆，娜迦  

## 常用加固厂商特征

- 娜迦 libchaosvmp.so,libddog.so libfdog.so
- 爱加密 libexec.so,libexecmain.so
- 梆梆 libsecexe.so libsecmain.so libDexHelper.so
- 360 libprotectClass.so libjiagu.so
- 通付盾 libegis.so
- 网秦 libnqshield.so
- 百度 libbaiduprotect.so

## 脱壳的手法

- 修改系统源码自动脱壳
- 通过hook方式对关键函数进行脱壳
- 开源工具入ZjDroid，DexHunter进行脱壳
- 利用IDA或者GDB动态调试进行脱壳

## 反调试

反调试代码，都是在壳子的so中执行的，那么，我们只要在进入壳子第一行代码时下了断点，在调试过程中，找到了反调试检测代码的位置，直接干掉，直接绕过反调试  

在libdvm.so中方法loadNativeCode处下断点，android系统加载加载native代码也就是so文件都要走的函数，所以下在这里的断点，能够有效的找到加载壳子的so位置，能够在一进入壳子的so，直接断住。  

最简单的技巧，就是单步调试，F8一路按下去，按的多了，就有了更好的位置下断点。  

记住一点就好，壳子的so中，总有一处是解密还原出app原本的dex的。  
