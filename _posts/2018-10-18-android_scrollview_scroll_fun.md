---
layout: post
title: "android_滑动监听事件T折叠菜单"
date: 2018-10-18
category: android
tags: android
---

	AppBarLayout topLayout = getActivity().findViewById(R.id.topLayout);
	        topLayout.addOnOffsetChangedListener(new AppBarLayout.OnOffsetChangedListener() {
	            @Override
	            public void onOffsetChanged(AppBarLayout appBarLayout, int i) {
	                if (i == 0) {
	                    //展开状态
	                    Log.e("shaomiaomrootCL", "展开状态");
	                    mPullToRefresh.setCanRefresh(true);
	                    mPullToRefresh.setCanLoadMore(false);
	                } else if (Math.abs(i) >= appBarLayout.getTotalScrollRange()) {
	//折叠状态
	                    Log.e("shaomiaomrootCL", "折叠状态");
	                    mPullToRefresh.setCanRefresh(false);
	                    mPullToRefresh.setCanLoadMore(true);
	                } else {
	//中间状态
	                    Log.e("shaomiaomrootCL", "中间状态");
	                    mPullToRefresh.setCanRefresh(false);
	                    mPullToRefresh.setCanLoadMore(false);
	                }
	            }
	        });

## LINK
[如何监听CollapsingToolbarLayout的展开与折叠](https://www.2cto.com/kf/201702/598635.html)  


关键代码：

	scrollView.setOnScrollChangeListener(new View.OnScrollChangeListener() {
	    @Override
	    public void onScrollChange(View view, int x, int y, int oldX, int oldY) {
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

