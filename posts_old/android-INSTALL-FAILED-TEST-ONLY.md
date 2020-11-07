---
title: android_INSTALL_FAILED_TEST_ONLY
tags:
  - android
abbrlink: 3979642138
date: 2019-11-12 14:41:49
---

## INSTALL_FAILED_TEST_ONLY的原因

Android Studio 3.0会在debug apk的manifest文件application标签里自动添加 android:testOnly="true"属性    

解决方法一  
在项目中的gradle.properties全局配置中设置：  

```
android.injected.testOnly=false
```

解决方法二，加 -t ：　　
```
adb install -t app-debug.apk
```