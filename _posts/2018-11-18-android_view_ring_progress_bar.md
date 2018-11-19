---
layout: post
title: "android自定义view圆形进度条"
date: 2018-11-18
category: android
tags: android
---

![效果图]({{site.img_link}}/24/03.jpg)

## 代码

attrs.xml  

    <declare-styleable name="RingProgressBarView">
        <attr name="circle_radius" format="dimension"/>
        <attr name="stroke_width" format="dimension"/>
        <attr name="circle_color" format="color"/>
        <attr name="ring_background_color" format="color"/>
        <attr name="ring_cor" forLineProgressBarViewmat="color"/>
        <attr name="font_color" format="color"/>
        <attr name="font_size" format="dimension"/>
    </declare-styleable>


RingProgressBarView.java  

    public class RingProgressBarView extends View {

        // 画实心圆的画笔
        private Paint mCirclePaint;
        // 画圆环的画笔
        private Paint mRingPaint;
        // 画圆环的画笔背景色
        private Paint mRingPaintBg;
        // 画字体的画笔
        private Paint mTextPaint;
        // 圆形颜色
        private int mCircleColor;
        // 圆环颜色
        private int mRingColor;
        // 圆环背景颜色
        private int mRingBgColor;
        // 字体颜色
        private int mTextColor;
        // 字体大小
        private float mTextSize;
        // 半径
        private float mRadius;
        // 圆环半径
        private float mRingRadius;
        // 圆环宽度
        private float mStrokeWidth;
        // 圆心x坐标
        private int mXCenter;
        // 圆心y坐标
        private int mYCenter;
        // 字的长度
        private float mTxtWidth;
        // 字的高度
        private float mTxtHeight;
        // 总进度
        private int mTotalProgress = 100;
        // 当前进度
        private float mProgress;

        private String mProgressTxt;

        public RingProgressBarView(Context context, @Nullable AttributeSet attrs) {
            super(context, attrs);
            initAttrs(context, attrs);
            initVariable();
        }

        private void initAttrs(Context context,AttributeSet attrs) {
            TypedArray typeArray = context.getTheme().obtainStyledAttributes(attrs,
                    R.styleable.RingProgressBarView, 0, 0);
            mRadius = typeArray.getDimension(R.styleable.RingProgressBarView_circle_radius, dp2px(30));
            mStrokeWidth = typeArray.getDimension(R.styleable.RingProgressBarView_stroke_width,dp2px(6));
            mCircleColor = typeArray.getColor(R.styleable.RingProgressBarView_circle_color, Color.parseColor("#ffffff"));
            mRingColor = typeArray.getColor(R.styleable.RingProgressBarView_ring_cor, Color.parseColor("#FF6059"));
            mRingBgColor = typeArray.getColor(R.styleable.RingProgressBarView_ring_background_color,Color.parseColor("#E3E2E2"));
            mTextColor = typeArray.getColor(R.styleable.RingProgressBarView_font_color,Color.parseColor("#2E3D45"));
            mTextSize = typeArray.getDimension(R.styleable.RingProgressBarView_font_size,mRadius / 3);
            mRingRadius = mRadius + mStrokeWidth / 2;
        }

        private void initVariable() {
            //内圆
            mCirclePaint = getPaint(Paint.Style.FILL,mCircleColor);


            //外圆弧背景
            mRingPaintBg = getPaint(Paint.Style.STROKE,mRingBgColor,mStrokeWidth);

            //外圆弧
            mRingPaint = getPaint(Paint.Style.STROKE,mRingColor,mStrokeWidth);
            mRingPaint.setStrokeCap(Paint.Cap.ROUND);//设置线冒样式，有圆 有方

            //中间字
            mTextPaint = getPaint(Paint.Style.FILL,mTextColor);
            mTextPaint.setTextSize(mTextSize);

            Paint.FontMetrics fm = mTextPaint.getFontMetrics();
            mTxtHeight = (int) Math.ceil(fm.descent - fm.ascent);
        }

        private Paint getPaint(Paint.Style style,int color){
            Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG); //抗锯齿标志
            paint.setStyle(style);
            paint.setColor(color);
            paint.setAntiAlias(true);
            return paint;
        }
        private Paint getPaint(Paint.Style style,int color,float width){
            Paint paint = getPaint(style,color);
            paint.setStrokeWidth(width);
            return paint;
        }

        @Override
        protected void onDraw(Canvas canvas) {
    //        super.onDraw(canvas);
            mXCenter = getWidth() / 2;
            mYCenter = getHeight() / 2;

            //内圆
            canvas.drawCircle(mXCenter, mYCenter, mRadius, mCirclePaint);

            //外圆弧背景
            RectF oval1 = new RectF();
            oval1.left = (mXCenter - mRingRadius);
            oval1.top = (mYCenter - mRingRadius);
            oval1.right = mRingRadius * 2 + (mXCenter - mRingRadius);
            oval1.bottom = mRingRadius * 2 + (mYCenter - mRingRadius);
            canvas.drawArc(oval1, 0, 360, false, mRingPaintBg); //圆弧所在的椭圆对象、圆弧的起始角度、圆弧的角度、是否显示半径连线

            //外圆弧
            if (mProgress > 0 ) {
                RectF oval = new RectF();
                oval.left = (mXCenter - mRingRadius);
                oval.top = (mYCenter - mRingRadius);
                oval.right = mRingRadius * 2 + (mXCenter - mRingRadius);
                oval.bottom = mRingRadius * 2 + (mYCenter - mRingRadius);
                canvas.drawArc(oval, -90, -(((float)mProgress / mTotalProgress) * 360), false, mRingPaint); //

                //字体
                String txt = mProgressTxt + "%";
                mTxtWidth = mTextPaint.measureText(txt, 0, txt.length());
                canvas.drawText(txt, mXCenter - mTxtWidth / 2, mYCenter + mTxtHeight / 4, mTextPaint);
            }
        }

        //设置进度
        public void setProgress(float progress) {
            final ValueAnimator anim = ValueAnimator.ofFloat(0,progress);
            anim.setDuration(3000);
            anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animator) {
                    mProgress  = (float)animator.getAnimatedValue();
                    DecimalFormat df2 = new DecimalFormat("###.00");
                    mProgressTxt= df2.format(mProgress);
                    invalidate();
                }
            });
            anim.start();
        }
        protected int dp2px(int dpVal) {
            return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dpVal,getResources().getDisplayMetrics());
        }
    }


