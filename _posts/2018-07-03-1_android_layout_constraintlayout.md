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

1上下排列  

	a  
	b  

	b:
	app:layout_constraintTop_toBottomOf="a"

2.左右排列  

	a b
	b:
	app:layout_constraintLeft_toRightOf="a"
	app:layout_constraintTop_toTopOf="a"

左右排列更严谨的写法   

    a b
    b:
    app:layout_constraintStart_toEndOf="a"
    app:layout_constraintTop_toTopOf="a"
    app:layout_constraintBottom_toBottomOf="a"

3.靠最右边  

	a 靠界面最右边
	a：
	app:layout_constraiontEnd_toEndOf="parent"


	constraiontEnd 是 自己本身的
	toEnd 是对应后边参数的

4.三等分然后停靠最底部  

    dfdkfjdslfjdlfjdsklf
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

延伸两个属性
    
    app:layout_constraiontHorizontal_weight="1"
    左右分散
    app:layout_constraiontHorizontal_chainstyle="spread_inside"
    聚中
    packed
    还有一个默认属性是 左右都空
    


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
[Android约束布局ConstraintLayout 项目实战攻略](https://blog.csdn.net/silenceoo/article/details/78556409)  
[Android ConstraintLayout详解
](https://www.jianshu.com/p/768b9e47a77b)  

## 等在更新的时候 会贴图 加注释 加代码链接 





