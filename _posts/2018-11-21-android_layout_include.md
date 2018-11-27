---
layout: post
title: "android里layout.xml的include"
date: 2018-11-21
category: android
tags: android
---

	include 两个一样的layout

    通过给 include标签设置id 分别绑定子布局的控件

    <LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <View
            android:background="@color/colorE7E7E7"
            android:layout_width="match_parent"
            android:layout_height="0.2dp"/>

        <LinearLayout
            android:layout_marginTop="15dp"
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">


        <include
            android:id="@+id/item1"
            android:layout_weight="1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            layout="@layout/item_game_record_head_block"/>


        <include
            android:id="@+id/item2"
            android:layout_weight="1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            layout="@layout/item_game_record_head_block"/>
        </LinearLayout>

    </LinearLayout>


    View view = LayoutInflater.from(context).inflate(R.layout.item_game_record_head, getRootView((Activity) context), false);
    View item1 = view.findViewById(R.id.item1);
    View item2 = view.findViewById(R.id.item2);
    TextView item1_tv1,item1_tv2,item1_tv3,item1_tv4,item1_tv5,item1_tv6;
    TextView item2_tv1,item2_tv2,item2_tv3,item2_tv4,item2_tv5,item2_tv6;
    ImageView item1_iv1,item2_iv1;
    item1_tv1 = item1.findViewById(R.id.tv1);
    item1_tv2 = item1.findViewById(R.id.tv2);
    item1_tv3 = item1.findViewById(R.id.tv3);
    item1_tv4 = item1.findViewById(R.id.tv4);
    item1_tv5 = item1.findViewById(R.id.tv5);
    item1_tv6 = item1.findViewById(R.id.tv6);
    item1_iv1 = item1.findViewById(R.id.iv1);

    item1_tv1.setText("联赛排名第5名");
    item1_tv2.setText("10-9-7");
    item1_tv3.setText("胜-平-负");
    item1_tv4.setText("37-29");
    item1_tv5.setText("进球-失球");
    item1_tv6.setText("9连败中");
    //        Glide.with(context).load("").into(item1_iv1);

    item2_tv1 = item2.findViewById(R.id.tv1);
    item2_tv2 = item2.findViewById(R.id.tv2);
    item2_tv3 = item2.findViewById(R.id.tv3);
    item2_tv4 = item2.findViewById(R.id.tv4);
    item2_tv5 = item2.findViewById(R.id.tv5);
    item2_tv6 = item2.findViewById(R.id.tv6);
    item2_iv1 = item2.findViewById(R.id.iv1);

    item2_tv1.setText("联盟排名第1名");
    item2_tv2.setText("18-5-3");
    item2_tv3.setText("胜-平-负");
    item2_tv4.setText("64-23");
    item2_tv5.setText("进球-失球");
    item2_tv6.setText("1连胜中");
