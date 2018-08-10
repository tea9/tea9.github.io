---
layout:     post
title:      "android自定义View贝赛尔曲线"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
参考：http://blog.csdn.net/z82367825/article/details/51599245
贝赛尔绘制心形
http://blog.csdn.net/u012296503/article/details/51510206

自定义view锯齿样式

![效果图](http://upload-images.jianshu.io/upload_images/2590671-c04140f09db844d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

继承view重写onDraw方法用穿过来的canvas画线

	public class BezierTestView extends View {
		private int screenWidth;
		private Paint mPaint;
		private Path mPath;
		//两个距离的差越小角的高越小
		//最大距离 距离顶端 第一个顶点y
		private int first_y=30;
		//第一个顶点x
		private int first_x=0;
		//角的大小宽
		private int horn_size=20;
		//最小距离距离顶端
		private int minimum_distance=20;

		public int getMinimum_distance() {
			return minimum_distance;
		}

		public void setMinimum_distance(int minimum_distance) {
			this.minimum_distance = minimum_distance;
		}

		public int getScreenWidth() {
			return screenWidth;
		}

		public void setScreenWidth(int screenWidth) {
			this.screenWidth = screenWidth;
		}

		public int getFirst_x() {
			return first_x;
		}

		public int getFirst_y() {
			return first_y;
		}

		public void setFirst_x(int first_x) {
			this.first_x = first_x;
		}

		public void setFirst_y(int first_y) {
			this.first_y = first_y;
		}

		public int getHorn_size() {
			return horn_size;
		}

		public void setHorn_size(int horn_size) {
			this.horn_size = horn_size;
		}

		public BezierTestView(Context context) {
			super(context);
			init();
		}

		public BezierTestView(Context context, AttributeSet attrs, int defStyleAttr) {
			super(context, attrs, defStyleAttr);
			init();
		}

		public BezierTestView(Context context, AttributeSet attrs) {
			super(context, attrs);
			init();
		}

		private void init() {
			//画笔
			mPaint = new Paint();
			mPaint.setAntiAlias(true);
			mPaint.setStyle(Paint.Style.STROKE);
			mPaint.setColor(0xFF412129);
			mPath = new Path();
			WindowManager wm = (WindowManager) getContext()
					.getSystemService(Context.WINDOW_SERVICE);
			this.screenWidth=wm.getDefaultDisplay().getWidth();
		}

		@Override
		protected void onDraw(Canvas canvas) {
			super.onDraw(canvas);
			mPath.reset();
	//        mPath.moveTo(0,90);
	//        //mPath.lineTo(0,0);
	//        mPath.lineTo(100,50);
	//        mPath.lineTo(100*2,90);
	//        mPath.lineTo(100*3,50);
	//        mPath.lineTo(100*4,90);
	//        mPath.lineTo(100*5,50);

			mPath.moveTo(first_x,first_y);
			//mPath.lineTo(50,10);
			for (int i=1;i<=screenWidth/horn_size;i++){
				//y前一个大角后一个小
				mPath.lineTo((i*horn_size)+first_x,i%2==0?first_y:minimum_distance);
			}
			canvas.drawPath(mPath, mPaint);
		}
	}


*******
使用

	<net.sourceforge.simcpux.customviewsawtoothstyle.BezierTestView
		android:layout_width="match_parent"
		android:layout_height="match_parent"
		android:background="@android:color/white"
		android:id="@+id/testview"
	/>

*****
要修改角的大小 根据id获取到自定义View然后传参数

	BezierTestView testview= (BezierTestView) findViewById(R.id.testview);
	//testview.setScreenWidth(500);
	//testview.setFirst_x(20);


示例代码
https://github.com/shaomiao/CustomViewSawtoothStyle
