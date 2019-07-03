---
layout:     post
title:      "Activity--startActivityForResult()-返回数据给上一个活动"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
在firstactivity 活动中  使用startActivityForResult 第一个参数是 intent  第二个参数是请求码启动Activity
![startActivityForResult](http://upload-images.jianshu.io/upload_images/2590671-446b2760febbb0c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

FirstActivity.class

	Intent intent = new Intent(MainActivity.this, SecondActivity.class);
	startActivityForResult(intent, 1);


在SecondAcitvity活动中用setResult方法传递数据给上一个Acitvity 然后调用finish方法销毁SecondAcitvity

SecondAcitvity.class

	Button button1 = (Button) findViewById(R.id.button1);
	button1.setOnClickListener(new View.OnClickListener() {
		@Override
		public void onClick(View view) {
			Intent intent = new Intent();
			// 给上一个Activity传递参数
			intent.putExtra("data_return", "Hello MainActivity");
			// 返回数据 RESULT_CANCELED
			setResult(RESULT_OK, intent);
			finish();
		}
	});

在FirstAcitvity中重写onActivityResult方法
FirstAcitvity.class

	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		switch (requestCode) {
			case 1:
				if (resultCode == RESULT_OK) {
					String returnedData = data.getStringExtra("data_return");
					Log.d(TAG, "onActivityResult: "+returnedData);
				}
				break;
			default:
		}
	}



如果按back键返回在SecondActivity中重写onBackPressed方法

	public void onBackPressed() {
		Intent intent = new Intent();
		intent.putExtra("data_return", "Hello MainActivity");
		setResult(RESULT_OK, intent);
		finish();
	}
