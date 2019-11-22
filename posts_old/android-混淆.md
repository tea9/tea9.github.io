---
title: android_混淆
tags:
  - android
abbrlink: 135908078
date: 2019-08-28 17:03:37
---

minifyEnabled设置true
```
app/build.gradle
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
    debug{
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }

}
```

规则  
app/proguard-rules.pro  

## LINKS
[关于Android混淆的一些经验](https://www.jianshu.com/p/cac416194a12)  
