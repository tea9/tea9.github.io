---
layout: post
title: "android脱壳T"
date: 2018-10-23
category: android逆向
tags: android逆向
---

##壳史

第一代壳 Dex加密  

Dex字符串加密资源加密对抗反编译反调试自定义DexClassLoader  

第二代壳 Dex抽取与So加固  

对抗第一代壳常见的脱壳法Dex Method代码抽取到外部（通常企业版）Dex动态加载So加密  

第三代壳 Dex动态解密与So混淆  

Dex Method代码动态解密So代码膨胀混淆对抗之前出现的所有脱壳法  

第四代壳 arm vmp（未来）  

vmp壳的识别  

1.用加固厂商特征：  

娜迦： libchaosvmp.so , libddog.solibfdog.so爱加密：libexec.so, libexecmain.so梆梆： libsecexe.so, libsecmain.so , libDexHelper.so360：libprotectClass.so, libjiagu.so通付盾：libegis.so网秦：libnqshield.so百度：libbaiduprotect.so  


## LINKS

[常见android app加固厂商脱壳方法研究，androidapp](http://www.bkjia.com/androidjc/1298565.html)  
