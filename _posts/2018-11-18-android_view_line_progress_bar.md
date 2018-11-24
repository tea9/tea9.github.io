---
layout: post
title: "android自定义View线进度条"
date: 2018-11-18
category: android
tags: android
---

![效果图]({{site.img_link}}/24/01.jpg)

## 思路

画一条线没什么难度用`canvas.drawLine()`就可以，主要的是根据效果图有两种笔的效果，一种圆头一种方头，所以我的思路是先用圆头笔画个2px宽的路径，在用方头笔画剩余路径。  

## Paint

	paint.setStyle();
	Paint.Style.FILL 填充内部
	Paint.Style.FILL_AND_STROKE 填充内部和描边
	Paint.Style.STROKE 仅描边


	paint.setStrokeCap(); 设置线帽样式
	Paint.Cap.BUTT; 无线帽
    Paint.Cap.ROUND; 圆形线帽
    Paint.Cap.SQUARE; 方形线帽

[自定义控件三部曲之绘图篇(七)——Paint之函数大汇总](https://blog.csdn.net/harvic880925/article/details/51010839)  

## 关键代码

	num_a_paint.setStrokeCap(Paint.Cap.ROUND); // 先用圆头笔画
	canvas.drawLine(startX, height / 2, startX + 2, height / 2, num_a_paint);
	num_a_paint.setStrokeCap(Paint.Cap.BUTT); // 改成方头笔
	canvas.drawLine(startX, height / 2, length_a, height / 2, num_a_paint);
	num_b_paint.setStrokeCap(Paint.Cap.ROUND);
	canvas.drawLine(endX, height / 2, endX - 2, height / 2, num_b_paint);
	num_b_paint.setStrokeCap(Paint.Cap.BUTT);
	canvas.drawLine(endX, height / 2, length_b - 2, height / 2, num_b_paint);

## 全部代码

attrs.xml  

    <declare-styleable name="LineProgressBarView">
        <attr name="bar_width" format="dimension"/>
        <attr name="bar_height" format="dimension"/>
        <attr name="margin" format="integer"/>
        <attr name="num_a" format="float"/>
        <attr name="num_b" format="float"/>
        <attr name="bar_type" format="integer"/>
        <attr name="background_color" format="color"/>
        <attr name="color_a" format="color"/>
        <attr name="color_b" format="color"/>
    </declare-styleable>

	public class LineProgressBarView extends View {

	    private Context context;
	    private int background_color,color_a,color_b,margin; // margin 左右边距
	    private float bar_height,bar_width;
	    private float num_a,num_b;
	    private Paint back_paint,num_a_paint,num_b_paint;
	    private int width,height;
	    private int type;
	    // 线的X起始左标
	    private float startX;
	    private float endX;
	    public LineProgressBarView(Context context, @Nullable AttributeSet attrs) {
	        super(context, attrs);
	        this.context = context;
	        getAtt(attrs);
	        initPaint();
	        setLayerType(View.LAYER_TYPE_SOFTWARE, null); // 硬件加速
	    }
	    private void getAtt(AttributeSet attrs) {
	        TypedArray typedArray = context.obtainStyledAttributes(attrs,R.styleable.LineProgressBarView);
	        background_color = typedArray.getColor(R.styleable.LineProgressBarView_background_color,Color.parseColor("#E3E2E2"));
	        color_a = typedArray.getColor(R.styleable.LineProgressBarView_color_a,Color.parseColor("#FF6059"));
	        color_b = typedArray.getColor(R.styleable.LineProgressBarView_color_b,Color.parseColor("#41CFFF"));
	        bar_height = typedArray.getDimension(R.styleable.LineProgressBarView_bar_height,30f);
	        bar_width = typedArray.getDimension(R.styleable.LineProgressBarView_bar_width,0);
	        margin = typedArray.getInteger(R.styleable.LineProgressBarView_margin,dp2px(30));
	        num_a = typedArray.getFloat(R.styleable.LineProgressBarView_num_a,40);
	        num_b = typedArray.getFloat(R.styleable.LineProgressBarView_num_b,40);
	        type = typedArray.getInteger(R.styleable.LineProgressBarView_bar_type,0);
	        typedArray.recycle();
	    }
	    protected int dp2px(int dpVal) {
	        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dpVal,getResources().getDisplayMetrics());
	    }
	    protected float dp2px(float dpVal) {
	        return (float) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dpVal,getResources().getDisplayMetrics());
	    }
	    private void initPaint() {
	        back_paint = getPaint(Paint.Style.FILL,background_color,bar_height);
	        back_paint.setStrokeCap(Paint.Cap.ROUND);

	        num_a_paint = getPaint(Paint.Style.FILL,color_a,bar_height);
	        num_a_paint.setColor(color_a);
	        num_b_paint = getPaint(Paint.Style.FILL,color_b,bar_height);
	        num_b_paint.setColor(color_b);
	    }

	    private Paint getPaint(Paint.Style style,int color,float width){
	        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG); //抗锯齿标志
	        paint.setStyle(style);
	        paint.setColor(color);
	        paint.setStrokeWidth(width);
	        paint.setAntiAlias(true);
	        return paint;
	    }
	    @Override
	    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
	        super.onSizeChanged(w, h, oldw, oldh);
	        width = w;
	        height = h;
	        startX = margin;
	        endX = width-margin;
	    }

	    @Override
	    protected void onDraw(Canvas canvas) {
	        super.onDraw(canvas);
	        canvas.drawLine(startX,height/2,endX,height/2,back_paint); // 背景线
	        // -><-
	        // 从两边往中间画
	        float length_a = (endX*num_a/100)+startX-(num_a/100*(startX));
	        float length_b = (startX*num_b/100)+endX-(num_b/100*(endX));
	        num_a_paint.setStrokeCap(Paint.Cap.ROUND);
	        canvas.drawLine(startX, height / 2, startX + 2, height / 2, num_a_paint);
	        num_a_paint.setStrokeCap(Paint.Cap.BUTT);
	        canvas.drawLine(startX, height / 2, length_a, height / 2, num_a_paint);
	        num_b_paint.setStrokeCap(Paint.Cap.ROUND);
	        canvas.drawLine(endX, height / 2, endX - 2, height / 2, num_b_paint);
	        num_b_paint.setStrokeCap(Paint.Cap.BUTT);
	        canvas.drawLine(endX, height / 2, length_b - 2, height / 2, num_b_paint);
	    }

	    public void setNumAProgress(final int xx) {
	        final ValueAnimator anim = ValueAnimator.ofFloat(0,xx);
	        anim.setDuration(2000);
	        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	            @Override
	            public void onAnimationUpdate(ValueAnimator animator) {
	                num_a  = (float) animator.getAnimatedValue();
	                invalidate();
	            }
	        });
	        anim.start();
	    }
	    public void setNumBProgress(final int xx) {
	        final ValueAnimator anim = ValueAnimator.ofFloat(0,xx);
	        anim.setDuration(2000);
	        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	            @Override
	            public void onAnimationUpdate(ValueAnimator animator) {
	                num_b  = (float) animator.getAnimatedValue();
	                invalidate();
	            }
	        });
	        anim.start();
	    }

	}

