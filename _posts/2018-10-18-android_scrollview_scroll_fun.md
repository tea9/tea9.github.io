---
layout: post
title: "android滑动监听事件折叠菜单"
date: 2018-10-18
category: android
tags: android
---

**效果如下**  

![]({{site.img_link}}/23/1.gif)

## 思路

1.定义两个title布局  
2.监听ScrollView控件在下面布局不可见的时候显示第二个title布局  

## 关键代码：

java：  

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


代码：  

SVLisActivity.kt  

    class SVLisActivity: AppCompatActivity() {
    
        @SuppressLint("NewApi")
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_svlis)
            initLis()
        }
    
        @RequiresApi(Build.VERSION_CODES.M)
        fun initLis() {
            scroll_view.setOnScrollChangeListener { view, i, i1, i2, i3 ->
                var scrollRect = Rect()
                scroll_view.getHitRect(scrollRect)
                if (whiteLayout.getLocalVisibleRect(scrollRect)) {
                    whiteLayout.visibility = View.VISIBLE
                    title1.visibility = View.VISIBLE
                    title2.visibility = View.GONE
                } else {
                    whiteLayout.visibility = View.INVISIBLE
                    title1.visibility = View.GONE
                    title2.visibility = View.VISIBLE
                }
            }
        }
    
    }

