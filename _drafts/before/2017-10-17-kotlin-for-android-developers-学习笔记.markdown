---
layout:     post
title:      "kotlin-for-android-developers-学习笔记"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-digital-native.jpg"
tags:
    - "Kotlin"
---
how do i define a class?


	// first
	class Person{

	}
	// or ellipsis "{}"
	class Person(name:String,surname:String)

	// or
	class Person(name: String,surnam:String) {
		// 构造函数的函数体在哪呢？ Hereunder
		init {

		}
	}

------

	/**
	 * Class inheritance
	 *  1.默认任何类都是基础继承Any （与java中的Object类似）
	 *  2.所有类默认都是不可集成的(final)
	 *  3.所以我们只能继承那些明确声明open或者abstract的类
	 */
	open class Animal(name: String)

	class Person(name: String, surname: String) : Animal(name)

---

	/**
	 * 函数
	 * java中的方法 如果你没有指定它的返回值，它就会返回 Unit
	 */
	fun onCreate(savedInstanceState: Bundle?) {
		
	}

	fun add(x: Int,y: Int) : Int = x + y


