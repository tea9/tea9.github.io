---
layout: post
title: "android监听list变化"
date: 2019-01-16
category: android
tags: android
---

## 思路

	主要的思路就是，新建个接口定义一个onChange()方法，然后在操作list的类中，添加这个监听。

## 代码

TeaChangeListListener.java

    public interface TeaChangeListListener {
        public void onChange();
    }


TeaList.java

    public class TeaList<T> {
    
        private TeaChangeListListener listener;
    
        private ArrayList<T> list;
    
        public TeaList() {
            list = new ArrayList<>();
        }
    
        public T get(int position) {
            return list.get(position);
        }
    
        public int size() {
            return list.size();
        }
    
        public void add(T t) {
            list.add(t);
            addListener();
        }
    
        public void remove(T t) {
            list.remove(t);
            addListener();
        }
    
        public void addAll(List<T> list1) {
            list.addAll(list1);
            addListener();
        }
    
    
        private void addListener() {
            if (listener!=null) {
                listener.onChange();
            }
        }
    
        public void setChangeListener(TeaChangeListListener listener1) {
            this.listener = listener1;
        }
    
    }

## 测试类

    public static void main(String[] args) {
        TeaList<String> testList = new TeaList<>();
        testList.setChangeListener(new TeaChangeListListener() {
            @Override
            public void onChange() {
                System.out.println("监听到变化了");
            }
        });

        testList.add("tea9");
	//        List<String> testList2 = new ArrayList<>();
	//        testList2.add("tea9");
	//        testList2.add("tea10");
	//        testList.addAll(testList2);
	//        testList.remove("tea9");

        for (int i = 0; i < testList.size(); i++) {
            System.out.println(testList.get(i));
        }

    }

[TeaList.java](https://github.com/tea9/android_base/blob/master/app/src/main/java/com/demo/android_base/test/TeaList.java)  

## LINKS

[如何在Java中添加上的ArrayList监听(How to add listener on ArrayList in java)](http://www.it1352.com/231623.html)  
[Android中解决RecyclerView各种点击事件的方法](https://www.jb51.net/article/140578.htm)  