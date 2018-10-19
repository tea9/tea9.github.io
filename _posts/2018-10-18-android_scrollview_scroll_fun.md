---
layout: post
title: "android_滑动监听事件T"
date: 2018-10-18
category: android
tags: android
---


关键代码：

	scrollView.setOnScrollChangeListener(new View.OnScrollChangeListener() {
	    @Override
	    public void onScrollChange(View view, int i, int i1, int i2, int i3) {
	        Rect scrollRect = new Rect();
	        scrollView.getHitRect(scrollRect);
	        //子控件在可视范围内（至少有一个像素在可视范围内）
	        if (whiteLayout.getLocalVisibleRect(scrollRect)) {
	            whiteLayout.setVisibility(View.VISIBLE);
	            rl.setVisibility(View.INVISIBLE);
	        } else {
	            ////子控件完全不在可视范围内
	            whiteLayout.setVisibility(View.INVISIBLE);
	            rl.setVisibility(View.VISIBLE);
	        }

	    }
	});


例子：（待完善）

