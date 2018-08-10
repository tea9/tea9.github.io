---
layout:     post
title:      "android-NoSuchMethodError-错误记录"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
java.lang.NoSuchMethodError:
No virtual method addOnPageChangeListener(Landroid/support/v4/view/ViewPager$OnPageChangeListener;)V in class Landroid/support/v4/view/ViewPager;
or its super classes (declaration of 'android.support.v4.view.ViewPager' appears in /data/data/com.weijie.ckapp/files/instant-run/dex/slice-support-v4-r7_6b487e8b8eac5541972e73dc0c160b63dd97c123-classes.dex)

at com.shizhefei.view.indicator.IndicatorViewPager.iniOnPageChangeListener(IndicatorViewPager.java:71)
at com.shizhefei.view.indicator.IndicatorViewPager.(IndicatorViewPager.java:53)
at com.shizhefei.view.indicator.IndicatorViewPager.(IndicatorViewPager.java:43)

https://github.com/LuckyJayce/ViewPagerIndicator/issues/20

把addOnPageChangeListener 改成
setOnPageChangeListener

原因分析
现在项目中support.v4版本太低
不能随意修改版本  修改后会影响原始代码

