---
layout: post
title: "android VitualXposed 模块编写"
date: 2019-01-21
category: android逆向
tags: android逆向 xposed
---

## virtual Xposed
[virtual Xposed下载链接: ](https://pan.baidu.com/s/1GHoOGm7DuBtkL9AgsaJvNA)
提取码: kyrd    

[virtual xposed wiki](https://github.com/android-hacker/VirtualXposed/wiki/Utilities-For-Xposed-Module-Developer)  


## vx的一些命令
    
    adb shell am start io.va.exposed/io.virtualapp.splash.SplashActivity 启动
    adb shell am broadcast -a io.va.exposed.CMD -e cmd reboot 重启
    adb shell am broadcast -a io.va.exposed.CMD -e cmd update -e pkg <package-name> 安装更新app
    adb shell am broadcast -a io.va.exposed.CMD -e cmd launch -e pkg <package-name> 启动内部app

## 编写Xposed模块

1.xposed依赖  
[xposed](https://jcenter.bintray.com/de/robv/android/xposed/api/)  

build.gradle中添加  

```
compileOnly 'de.robv.android.xposed:api:82'
compileOnly 'de.robv.android.xposed:api:82:sources'
```

2.AndroidManifest.xml添加Xposed模块  

```
<application>
	<meta-data
        android:name="xposedmodule"
        android:value="true" />
    <meta-data
        android:name="xposeddescription"
        android:value="this is a xposed demo" />
    <meta-data
        android:name="xposedminversion"
        android:value="30" />
</application>
```

3.新建个项目为被hook  

MainActivity.java  
```
public class MainActivity extends AppCompatActivity {

    private Button btn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn = findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(MainActivity.this, toastMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
    public String toastMessage() {
        return "我没有被劫持";
    }
}
```
activity_main.xml  

```
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <Button
        android:id="@+id/btn"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="btn"/>

</android.support.constraint.ConstraintLayout>

```
打包安装到VirtualXposed  

4.编写hook类   
[XposedHelpers api](https://api.xposed.info/reference/de/robv/android/xposed/XposedHelpers.html)  

```
public class HookToast implements IXposedHookLoadPackage {
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        if (lpparam.packageName.equals("com.demo.myapplication")){
            Class clazz = lpparam.classLoader.loadClass("com.demo.myapplication.MainActivity");
            XposedHelpers.findAndHookMethod(clazz, "toastMessage", new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable { //hook之前
//                    super.beforeHookedMethod(param);
                    XposedBridge.log("you are been hooked"); 
                }

                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable { // hook之后
//                    super.afterHookedMethod(param);
                    param.setResult("hacked by tea"); //改变返回结果 
                }
            });
        }
    }
}
```




	新建app/assets文件夹
	新建xposed_init文件
	添加
	com.demo.android_hook.HookToast //修改成你的hook类

	然后打包测试

app/assets/xposed_init  

    com.demo.android_hook.HookToast


![最后效果]({{site.img_link}}/27/01.jpg)  

## LINKS

[Magisk框架，VirtualXposed框架，Xposed框架比较](https://blog.csdn.net/ZhangChengHai/article/details/82950334)  
[AlipayQRHook](https://github.com/wayu002/AlipayQRHook)  
[Xposed 模块免重启开发(借助VirtualXposed)](https://www.jianshu.com/p/938e8c4c00df)  
[【Xposed模块开发入门】真·第一课](https://www.52pojie.cn/thread-688466-1-1.html)  
[XPosed插件自动生成支付宝收款二维码](https://www.52pojie.cn/thread-821871-1-1.html)  
[Android支付宝蚂蚁森林能量自动收取插件开发原理解析](https://www.52pojie.cn/forum.php?mod=viewthread&tid=794312&extra=page%3D1%26filter%3Ddigest%26digest%3D1)  
[关于如何使用xposed来hook某支付软件](https://blog.csdn.net/ryan168/article/details/82462821)  
[Android逆向之旅---破解某支付软件防Xposed的hook功能检测机制过程分析](https://blog.csdn.net/jiangwei0910410003/article/details/80037971)  
[xposed检测原理分析 -案例某付宝、某音](https://blog.csdn.net/ly_xiamu/article/details/81940896)  
[Xposed 模块免重启开发(借助VirtualXposed)](https://www.jianshu.com/p/938e8c4c00df)  
[Android Hook框架Xposed详解：从源代码分析到开发指南](https://blog.csdn.net/zhangmiaoping23/article/details/53365780)  
[VirtualXposed](https://blog.csdn.net/zhangmiaoping23/article/details/80432276)  