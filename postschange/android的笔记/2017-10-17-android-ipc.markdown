---
layout:     post
title:      "android-ipc"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android的笔记"
---
按照操作系统中的描述
线程是CPU调度的最小单元 同时线程是一种有限的系统资源
进程一般指一个执行单元 在PC和移动设备上指一个应用 
一个进程可以包含多个线程  因此进程和线程是包含与被包含的关系
最简单的情况下一个进程中可以只有一个线程即主线程 在Android里面主线程也叫UI线程 在UI线程里才能操作界面元素 

Android中进程间通信方式是Binder
Android上还支持Socket 通过Socket可以实现两个终端之间的通信 一个设备上的两个进程通过Socket通信也可以

早期每个应用最大内存是16mb

多进程会造成的问题：
1.静态变量和单例模式完全失效。（多个虚拟机 内存不共享）
2.线程同步机制完全失效
3.SharedPreferences的可靠性下降(会导致数据丢失)
4.Application会多次创建（独立虚拟机）

跨进程通信的方式
Intent来传递数据
共享文件和SharedPreferences
基于Binder的Messenger和AIDL以及Socket


Binder

![Binder](http://upload-images.jianshu.io/upload_images/2590671-50d08153c674e6d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Book.java   Parcelable 

	public class Book implements Parcelable {

		public int bookId;
		public String bookName;

		public Book(int bookId, String bookName) {
			this.bookId = bookId;
			this.bookName = bookName;
		}

		public int describeContents() {
			return 0;
		}

		public void writeToParcel(Parcel out, int flags) {
			out.writeInt(bookId);
			out.writeString(bookName);
		}

		public static final Parcelable.Creator<Book> CREATOR = new Creator<Book>() {
			@Override
			public Book createFromParcel(Parcel parcel) {
				return new Book(parcel);
			}

			@Override
			public Book[] newArray(int i) {
				return new Book[i];
			}
		};

		private Book(Parcel in) {
			bookId = in.readInt();
			bookName = in.readString();
		}
	}





