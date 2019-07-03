---
layout:     post
title:      "安卓-RecyclerView-"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
####目录结构：

![20160812181911.png](http://upload-images.jianshu.io/upload_images/2590671-0acae4207474c7f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.首先在住Activity的 activity_main.xml中添加一个RecyclerView
<pre><code>

  <android.support.v7.widget.RecyclerView   
    android:layout_width="match_parent"        
    android:layout_height="120dp"    
    android:layout_centerVertical="true"    
    android:background="#FF0000"    
    android:scrollbars="none"    
    android:id="@+id/recycler_id">   
  </android.support.v7.widget.RecyclerView>


</code></pre>


![20160812182356.png](http://upload-images.jianshu.io/upload_images/2590671-6d2fc84e44cfba24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
