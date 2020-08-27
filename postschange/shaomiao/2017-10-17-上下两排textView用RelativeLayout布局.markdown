---
layout:     post
title:      "上下两排textView用RelativeLayout布局"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
有效的减少布局结构加快界面绘制速度

![textview](http://upload-images.jianshu.io/upload_images/2590671-283ea5426512d860.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

	<?xml version="1.0" encoding="utf-8"?>
	<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
		xmlns:tools="http://schemas.android.com/tools"
		android:layout_width="match_parent"
		android:layout_height="match_parent">
		<TextView
			android:id="@+id/tv_day"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_alignParentLeft="true"
			android:layout_alignParentStart="true"
			android:layout_alignParentTop="true"
			android:layout_margin="15dp"
			android:text="TextView"
			android:textColor="#959595" />

		<TextView
			android:id="@+id/tv_kcal"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_alignBaseline="@+id/tv_day"
			android:layout_alignBottom="@+id/tv_day"
			android:layout_centerHorizontal="true"
			android:text="卡路里燃烧" />

		<TextView
			android:id="@+id/tv_step"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_alignLeft="@+id/tv_day"
			android:layout_alignStart="@+id/tv_day"
			android:layout_below="@+id/tv_day"
			android:text="246步"
			android:textColor="#333333"
			android:textSize="14sp" />


		<TextView
			android:id="@+id/tv_calorie"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_alignBaseline="@+id/tv_dw"
			android:layout_alignBottom="@+id/tv_dw"
			android:layout_alignLeft="@+id/tv_kcal"
			android:layout_alignStart="@+id/tv_kcal"
			android:text="20"
			android:textSize="14sp"
			tools:textColor="#333333" />

		<TextView
			android:id="@+id/tv_dw"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_below="@+id/tv_day"
			android:layout_toEndOf="@+id/tv_calorie"
			android:layout_toRightOf="@+id/tv_calorie"
			android:text="千卡"
			android:textColor="#333333" />
	</RelativeLayout>



