---
layout: post
title: "android xposed"
date: 2019-01-21
category: android逆向
tags: android逆向 xposed
---

## virtual Xposed
[virtual Xposed下载链接: ](https://pan.baidu.com/s/1GHoOGm7DuBtkL9AgsaJvNA)
提取码: kyrd    

## 编写Xposed模块

1. xposed依赖
[xposed](https://jcenter.bintray.com/de/robv/android/xposed/api/)  

build.gradle中添加  

```
compileOnly 'de.robv.android.xposed:api:82'
compileOnly 'de.robv.android.xposed:api:82:sources'
```

2. AndroidManifest.xml添加Xposed模块



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



3. 新建个项目为被hook

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

4. 编写hook类 

```
public class HookToast implements IXposedHookLoadPackage {
    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        if (lpparam.packageName.equals("com.demo.myapplication")){
            Class clazz = lpparam.classLoader.loadClass("com.demo.myapplication.MainActivity");
            XposedHelpers.findAndHookMethod(clazz, "toastMessage", new XC_MethodHook() {
                @Override
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
//                    super.beforeHookedMethod(param);
                    XposedBridge.log("you are been hooked");
                }

                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
//                    super.afterHookedMethod(param);
                    param.setResult("hacked by tea");
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

![最后效果]({{site.img_link}}/27/01.jpg)  

## LINKS

[AlipayQRHook](https://github.com/wayu002/AlipayQRHook)  
[【Xposed模块开发入门】真·第一课](https://www.52pojie.cn/thread-688466-1-1.html)  
[XPosed插件自动生成支付宝收款二维码](https://www.52pojie.cn/thread-821871-1-1.html)  
[Android支付宝蚂蚁森林能量自动收取插件开发原理解析](https://www.52pojie.cn/forum.php?mod=viewthread&tid=794312&extra=page%3D1%26filter%3Ddigest%26digest%3D1)  
[关于如何使用xposed来hook某支付软件](https://blog.csdn.net/ryan168/article/details/82462821)  
[Android逆向之旅---破解某支付软件防Xposed的hook功能检测机制过程分析](https://blog.csdn.net/jiangwei0910410003/article/details/80037971)  
[xposed检测原理分析 -案例某付宝、某音](https://blog.csdn.net/ly_xiamu/article/details/81940896)  
[Xposed 模块免重启开发(借助VirtualXposed)](https://www.jianshu.com/p/938e8c4c00df)  
[Android Hook框架Xposed详解：从源代码分析到开发指南](https://blog.csdn.net/zhangmiaoping23/article/details/53365780)  
[VirtualXposed](https://blog.csdn.net/zhangmiaoping23/article/details/80432276)  