[LineProgressBarView.java](https://github.com/tea9/android_view/blob/master/app/src/main/java/com/demo/android_view/mview/LineProgressBarView.java)  

---

![效果图]({{site.img_link}}/24/02.jpg)

## 思路 
这个是跟上面图方向不一样的线，然后采用的先画方头的2px宽的，然后用圆头补全。  


## 关键代码

	num_a_paint.setStrokeCap(Paint.Cap.BUTT);
	canvas.drawLine(centre, height / 2, length_a, height / 2, num_a_paint);
	num_a_paint.setStrokeCap(Paint.Cap.ROUND);
	canvas.drawLine(length_a+2, height / 2, length_a, height / 2, num_a_paint);
	num_b_paint.setStrokeCap(Paint.Cap.BUTT);
	canvas.drawLine(centre, height / 2, length_b, height / 2, num_b_paint);
	num_b_paint.setStrokeCap(Paint.Cap.ROUND);
	canvas.drawLine(length_b, height / 2, length_b+2, height / 2, num_b_paint);

## 全部代码

跟上面的代码差不多 加了个type值作为判断。  

	public class LineProgressBarView extends View {

	    private Context context;
	    private int background_color,color_a,color_b,margin; // margin 左右边距
	    private float bar_height,bar_width;
	    private float num_a,num_b;
	    private Paint back_paint,num_a_paint,num_b_paint;
	    private int width,height;
	    private int type;
	    // 线的X起始左标
	    private float startX;
	    private float endX;
	    public LineProgressBarView(Context context, @Nullable AttributeSet attrs) {
	        super(context, attrs);
	        this.context = context;
	        getAtt(attrs);
	        initPaint();
	        setLayerType(View.LAYER_TYPE_SOFTWARE, null); // 硬件加速
	    }
	    private void getAtt(AttributeSet attrs) {
	        TypedArray typedArray = context.obtainStyledAttributes(attrs,R.styleable.LineProgressBarView);
	        background_color = typedArray.getColor(R.styleable.LineProgressBarView_background_color,Color.parseColor("#E3E2E2"));
	        color_a = typedArray.getColor(R.styleable.LineProgressBarView_color_a,Color.parseColor("#FF6059"));
	        color_b = typedArray.getColor(R.styleable.LineProgressBarView_color_b,Color.parseColor("#41CFFF"));
	        bar_height = typedArray.getDimension(R.styleable.LineProgressBarView_bar_height,30f);
	        bar_width = typedArray.getDimension(R.styleable.LineProgressBarView_bar_width,0);
	        margin = typedArray.getInteger(R.styleable.LineProgressBarView_margin,dp2px(30));
	        num_a = typedArray.getFloat(R.styleable.LineProgressBarView_num_a,40);
	        num_b = typedArray.getFloat(R.styleable.LineProgressBarView_num_b,40);
	        type = typedArray.getInteger(R.styleable.LineProgressBarView_bar_type,0);
	        typedArray.recycle();
	    }
	    protected int dp2px(int dpVal) {
	        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dpVal,getResources().getDisplayMetrics());
	    }
	    protected float dp2px(float dpVal) {
	        return (float) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,dpVal,getResources().getDisplayMetrics());
	    }
	    private void initPaint() {
	        back_paint = getPaint(Paint.Style.FILL,background_color,bar_height);
	        back_paint.setStrokeCap(Paint.Cap.ROUND);

	        num_a_paint = getPaint(Paint.Style.FILL,color_a,bar_height);
	        num_a_paint.setColor(color_a);
	        num_b_paint = getPaint(Paint.Style.FILL,color_b,bar_height);
	        num_b_paint.setColor(color_b);
	    }

	    private Paint getPaint(Paint.Style style,int color,float width){
	        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG); //抗锯齿标志
	        paint.setStyle(style);
	        paint.setColor(color);
	        paint.setStrokeWidth(width);
	        paint.setAntiAlias(true);
	        return paint;
	    }
	    @Override
	    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
	        super.onSizeChanged(w, h, oldw, oldh);
	        width = w;
	        height = h;
	        startX = margin;
	        endX = width-margin;
	    }

	    @Override
	    protected void onDraw(Canvas canvas) {
	        super.onDraw(canvas);
	        canvas.drawLine(startX,height/2,endX,height/2,back_paint); // 背景线
	        if (type==0) {

	            // -><-
	            // 从两边往中间画
	            float length_a = (endX*num_a/100)+startX-(num_a/100*(startX));
	            float length_b = (startX*num_b/100)+endX-(num_b/100*(endX));
	            num_a_paint.setStrokeCap(Paint.Cap.ROUND);
	            canvas.drawLine(startX, height / 2, startX + 2, height / 2, num_a_paint);
	            num_a_paint.setStrokeCap(Paint.Cap.BUTT);
	            canvas.drawLine(startX, height / 2, length_a, height / 2, num_a_paint);
	            num_b_paint.setStrokeCap(Paint.Cap.ROUND);
	            canvas.drawLine(endX, height / 2, endX - 2, height / 2, num_b_paint);
	            num_b_paint.setStrokeCap(Paint.Cap.BUTT);
	            canvas.drawLine(endX, height / 2, length_b - 2, height / 2, num_b_paint);
	        } else if (type == 1){
	            //<-|->
	            // 从中间往两边画
	            float centre=(endX-startX)/2+margin;
	            float length_a = (startX*num_b/100)+centre-(num_b/100*(centre));
	            float length_b = (endX*num_a/100)+centre-(num_a/100*(centre));
	            num_a_paint.setStrokeCap(Paint.Cap.BUTT);
	            canvas.drawLine(centre, height / 2, length_a, height / 2, num_a_paint);
	            num_a_paint.setStrokeCap(Paint.Cap.ROUND);
	            canvas.drawLine(length_a+2, height / 2, length_a, height / 2, num_a_paint);
	            num_b_paint.setStrokeCap(Paint.Cap.BUTT);
	            canvas.drawLine(centre, height / 2, length_b, height / 2, num_b_paint);
	            num_b_paint.setStrokeCap(Paint.Cap.ROUND);
	            canvas.drawLine(length_b, height / 2, length_b+2, height / 2, num_b_paint);
	        }

	    }

	    public void setNumAProgress(final int xx) {
	        final ValueAnimator anim = ValueAnimator.ofFloat(0,xx);
	        anim.setDuration(2000);
	        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	            @Override
	            public void onAnimationUpdate(ValueAnimator animator) {
	                num_a  = (float) animator.getAnimatedValue();
	                invalidate();
	            }
	        });
	        anim.start();
	    }
	    public void setNumBProgress(final int xx) {
	        final ValueAnimator anim = ValueAnimator.ofFloat(0,xx);
	        anim.setDuration(2000);
	        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
	            @Override
	            public void onAnimationUpdate(ValueAnimator animator) {
	                num_b  = (float) animator.getAnimatedValue();
	                invalidate();
	            }
	        });
	        anim.start();
	    }

	    public void setType(int type) {
	        this.type = type;
	        invalidate();
	    }
	}

