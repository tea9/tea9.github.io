---
layout: post
title: "android_thread"
date: 2019-01-24
category: android
tags: android
---

a执行完执行b

	private static void demo2() {
	    Thread A = new Thread(new Runnable() {
	        @Override
	        public void run() {
	            printNumber("A");
	        }
	    });
	    Thread B = new Thread(new Runnable() {
	        @Override
	        public void run() {
	            System.out.println("B 开始等待 A");
	            try {
	                A.join();
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
	            printNumber("B");
	        }
	    });
	    B.start();
	    A.start();
	}


## LINKS
[Java 里如何实现线程间通信](http://www.importnew.com/26850.html)  
[Android主线程向子线程中发送信息](https://blog.csdn.net/shyboyes/article/details/50087875)  
[android如何终止一个正在运行的子线程](https://blog.csdn.net/qq_35956194/article/details/80458909)  