activity_svlis.xml  

    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <RelativeLayout
            android:id="@+id/title1"
            android:layout_width="match_parent"
            android:layout_height="45dp">
    
            <ImageView
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:layout_centerVertical="true"
                android:layout_margin="10dp"
                android:src="@mipmap/ic_launcher" />
    
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerInParent="true"
                android:singleLine="true"
                android:text="标题" />
        </RelativeLayout>
    
        <RelativeLayout
            android:id="@+id/title2"
            android:layout_width="match_parent"
            android:layout_height="45dp"
            android:visibility="gone">
    
            <ImageView
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:layout_centerVertical="true"
                android:layout_margin="10dp"
                android:src="@mipmap/ic_launcher" />
    
            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerInParent="true">
    
                <ImageView
                    android:layout_width="20dp"
                    android:layout_height="20dp"
                    android:layout_centerVertical="true"
                    android:layout_margin="10dp"
                    android:src="@mipmap/ic_launcher" />
    
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="2"
                    android:textColor="@android:color/black"
                    android:textSize="25dp"
                    android:textStyle="bold" />
    
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:layout_gravity="center_vertical"
                    android:layout_marginLeft="5dp"
                    android:gravity="center_vertical"
                    android:text=":"
                    android:textColor="@android:color/black"
                    android:textSize="20sp"
                    android:textStyle="bold" />
    
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:text="2"
                    android:textColor="@android:color/black"
                    android:textSize="25sp"
                    android:textStyle="bold" />
    
                <ImageView
                    android:layout_width="20dp"
                    android:layout_height="20dp"
                    android:layout_centerVertical="true"
                    android:layout_margin="10dp"
                    android:src="@mipmap/ic_launcher" />
            </LinearLayout>
        </RelativeLayout>
    
        <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="@android:color/black" />
    
        <ScrollView
            android:id="@+id/scroll_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
    
            <LinearLayout
                android:orientation="vertical"
                android:layout_width="match_parent"
                android:layout_height="match_parent">
    
                <RelativeLayout
                    android:id="@+id/whiteLayout"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:background="@android:color/white"
                    android:paddingLeft="35dp"
                    android:paddingRight="35dp">
    
                    <RelativeLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:padding="10dp">
    
                        <RelativeLayout
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content">
    
                            <LinearLayout
                                android:id="@+id/scoreLayout"
                                android:layout_width="wrap_content"
                                android:layout_height="wrap_content"
                                android:layout_centerHorizontal="true"
                                android:orientation="horizontal">
    
                                <TextView
                                    android:id="@+id/score_a_tv"
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="2"
                                    android:textColor="@android:color/black"
                                    android:textSize="35dp"
                                    android:textStyle="bold" />
    
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="match_parent"
                                    android:layout_gravity="center_vertical"
                                    android:layout_marginLeft="5dp"
                                    android:gravity="center_vertical"
                                    android:text=":"
                                    android:textColor="@android:color/black"
                                    android:textSize="25sp"
                                    android:textStyle="bold" />
    
                                <TextView
                                    android:id="@+id/score_b_tv"
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:layout_marginLeft="5dp"
                                    android:text="2"
                                    android:textColor="@android:color/black"
                                    android:textSize="35sp"
                                    android:textStyle="bold" />
                            </LinearLayout>
    
                            <LinearLayout
                                android:layout_width="wrap_content"
                                android:layout_height="wrap_content"
                                android:layout_below="@id/scoreLayout"
                                android:layout_centerHorizontal="true"
                                android:orientation="vertical">
    
                                <TextView
                                    android:id="@+id/date_tv"
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:layout_below="@id/scoreLayout"
                                    android:layout_gravity="center_horizontal"
                                    android:layout_marginTop="10dp"
                                    android:text="08/11 22:00"
                                    android:textColor="@android:color/black"
                                    android:textSize="10dp" />
    
                                <TextView
                                    android:id="@+id/desc_tv"
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:layout_below="@id/scoreLayout"
                                    android:layout_gravity="center_horizontal"
                                    android:text="足总杯 半决赛"
                                    android:textColor="@android:color/black"
                                    android:textSize="10dp" />
    
    
                                <TextView
                                    android:id="@+id/deadlines_tv"
                                    android:layout_width="80dp"
                                    android:layout_height="23dp"
                                    android:layout_marginLeft="9dp"
                                    android:layout_marginTop="10dp"
                                    android:gravity="center"
                                    android:text="30：00封盘"
                                    android:textColor="@color/colorAccent"
                                    android:textSize="10sp"
                                    android:textStyle="bold"
                                    android:visibility="visible" />
    
                            </LinearLayout>
                        </RelativeLayout>
    
                        <LinearLayout
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:orientation="vertical">
    
                            <ImageView
                                android:id="@+id/team_a_iv"
                                android:layout_width="60dp"
                                android:layout_height="60dp"
                                android:layout_gravity="center_horizontal"
                                android:src="@mipmap/ic_launcher" />
    
                            <TextView
                                android:id="@+id/team_a_tv"
                                android:layout_width="wrap_content"
                                android:layout_height="wrap_content"
                                android:layout_gravity="center_horizontal"
                                android:layout_marginTop="5dp"
                                android:text="A队"
                                android:textColor="@android:color/black" />
                        </LinearLayout>
    
                        <LinearLayout
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_alignParentRight="true"
                            android:orientation="vertical">
    
                            <ImageView
                                android:id="@+id/team_b_iv"
                                android:layout_width="60dp"
                                android:layout_height="60dp"
                                android:layout_gravity="center_horizontal"
                                android:src="@mipmap/ic_launcher" />
    
                            <TextView
                                android:id="@+id/team_b_tv"
                                android:layout_width="wrap_content"
                                android:layout_height="wrap_content"
                                android:layout_gravity="center_horizontal"
                                android:layout_marginTop="5dp"
                                android:text="B队"
                                android:textColor="@android:color/black" />
                        </LinearLayout>
                    </RelativeLayout>
                </RelativeLayout>
    
                <View
                    android:layout_width="match_parent"
                    android:layout_height="1000dp" />
            </LinearLayout>
        </ScrollView>
    </LinearLayout>



[源码地址-homepage libray](https://github.com/tea9/dear_kotlin_code) 
---
这个是用AppBarLayout实现的折叠菜单监听  

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

## OTHER

录屏软件：  

[小熊录屏](https://www.coolapk.com/apk/com.duapps.recorder)  

## LINK
[如何监听CollapsingToolbarLayout的展开与折叠](https://www.2cto.com/kf/201702/598635.html)  