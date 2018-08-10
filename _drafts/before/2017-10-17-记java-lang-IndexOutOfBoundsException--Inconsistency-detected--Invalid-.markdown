---
layout:     post
title:      "记java-lang-IndexOutOfBoundsException--Inconsistency-detected--Invalid-"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
http://blog.csdn.net/sbsujjbcy/article/details/46474633

	private boolean mIsRefreshing=false;
	mRecyclerView.setOnTouchListener(
		new View.OnTouchListener() {
		  @Override
		  public boolean onTouch(View v, MotionEvent event) {
			if (mIsRefreshing) {
			  return true;
			} else {
			  return false;
			}
		  }
		}
	);
	//当刷新时设置
	//mIsRefreshing=true;
	//刷新完毕后还原为false
	//mIsRefreshing=false
