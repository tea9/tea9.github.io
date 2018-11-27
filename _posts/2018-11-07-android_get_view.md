---
layout: post
title: "android获取控件的几种方法"
date: 2018-11-07
category: android
tags: android
---

layout  

	<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:layout_width="match_parent"
	    android:background="@color/colorPrimary"
	    android:layout_height="wrap_content">
	    <TextView
	        android:id="@+id/item_tv"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_centerInParent="true"
	        android:textSize="25sp" />
	</RelativeLayout>


## 0x01 findViewById

	private TextView item_tv;

	item_tv = findViewById(R.id.item_tv);
	item_tv.setText("text1");

## 0x02 getResources().getIdentifier()

	int viewId = getResources().getIdentifier("item_tv", "id", getPackageName());
	TextView textView =findViewById(viewId);
	textView.setText("text2");

## 0x03 getField()

	try {
	    Field field = R.id.class.getField("item_tv");
	    TextView textView = findViewById(field.getInt(null));
	    textView.setText("text3");

	} catch (NoSuchFieldException e) {
	    e.printStackTrace();
	} catch (IllegalAccessException e) {
	    e.printStackTrace();
	}

## 0x04 通过反射

    java反射机制
        获取类的方式:(1)class.forName("类名"),(2)类名().getClass(),(3)类名.class;
        Constructor类:
            getConstuctor()返回class的构造函数;
            getConstructors()返回class类的所有构造方法;
            getDelaredConstructor()返回class类或接口指定的构造函数;
            getDelaredConstructors()返回所有class类或接口指定的构造函数;
            getEnclosingConstructor()返回class类的构造方法中的一个本地或匿名类;
            getModifiers()返回对象的java修饰符;
            getName()以字符串的形式返回构造方法的名称;
            newInstance()实例化对象;
        getDeclaredFields()获取本类的全部属性;
        getMethod()获取类中的方法对象;
        Field类:
            获取反射字段的方式:getDeclaredField(),getFields();
            getName()获取字段名;
            getType()获取字段类型;
            get()获取字段的值;
            set()设置字段的值;

	try {
	        Class stuClass = Class.forName("com.example.homepage.activity.HH");
	        Field file = stuClass.getDeclaredField("item_tv"); // 通过反射获取item_tv对象
	        file.setAccessible(true);
	        TextView textView = (TextView) file.get(this); // 获取textView实例
	        textView.setText("text4");
	        file.set(this,textView);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}

## code

[code](https://github.com/tea9/dear_kotlin_code/blob/master/homepage/src/main/java/com/example/homepage/activity/HH.java)  

## others
一些测试代码  

            try {
    //            Field field = R.id.class.getField("header_tv");
                Class stuClass = Class.forName("com.jwenfeng.library.pulltorefresh.view.HeadRefreshView");
    //            Class stuClass = Class.forName("com.jwenfeng.library.pulltorefresh.PullToRefreshLayout");
    //            Field f = stuClass.getDeclaredField("header_tv");
    //            f.setAccessible(true);
    //
    //            TextView textView = findViewById(f.getInt(null));
    //            Log.e("tea",textView.getText().toString());
    //            textView.setText("zezeze");
    //            HeadRefreshView view = (HeadRefreshView) stuClass.newInstance();
    //            Field[] fieldArray = stuClass.getFields(); // 不包括私有参数
    //            Field[] fieldArray = stuClass.getDeclaredFields(); //私有参数
    //            for(Field f : fieldArray){
    //                Log.e("tea", String.valueOf(f));
    //            }
                Field file = stuClass.getDeclaredField("tv");
                file.setAccessible(true);
    //            Log.e("tea", String.valueOf(file));
                HeadRefreshView view = new HeadRefreshView(this);
                TextView nameStr = (TextView) file.get(view);
                Log.e("tea", nameStr.getText().toString());
                nameStr.setText("tea9");
    //            nameStr.setVisibility(View.GONE);
    //            TextView textView = new TextView(this);
    //            textView.setVisibility(View.GONE);
    //            textView.setText("tea0");
    //            file.set(view, nameStr);
    //            Constructor<?>[] constructor = stuClass.getConstructors(); //构造方法
    //            for (int i = 0; i < constructor.length; i++) {
    ////                Log.e("tea", constructor[i].toString());
    //            }
    //            Method[] methods = stuClass.getDeclaredMethods(); // 获取声明的方法
    //            for (int i = 0; i < methods.length; i++) {
    ////                Log.e("tea", methods[i].toString());
    //            }
                Method m2 = stuClass.getDeclaredMethod("getView");
                View view1 = (View) m2.invoke(view);
                TextView textView1 = view1.findViewById(R.id.header_tv);
                textView1.setVisibility(View.GONE);
                textView1.setText("tea8");
                file.set(view1, textView1);
    //            Log.e("tea1", textView1.getText().toString());
    //            TextView nameStr1 = (TextView) file.get(view);
    //            Log.e("tea", nameStr1.getText().toString());

            }  catch (Exception e) {
                e.printStackTrace();
                Log.e("tea", "错误了");
            }

    //        int viewId = getResources().getIdentifier("tv", "id", "com.jwenfeng.library.pulltorefresh");
    //        TextView textView = (TextView)findViewById(viewId);
    //        textView.setText("sss");


## LINKS

[リフレクションを使って文字列からリソースIDを取得する](https://qiita.com/1plus4/items/9f273b26945a8659d441)  
[JAVA反射](https://www.jianshu.com/p/5c9bc53556b8)  
[Java Reflection(反射机制)详解](https://www.jianshu.com/p/2315dda64ad2)  
[Java 反射 使用总结](https://www.cnblogs.com/zhaoyanjun/p/6074887.html)  
[关于Android中根据ID名动态获取资源的两个方法](https://blog.csdn.net/stzy00/article/details/41079907)  
[Android利用资源名称获取其ID(一)--->getIdentifier()](https://blog.csdn.net/lfdfhl/article/details/21017889)  