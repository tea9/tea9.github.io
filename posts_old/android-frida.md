---
title: android frida
tags:
  - android
  - android安全
abbrlink: 739255443
date: 2019-06-10 18:00:12
---

> 在我们开始之前，请确保你的Android设备已经完成root操作。我们大部分的实验操作都是在Android4.4版本上进行的，但是Frida本身是支持从4.2到6.0的版本的，但是目前来说对Art的支持还是有限的，所以我们建议最后还是用使用Dalvik虚拟机的系统设备或者模拟器来进行尝试。

## 设备信息

```
手机：Nexus5 android4.4.4 root 
Dalvik 运行环境(设置-开发者选项-选择运行环境-使用Dalvik)  
```

## 安装

```
pip install frida-tools

```
查看手机cpu
```
adb shell getprop ro.product.cpu.abi 
```

下载对应frida-server  
[frida](https://github.com/frida/frida/releases)  
[frida-server-12.6.6-android-arm.xz](https://github.com/frida/frida/releases/download/12.6.6/frida-server-12.6.6-android-arm.xz)  

frida需要在root权限运行  
```
adb root
adb push frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "data/local/tmp/frida-server &"

```

设备是否连接正常  
```
adb devices -l
```

```
frida-ps -U #会显示进程列表
```

```
frida-trace -U -i open com.android.chrome #监控app
```

```
frida -U -l example.js com.example.dlive #向app注入js
```

## js脚本注入 java

MainActivity.java  

```
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.mBtnTest).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                helloAndroid();
                test1();
                test2(123);
                test3("str");
                test4("str",true);

                ((Button)findViewById(R.id.mBtnTest)).setText(test5());
            }
        });
    }

    private void helloAndroid() {
        System.out.println("helloAndroid");
    }

    private void test1() {
        System.out.println("test1()");
    }

    private void test2(int i) {
        System.out.println("test2(int)"+i);
    }

    private void test3(String s) {
        System.out.println("test3(String)"+s);
    }

    private void test4(String s,boolean b) {
        System.out.println("test4(String,boolean)"+s+","+b);
    }

    private String test5() {
        return "error";
    }
}
```

activity_main.xml  

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    
    <Button
        android:id="@+id/mBtnTest"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

</LinearLayout>
```

frida.js  
```
console.log("[*] Starting script");
Java.perform(function () {
    var MainActivity = Java.use("com.demo.android_frida.MainActivity");
    MainActivity.helloAndroid.implementation = function () {
        console.log("helloAndroid()");
        // this.private_func();
    };
    MainActivity.test1.overload().implementation = function () {
        console.log("test1()");
        // this.private_func();
    };
    MainActivity.test2.overload("int").implementation = function (i) {
        console.log("test2(int): " + i);
        // this.private_func(i);
    };
    MainActivity.test3.overload("java.lang.String").implementation = function () {
        console.log("test3(String): " + arguments[0]);
        // this.private_func(arguments[0]);
    };
    //输出
    MainActivity.test4.overload("java.lang.String", "boolean").implementation = function (s, b) {
        console.log("test4(String,boolean): " + s + ", " + b);
        // this.private_func(s, b);
    };
    // 修改返回值
    MainActivity.test5.overload().implementation= function(){
        console.log("test5");
        // return this.test5()+"llll";
        return "ffff";
    }
});
```

注入  
```
frida -U -l frida.js com.demo.android_frida

     ____
    / _  |   Frida 12.4.8 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at http://www.frida.re/docs/home/
Attaching... 
```

点击按钮  
```
[*] Starting script
[LGE Nexus 5::com.demo.android_frida]-> helloAndroid()
test1()
test2(int): 123
test3(String): str
test4(String,boolean): str, true
test5
```

按钮文字改成ffff  

## LINKS
[使用Frida简化Android端应用安全测试](https://www.cnblogs.com/dliv3/p/6753868.html)  
[Android逆向之旅---Hook神器家族的Frida工具使用详解](https://blog.csdn.net/jiangwei0910410003/article/details/80372118)  
[如何使用FRIDA搞定Android加壳应用](https://www.anquanke.com/post/id/163390)  
[[原创]Frida从入门到入门—安卓逆向菜鸟的frida食用说明](https://bbs.pediy.com/thread-226846.htm)  