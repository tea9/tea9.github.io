---
layout: post
title: "1.android布局-ConstraintLayout-约束布局-例子"
date: 2018-09-14
category: android
tags: android
---

## 前言

> ConstraintLayout 出来也有一段时间，虽说也有很多坑，但是一些属性还是特别好用的，在项目中我也逐渐在使用，下面是用ConstraintLayout实现的一个标签栏的样式例子。

[1.android布局-ConstraintLayout-约束布局](https://tea9.xyz/2018/07/03/1_android_layout_constraintlayout.html)  

## 效果

![]({{site.img_link}}/20/1.jpg)

## 思路

	1. 定义两条横向约束线(Guideline) 
	2. 横向排列5个控件(TextView)
	3. 在每个TextView 下在来5个短横线(View)
	4. 最下方放置一个ViewPager

## 代码

activity_tab_constraintlayout.xml  

    <LinearLayout
        android:orientation="vertical"
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@android:color/white"
        xmlns:app="http://schemas.android.com/apk/res-auto">
        <android.support.constraint.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <android.support.constraint.Guideline
                android:id="@+id/guideline"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="horizontal"
                app:layout_constraintGuide_begin="10dp" />
    
            <android.support.constraint.Guideline
                android:id="@+id/guideline1"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="horizontal"
                app:layout_constraintGuide_begin="40dp" />
    
            <TextView
                android:id="@+id/tx1"
                app:layout_constraintTop_toTopOf="@id/guideline"
                app:layout_constraintLeft_toLeftOf="parent"
                app:layout_constraintRight_toLeftOf="@id/tx2"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintEnd_toStartOf="@id/tx2"
                style="@style/text2"
                android:text="@string/btn1"/>
            <TextView
                android:id="@+id/tx2"
                app:layout_constraintTop_toTopOf="@id/guideline"
                app:layout_constraintLeft_toRightOf="@id/tx1"
                app:layout_constraintRight_toLeftOf="@id/tx3"
                app:layout_constraintStart_toEndOf="@id/tx1"
                app:layout_constraintEnd_toStartOf="@id/tx3"
                style="@style/text2"
                android:text="@string/btn2"/>
            <TextView
                android:id="@+id/tx3"
                app:layout_constraintTop_toTopOf="@id/guideline"
                app:layout_constraintLeft_toRightOf="@id/tx2"
                app:layout_constraintRight_toLeftOf="@id/tx4"
                app:layout_constraintStart_toEndOf="@id/tx2"
                app:layout_constraintEnd_toStartOf="@id/tx4"
                style="@style/text2"
                android:text="@string/btn3"/>
            <TextView
                android:id="@+id/tx4"
                app:layout_constraintTop_toTopOf="@id/guideline"
                app:layout_constraintLeft_toRightOf="@id/tx3"
                app:layout_constraintRight_toLeftOf="@id/tx5"
                app:layout_constraintStart_toEndOf="@id/tx3"
                app:layout_constraintEnd_toStartOf="@id/tx5"
                style="@style/text2"
                android:text="@string/btn4"/>
            <TextView
                android:id="@+id/tx5"
                app:layout_constraintTop_toTopOf="@id/guideline"
                app:layout_constraintLeft_toRightOf="@id/tx4"
                app:layout_constraintRight_toRightOf="parent"
                app:layout_constraintStart_toEndOf="@id/tx4"
                app:layout_constraintEnd_toEndOf="parent"
                style="@style/text2"
                android:text="@string/btn5"/>
            <View
                android:id="@+id/view1"
                android:visibility="visible"
                app:layout_constraintTop_toBottomOf="@id/tx1"
                app:layout_constraintStart_toStartOf="@id/tx1"
                app:layout_constraintEnd_toEndOf="@id/tx1"
                style="@style/short_line" />
            <View
                android:id="@+id/view2"
                android:visibility="gone"
                app:layout_constraintTop_toBottomOf="@id/tx2"
                app:layout_constraintStart_toStartOf="@id/tx2"
                app:layout_constraintEnd_toEndOf="@id/tx2"
                style="@style/short_line" />
            <View
                android:id="@+id/view3"
                android:visibility="gone"
                app:layout_constraintTop_toBottomOf="@id/tx3"
                app:layout_constraintStart_toStartOf="@id/tx3"
                app:layout_constraintEnd_toEndOf="@id/tx3"
                style="@style/short_line"  />
            <View
                android:id="@+id/view4"
                android:visibility="gone"
                app:layout_constraintTop_toBottomOf="@id/tx4"
                app:layout_constraintStart_toStartOf="@id/tx4"
                app:layout_constraintEnd_toEndOf="@id/tx4"
                style="@style/short_line"  />
            <View
                android:id="@+id/view5"
                android:visibility="gone"
                app:layout_constraintTop_toBottomOf="@id/tx5"
                app:layout_constraintStart_toStartOf="@id/tx5"
                app:layout_constraintEnd_toEndOf="@id/tx5"
                style="@style/short_line"  />
            <View
                android:id="@+id/view6"
                app:layout_constraintTop_toBottomOf="@id/guideline1"
                android:background="@color/gray"
                android:layout_width="match_parent"
                android:layout_height="10dp"/>
        </android.support.constraint.ConstraintLayout>
        <android.support.v4.view.ViewPager
            android:id="@+id/vp1"
            android:overScrollMode="never"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        </android.support.v4.view.ViewPager>
    </LinearLayout>

> 说明：这个布局为什么不直接用ConstraintLayout做根布局呢？
> 因为 如果ViewPager里的布局使用RecyclerView最后一条或几条显示不全

[关于ConstraintLayout与Recycleview使用中的一些坑](https://blog.csdn.net/android_mh/article/details/79022738)  

---

TabConstraintLayoutActivity.kt  

	class TabConstraintLayoutActivity : AppCompatActivity(), View.OnClickListener {
	    override fun onClick(v: View?) {
	        when (v!!.id) {
	            R.id.tx1 -> vp1.currentItem = 0
	            R.id.tx2 -> vp1.currentItem = 1
	            R.id.tx3 -> vp1.currentItem = 2
	            R.id.tx4 -> vp1.currentItem = 3
	            R.id.tx5 -> vp1.currentItem = 4
	        }
	    }

	    var views = arrayListOf<View>()

	    override fun onCreate(savedInstanceState: Bundle?) {
	        super.onCreate(savedInstanceState)
	        setContentView(R.layout.activity_tab_constraintlayout)
	        initView()
	        initViewPager()
	        clearView()
	        clickView(1)
	    }

	    private fun initView() { // 初始化view
	        tx1.setOnClickListener(this)
	        tx2.setOnClickListener(this)
	        tx3.setOnClickListener(this)
	        tx4.setOnClickListener(this)
	        tx5.setOnClickListener(this)
	        val v1 = LayoutInflater.from(this).inflate(R.layout.item_text, null)
	        val v2 = LayoutInflater.from(this).inflate(R.layout.item_text, null)
	        val v3 = LayoutInflater.from(this).inflate(R.layout.item_text, null)
	        val v4 = LayoutInflater.from(this).inflate(R.layout.item_text, null)
	        val v5 = LayoutInflater.from(this).inflate(R.layout.item_text, null)
	        views.addAll(arrayListOf<View>(v1, v2, v3, v4, v5))
	    }

	    private fun initViewPager() { //初始化ViewPager
	        vp1.adapter = ViewPagerAdapter(views)
	        vp1.addOnPageChangeListener(object : ViewPager.OnPageChangeListener {
	            override fun onPageScrollStateChanged(p0: Int) {

	            }

	            override fun onPageScrolled(p0: Int, p1: Float, p2: Int) {
	            }

	            override fun onPageSelected(p0: Int) {
	                when (p0) {
	                    0 -> clickView(1)
	                    1 -> clickView(2)
	                    2 -> clickView(3)
	                    3 -> clickView(4)
	                    4 -> clickView(5)
	                }
	            }
	        })
	        vp1.currentItem = 0
	    }

	    private fun clearView() { // 清空View选中状态
	        val arg = ContextCompat.getColor(this, R.color.gray_deep)
	        tx1.setTextColor(arg)
	        tx2.setTextColor(arg)
	        tx3.setTextColor(arg)
	        tx4.setTextColor(arg)
	        tx5.setTextColor(arg)
	        view1.visibility = View.GONE
	        view2.visibility = View.GONE
	        view3.visibility = View.GONE
	        view4.visibility = View.GONE
	        view5.visibility = View.GONE

	    }

	    private fun clickView(position: Int) { // 选中View样式
	        val color = ContextCompat.getColor(this, R.color.pink)
	        when (position) {
	            1 -> {
	                clearView()
	                tx1.setTextColor(color)
	                view1.visibility = View.VISIBLE

	            }
	            2 -> {
	                clearView()
	                tx2.setTextColor(color)
	                view2.visibility = View.VISIBLE
	            }
	            3 -> {
	                clearView()
	                tx3.setTextColor(color)
	                view3.visibility = View.VISIBLE
	            }
	            4 -> {
	                clearView()
	                tx4.setTextColor(color)
	                view4.visibility = View.VISIBLE
	            }
	            5 -> {
	                clearView()
	                tx5.setTextColor(color)
	                view5.visibility = View.VISIBLE
	            }
	        }
	    }

	    class ViewPagerAdapter(views: List<View>) : PagerAdapter() { // ViewPager Adapter
	        var views1 = arrayListOf<View>()
	        init {
	            views1 = views as ArrayList<View>
	        }

	        override fun isViewFromObject(p0: View, p1: Any): Boolean {
	            return p0 == p1
	        }

	        override fun getCount(): Int {
	            return views1.size
	        }

	        override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
	            container.removeView(views1.get(position))
	        }

	        override fun instantiateItem(container: ViewGroup, position: Int): Any {
	            container.addView(views1[position])
	            initView(position, container)
	            return views1[position]
	        }

	        fun initView(position: Int, container: ViewGroup) {
	            views1[position].findViewById<TextView>(R.id.text).text = container.context.getString(R.string.text) + position.toShort()
	        }
	    }
	}


## 源码

[constraintlayout](https://github.com/tea9/dear_kotlin_code/tree/master/constraintlayout)  