activity_ring_progress_bar.xml  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
                                                 xmlns:app="http://schemas.android.com/apk/res-auto"
                                                 android:layout_width="match_parent"
                                                 android:layout_height="match_parent">

        <com.demo.android_view.mview.RingProgressBarView
                android:id="@+id/rpbv"
                android:layout_width="120dp"
                android:layout_height="120dp"/>
    </android.support.constraint.ConstraintLayout>

RingProgressBarActivity.java  

    public class RingProgressBarActivity extends AppCompatActivity {

        private RingProgressBarView rpbv;

        @Override
        protected void onCreate(@Nullable Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_ring_progress_bar);
            rpbv = findViewById(R.id.rpbv);
            rpbv.setProgress(100f);
        }
    }


## 源代码
[源代码](https://github.com/tea9/android_view)  

## LINKS
[Android 自定义漂亮的圆形进度条](https://blog.csdn.net/qq_32519693/article/details/76726525)  
[Android自定义View之画圆环(进阶篇:圆形进度条)](https://blog.csdn.net/zhangqunshuai/article/details/80760277)  
[Android 自定义View实例之进度圆环](https://blog.csdn.net/mengks1987/article/details/77771465)  
[Android花样loading进度条（二）-简单环形进度条](https://blog.csdn.net/ahuyangdong/article/details/79942824)  
[Android自定义圆形进度条](https://www.jianshu.com/p/fd5616685d3d)  
[android自定义控件之圆形进度条（带动画）](https://blog.csdn.net/anonymousprogrammer/article/details/65634886)  

