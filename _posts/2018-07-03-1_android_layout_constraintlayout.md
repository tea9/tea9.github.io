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


	a  
	b  

	b:
	app:layout_constraintTop_toBottomOf="a"


	a b
	b:
	app:layout_constraintLeft_toRightOf="a"
	app:layout_constraintTop_toTopOf="a"


	a 靠界面最右边
	a：
	app:layout_constraiontEnd_toEndOf="parent"


	constraiontEnd 是 自己本身的
	toEnd 是对应后边参数的

---
### Guideline

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
        android:layout_marginBottom="92dp"
        android:layout_marginEnd="12dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/guideline"
        app:layout_constraintWidth_default="spread" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="@+id/button"
        app:layout_constraintStart_toStartOf="@+id/guideline"
        app:layout_constraintTop_toTopOf="@+id/button" />


    Guideline 是一个约束线（不会画出来）
    上面代码是 在视图50%位置 左右两边有两个butthon
    

### layout_constraintHorizontal_chainStyle属性

[ConstraintLayout详解](https://www.jianshu.com/p/768b9e47a77b)

## 相关链接

[Android新特性介绍，ConstraintLayout完全解析](https://blog.csdn.net/guolin_blog/article/details/53122387)  
[Constraint Layout 1.1.x带来了哪些新东西？](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2017/1019/8618.html)  
[未来布局之星——ConstraintLayout](https://www.jianshu.com/p/c34ce21f77b3)  
[ConstraintLayout使用的一些坑](https://blog.csdn.net/jxb196203/article/details/80695410)  





