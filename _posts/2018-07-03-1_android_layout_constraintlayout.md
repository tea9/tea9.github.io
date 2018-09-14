---
layout: post
title: "1.android布局-ConstraintLayout-约束布局"
date: 2018-07-03
category: android
tags: android
---

## ConstraintLayout 是什么？

[ConstraintLayout](https://developer.android.google.cn/reference/android/support/constraint/ConstraintLayout)

## ConstraintLayout 怎么用？

**基本用法**

    layout_constraint[当前控件位置]_[目标控件位置]="[目标控件ID]"

1.上下排列  

	a  
	b  

	b:
	app:layout_constraintTop_toBottomOf="a"

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            android:text="@string/a" />
    
        <TextView
            android:id="@+id/b"
            style="@style/text"
            android:text="@string/b"
            app:layout_constraintTop_toBottomOf="@id/a" />
    </android.support.constraint.ConstraintLayout>

![]({{site.img_link}}/19/1.png)

2.左右排列  

	a b
    a:
    app:layout_constraintRight_toLeftOf="b"
	b:
	app:layout_constraintLeft_toRightOf="a"

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintRight_toLeftOf="@id/b"
            android:text="@string/a" />
    
        <TextView
            android:id="@+id/b"
            style="@style/text"
            android:text="@string/b"
            app:layout_constraintLeft_toRightOf="@id/a" />
    </android.support.constraint.ConstraintLayout>


![]({{site.img_link}}/19/2.png)

左右排列更严谨的写法   

    a b
    b:
    app:layout_constraintStart_toEndOf="a"
    app:layout_constraintTop_toTopOf="a"
    app:layout_constraintBottom_toBottomOf="a"

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintRight_toLeftOf="@id/b"
            app:layout_constraintEnd_toStartOf="@id/b"
            app:layout_constraintTop_toTopOf="@id/b"
            android:text="@string/a" />

        <TextView
            android:id="@+id/b"
            style="@style/text"
            android:text="@string/b"
            app:layout_constraintStart_toEndOf="@id/a"
            app:layout_constraintTop_toTopOf="@id/a"
            app:layout_constraintLeft_toRightOf="@id/a" />
    </android.support.constraint.ConstraintLayout>


![]({{site.img_link}}/19/2.png)

3.靠最右边  

	a 靠界面最右边
	a：
	app:layout_constraiontEnd_toEndOf="parent"

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintEnd_toEndOf="parent"
            android:text="@string/a" />
    </android.support.constraint.ConstraintLayout>


![]({{site.img_link}}/19/3.png)

	constraiontEnd 是自己本身的
	toEnd 底部停靠的
    parent 是父布局

4.三等分然后停靠最底部  

    a b c
    a:
    app:layout_constraiontBottom_toBottomOf="parent"
    app:layout_constraiontLeft_toLeftOf="parent"
    app:layout_constraiontRight_toLeftOf="b"

    b:
    app:layout_constraiontBottom_toBottomOf="parent"
    app:layout_constraiontLeft_toRightOf="a"
    app:layout_constraiontRight_toLeftOf="c"

    c:
    app:layout_constraiontBottom_toBottomOf="parent"
    app:layout_constraiontLeft_toRightOf="b"
    app:layout_constraiontRight_toRightOf="parent"

上面就是构成官网所说的链(chain)  

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toLeftOf="@id/b"
            android:text="@string/a" />
    
        <TextView
            android:id="@+id/b"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toRightOf="@id/a"
            app:layout_constraintRight_toLeftOf="@id/c"
            android:text="@string/b"/>
        <TextView
            android:id="@+id/c"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintLeft_toRightOf="@id/b"
            android:text="@string/c"/>
    </android.support.constraint.ConstraintLayout>


![]({{site.img_link}}/19/4.png)

延伸两个属性
    
    app:layout_constraiontHorizontal_weight="1" //等分属性
    
    app:layout_constraiontHorizontal_chainstyle="spread_inside" //spread_inside 两端对齐 packed 聚中  spread(默认)控件之间留空

实例：  
聚中：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toLeftOf="@id/b"
            android:text="@string/a" />

        <TextView
            android:id="@+id/b"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toRightOf="@id/a"
            app:layout_constraintRight_toLeftOf="@id/c"
            android:text="@string/b"/>
        <TextView
            android:id="@+id/c"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintLeft_toRightOf="@id/b"
            android:text="@string/c"/>
    </android.support.constraint.ConstraintLayout>


![]({{site.img_link}}/19/5.png)

左右分散：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintHorizontal_chainStyle="spread_inside"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toLeftOf="@id/b"
            android:text="@string/a" />

        <TextView
            android:id="@+id/b"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toRightOf="@id/a"
            app:layout_constraintRight_toLeftOf="@id/c"
            android:text="@string/b"/>
        <TextView
            android:id="@+id/c"
            style="@style/text"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintLeft_toRightOf="@id/b"
            android:text="@string/c"/>
    </android.support.constraint.ConstraintLayout>

![]({{site.img_link}}/19/6.png)

---
### Guideline （约束线）

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <android.support.constraint.Guideline
            android:id="@+id/guideline"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            app:layout_constraintGuide_percent="0.5" />

        <Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Button"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/guideline"
            app:layout_constraintWidth_default="spread" />

        <Button
            android:id="@+id/button2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Button"
            app:layout_constraintBottom_toBottomOf="@+id/button"
            app:layout_constraintStart_toStartOf="@+id/guideline"
            app:layout_constraintTop_toTopOf="@+id/button" />
    </android.support.constraint.ConstraintLayout>



    Guideline 是一个约束线（不会画出来）
    app:layout_constraintGuide_percent="0.5" 0.5是50%
    上面代码是 在视图50%位置 左右两边有两个butthon
    

![]({{site.img_link}}/19/7.png)

实例：  

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <android.support.constraint.Guideline
            android:id="@+id/guideline"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal"
            app:layout_constraintGuide_begin="40dp"/>
        
        <TextView
            android:id="@+id/a"
            style="@style/text"
            app:layout_constraintTop_toTopOf="@id/guideline"
            android:text="@string/a"/>
        <TextView
            android:id="@+id/b"
            style="@style/text"
            app:layout_constraintTop_toTopOf="@id/guideline"
            app:layout_constraintLeft_toRightOf="@id/a"
            android:text="@string/b"/>
        <TextView
            android:id="@+id/c"
            style="@style/text"
            app:layout_constraintTop_toTopOf="@id/guideline"
            app:layout_constraintLeft_toRightOf="@id/b"
            android:text="@string/c"/>
    </android.support.constraint.ConstraintLayout>

    在40dp上画一条约束线 
    textview以此排列


![]({{site.img_link}}/19/8.png)



## 源码
[源码](https://github.com/tea9/dear_kotlin_code/tree/master/constraintlayout/src/main/res/layout)

## 相关链接

[ConstraintLayout详解](https://www.jianshu.com/p/768b9e47a77b)  

[Android新特性介绍，ConstraintLayout完全解析](https://blog.csdn.net/guolin_blog/article/details/53122387)  
[Constraint Layout 1.1.x带来了哪些新东西？](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2017/1019/8618.html)  
[未来布局之星——ConstraintLayout](https://www.jianshu.com/p/c34ce21f77b3)  
[ConstraintLayout使用的一些坑](https://blog.csdn.net/jxb196203/article/details/80695410)  
[Android约束布局ConstraintLayout 项目实战攻略](https://blog.csdn.net/silenceoo/article/details/78556409)  
[Android ConstraintLayout详解](https://www.jianshu.com/p/768b9e47a77b)   
[实战篇ConstraintLayout的崛起之路](https://www.jianshu.com/p/a74557359882)  
[关于ConstraintLayout与Recycleview使用中的一些坑](https://blog.csdn.net/android_mh/article/details/79022738)  
[ConstraintLayout使用的一些坑](https://blog.csdn.net/jxb196203/article/details/80695410)