[RingProgressBarView.java](https://github.com/tea9/android_view/blob/master/app/src/main/java/com/demo/android_view/mview/RingProgressBarView.java)  

---

## 调用

activity_line_progress_bar.xml  

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	              android:orientation="vertical"
	                                             xmlns:app="http://schemas.android.com/apk/res-auto"
	                                             android:layout_width="match_parent"
	                                             android:layout_height="match_parent">

	    <Button android:id="@+id/switch_type_btn" android:layout_width="wrap_content" android:layout_height="wrap_content"
	    android:text="切换type"/>
	    <com.demo.android_view.mview.LineProgressBarView
	            android:id="@+id/lll"
	            android:layout_width="match_parent"
	            app:bar_type="0"
	            android:layout_height="wrap_content"/>
	</LinearLayout>

LineProgressBarActivity.java  

	public class LineProgressBarActivity extends AppCompatActivity {

	    private LineProgressBarView lll;
	    private Button switch_type_btn;
	    private int type = 0;

	    @Override
	    protected void onCreate(@Nullable Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        setContentView(R.layout.activity_line_progress_bar);
	        switch_type_btn = findViewById(R.id.switch_type_btn);
	        lll = findViewById(R.id.lll);
	        lll.setNumAProgress(40);
	        lll.setNumBProgress(40);

	        switch_type_btn.setOnClickListener(new View.OnClickListener() {
	            @Override
	            public void onClick(View view) {
	                lll.setType(type==0?1:0);
	                if (type==0) type = 1; else type = 0;
	            }
	        });
	    }
	}

## 源代码
[源代码](https://github.com/tea9/android_view)  

## LINKS

[自定义View之线性百分比进度条](https://blog.csdn.net/qq_38367802/article/details/77566102)  
[自定义View实现进度条](https://blog.csdn.net/qq_31179919/article/details/52596965)  
[Android 实现一个蛮酷的加载进度条](https://juejin.im/entry/585a6b80ac502e006711fa8d)  
[Android绘图总结（Bitmap，Canvas，Paint，圆角）](https://blog.csdn.net/xuewater/article/details/45247885)  
[一个功能强大的自定义SeekBar](https://www.sohu.com/a/203382364_659256)  
[Android自定义控件三部曲文章索引](https://blog.csdn.net/harvic880925/article/details/50995268)  
