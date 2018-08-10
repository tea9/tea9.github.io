---
layout:     post
title:      "android-activity-切换动画"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
Intent intent = new Intent(this, SecondWindowTransActivity.class);startActivity(intent,        ActivityOptions.makeSceneTransitionAnimation(this).toBundle());
支出api21以后

http://blog.csdn.net/huachao1001/article/details/51659963

转载请注明出处：[【huachao1001的专栏：http://blog.csdn.net/huachao1001】](http://blog.csdn.net/huachao1001)
