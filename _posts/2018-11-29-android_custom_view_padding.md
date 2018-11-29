---
layout: post
title: "android自定义View处理padding和wrap_content和自定义属性"
date: 2018-11-29
category: android
tags: android
---

## android View 处理padding

	@Override
		protected void onDraw(Canvas canvas) {
			super.onDraw(canvas);
			int paddingLeft=getPaddingLeft();
			int paddingRight=getPaddingRight();
			int paddingTop=getPaddingTop();
			int paddingBottom=getPaddingBottom();
			int width = getWidth()-paddingLeft-paddingRight;
			int height = getHeight()-paddingTop-paddingBottom;
			canvas.drawRect(0+paddingLeft,0+paddingTop,width+paddingRight,height+paddingBottom,mPaint);
		}

## 对wrap_content属性进行处理

在onMeasure方法中指定一个默认的宽和高，在设置wrap_content属性时设置此默认的宽和高就可以了：  
setMeasuredDimension() 方法px  
	
	@Override
	protected void onMeasure(int widthMeasureSpec,int heightMeasureSpec) {
		super.onMeasure(widthMeasureSpec,heightMeasureSpec);
		int widthSpecMode = MeasureSpec.getMode(widthMeasureSpec);
		int heightSpecMode = MeasureSpec.getMode(heightMeasureSpec);
		int widthSpecSize = MeasureSpec.getSize(widthMeasureSpec);
		int heightSpecSize = MeasureSpec.getSize(heightMeasureSpec);
		if(widthSpecMode==MeasureSpec.AT_MOST&&heightSpecMode==MeasureSpec.AT_MOST){
			setMeasuredDimension(600,600);
		}else if(widthSpecMode==MeasureSpec.AT_MOST){
			setMeasuredDimension(600,heightSpecSize);
		}else if(heightSpecMode==MeasureSpec.AT_MOST){
			setMeasuredDimension(widthSpecSize,600);
		}
	}

## 自定义属性
	
在values目录下创建attrs.xml  

	<?xml version="1.0" encoding="utf-8"?>
	<resources>
		<declare-styleable name="RectView">
			<attr name="rect_color" format="color"/>
		</declare-styleable>
	</resources>
	
解析自定义属性的值  

	public RectView(Context context, AttributeSet attrs) {
		super(context, attrs);
		TypedArray mTypedArray=context.obtainStyledAttributes(attrs,R.styleable.RecyView);
		// 提取RectView属性集合的rect_color属性。如果没设置，默认值为Color.RED
		mColor=mTypedArray.getColor(R.styleable.RectView_rect_color,Color.RED);
		// 获取资源后要及时回收
		mTypedArray.recycle();
		initDraw();
	}

	<com.xx.RectView
		xmlns:app="http://schemas.android.com/apk/res-auto"
		android:id="@+id/rv_rect"
		android:layout_width="wrap_content"
		android:layout_height="200dp"
		android:layout_below="@id/iv_text"
		android:layout_marginTop="50dp"
		android:layout_centerHorizontal="true"
		android:padding="10dp"
		app:rect_color="@android:color/holo_blue_light"/>

完整代码：  

	public class RectView extends View {
		private Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
		private int mColor=Color.RED;
		public RectView(Context context) {
			super(context);
			initDraw();
		}

		public RectView(Context context,AttributeSet attrs) {
			super(context, attrs);
			TypedArray mTypedArray=context.obtainStyledAttributes(attrs,R.styleable.RectView);
			//提取RectView属性集合的rect_color属性。如果没设置，默认值为Color.RED
			mColor=mTypedArray.getColor(R.styleable.RectView_rect_color,Color.RED);
			//获取资源后要及时回收
			mTypedArray.recycle();
			initDraw();
		}

		public RectView(Context context, AttributeSet attrs, int defStyleAttr) {
			super(context, attrs, defStyleAttr);
			initDraw();
		}

		private void initDraw() {
			mPaint.setColor(mColor);
			mPaint.setStrokeWidth((float)1.5);
		}

		@Override
		protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
			super.onMeasure(widthMeasureSpec,heightMeasureSpec);
			int widthSpecMode = MeasureSpec.getMode(widthMeasureSpec);
			int heightSpecMode = MeasureSpec.getMode(heightMeasureSpec);
			int widthSpecSize=MeasureSpec.getSize(widthMeasureSpec);
			int heightSpecSize=MeasureSpec.getSize(heightMeasureSpec);
			if(widthSpecMode==MeasureSpec.AT_MOST&&heightSpecMode==MeasureSpec.AT_MOST){
				setMeasuredDimension(400,400);
			}else if(widthSpecMode==MeasureSpec.AT_MOST){
				setMeasuredDimension(400,heightSpecSize);
			}else if(heightSpecMode==MeasureSpec.AT_MOST){
				setMeasuredDimension(widthSpecSize,400);
			}
		}

		@Override
		protected void onDraw(Canvas canvas) {
			super.onDraw(canvas);
			int paddingLeft = getPaddingLeft();
			int paddingRight = getPaddingRight();
			int paddingTop = getPaddingTop();
			int paddingBottom = getPaddingBottom();
			int width = getWidth()-paddingLeft-paddingRight;
			int height = getHeight()-paddingTop-paddingBottom;
			canvas.drawRect(0+paddingLeft,0+paddingTop,width+paddingRight,height+paddingBottom,mPaint);
		}
	}



























