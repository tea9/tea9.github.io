---
title: activity组件导出实验
tags:
  - android
  - android安全
abbrlink: 2970212528
date: 2019-08-09 18:20:11
---

## 前言 

原因在于导出activity，任何软件都可以调用它，包括攻击者编写的软件，可能产生恶意调用，应用会产生拒绝服务等问题。  

遇到这样的问题，如果它们只被同一个软件中的代码调用，将activity属性改为android:exported=”false”，如果组件需要对外暴露，应该通过自定义权限限制对它的调用。  

## 如何启动其他app的activity

1.通过applicationId和activity名启动  
启动方代码：  

```
ComponentName component = new ComponentName("com.demo.homeapp", "com.demo.homeapp.TestActivity");
Intent intent = new Intent();
intent.setComponent(component);
startActivity(intent);
```

被启动方代码：

```
<activity android:name=".TestActivity" android:exported="true"/>
```

2.通过自定义action启动  

启动方代码：  

```
Intent intent = new Intent();
intent.setAction("com.demo.homeapp.test");
startActivity(intent);
```

被启动方代码：  

```
<activity android:name=".TestActivity">
    <intent-filter>
        <action android:name="com.demo.homeapp.test"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```

3.通过packageManager获取拥有对应软件包名(ApplicationId)的App的Launch活动。

启动方代码：  
```
Intent intent = getPackageManager().getLaunchIntentForPackage("com.demo.homeapp");
startActivity(intent);
```
4.通过<data/>设置可以响应的指定数据类型。 

```
android:scheme。指定数据的协议部分。

android:host。指定数据的主机部分。

android：port。指定数据的端口部分。

android：path。指定主机名和端口后的部分，即相对路径。

android:mimeType。指定可以处理的数据类型，允许使用通配符的方式进行指定。

一个activity可以响应多个android:scheme，当一条<data/>中同时存在host、port、path时，
数据的格式需要满足该条<data/>中指定的所有协定。<data/>属性指定的响应数据类型，在网页中也能得到响应例如：

<a href="tea://...">

```

启动方代码:  


    Intent intent = new Intent();
    intent=new Intent("com.demo.homeapp.test", Uri.parse("tea://hello"));
    startActivity(intent);



被启动方代码:  

    <activity android:name=".TestActivity" >
        <intent-filter>
            <action android:name="com.demo.homeapp.test"/>
            <category android:name="android.intent.category.DEFAULT"/>
            <data android:scheme="tea"/>
        </intent-filter>
    </activity>




## 如何解决恶意启动带来的问题  

### 主动设置android:exported="false"

```
<activity android:name=".TestActivity" android:exported="false">
    <intent-filter>
        <action android:name="com.demo.homeapp.test"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:scheme="tea"/>
    </intent-filter>
</activity>
```

通过其他应用在启动会提示Permission Denial  
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/32/1.png)  

### 设置权限

tips: startapp需要打包且不用相同签名测试。  

启动方代码不变，来改变被启动方的代码测试权限。  

#### 初始代码：  

启动方：   

```
startActivity(new Intent("com.demo.homeapp.test"));

```

被启动方：  

```
 <activity android:name=".TestActivity" >
    <intent-filter>
        <action android:name="com.demo.homeapp.test"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```

#### 没添加android:protectionLevel=的权限声明  

启动方代码  

```
<uses-permission android:name="com.demo.homeapp.StartPermission"/>

startActivity(new Intent("com.demo.homeapp.test"));
```

被启动方代码  

```
<permission android:name="com.demo.homeapp.StartPermission" android:label="startpermission" />

<activity android:name=".TestActivity" android:permission="com.demo.homeapp.StartPermission">
    <intent-filter>
        <action android:name="com.demo.homeapp.test"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```

可以正常启动  


#### 添加android:protectionLevel="normal"权限声明  

启动方代码  

```
<uses-permission android:name="com.demo.homeapp.StartPermission"/>

startActivity(new Intent("com.demo.homeapp.test"));
```

被启动方代码  
```
 <permission android:name="com.demo.homeapp.StartPermission" android:label="startpermission" android:protectionLevel="normal"/>

<activity android:name=".TestActivity" android:permission="com.demo.homeapp.StartPermission">
    <intent-filter>
        <action android:name="com.demo.homeapp.test"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```
可以正常启动 
打正式包也可以启动

#### 添加android:protectionLevel="signature"权限声明  

被启动方代码  
```
<permission android:name="com.demo.homeapp.StartPermission" android:label="startpermission" android:protectionLevel="signature" />
```

打正式包 同一个签名文件 可以正常启动  
打正式包 不同签名文件 不可以启动 报错`java.lang.SecurityException: Permission Denial: starting Intent { act=com.demo.homeapp.test cmp=com.demo.homeapp/.TestActivity } from ProcessRecord`  

#### 添加android:protectionLevel="signatureOrSystem"权限声明  

被启动方代码  
```
<permission android:name="com.demo.homeapp.StartPermission" android:label="startpermission" android:protectionLevel="signatureOrSystem" />
```
打正式包 同一个签名文件 可以正常启动  
打正式包 不同签名文件 不可以启动 报错`java.lang.SecurityException: Permission Denial: starting Intent { act=com.demo.homeapp.test cmp=com.demo.homeapp/.TestActivity } from ProcessRecord`  

---

权限解释：  

normal：这是最低风险的权限，如果应用声明了此权限，也不会提示安装应用的用户授权（例如，如果声明了定位权限，则应用到定位功能时，会明确提示用户，是否授予定位权限，但是protectionLevel为normal的不会明确提示，直接默认授予），系统直接默认该应用有此权限；  
dangerous：这种级别的权限风险更高，拥有此权限可能会访问用户私人数据或者控制设备，给用户带来负面影响，这种类型的权限一般不会默认授权（但是我测了好多次，有时候还是会默认授权）；  
signature：这种权限级别，只有当发请求的应用和接收此请求的应用使用同一签名文件，并且声明了该权限才会授权，并且是默认授权，不会提示用户授权  
signatureOrSystem：这种权限应该尽量避免使用，偏向系统级，同一签名或系统级  


## activity导出-拒绝服务

如果intent传入空的，类型错误的等数据，导致activity报错，就存在拒绝服务漏洞

[activity拒绝服务](https://tea9.xyz/post/2470166639.html#%E6%8B%92%E7%BB%9D%E6%9C%8D%E5%8A%A1)  

## activity导出-泄露数据

如跟其他配置不当组合从而发生泄漏数据风险。  
webview file控制不当加上activity组件导出就可以导致敏感数据泄露。  
[webview file域控制不严格读取内部私有文件](https://tea9.xyz/post/3957115657.html)  

## CODE

[start_activity](https://github.com/tea9/start_activity)   

## LINKS

[Android Intent的隐示启动（启动其他APP界面并传递数据）](https://www.jianshu.com/p/821b76a713fe) 
[Android中通过其他APP启动Activity的四种方式](https://blog.csdn.net/weixin_36570478/article/details/81324698)  
[Android:跨应用启动Activity](https://blog.csdn.net/qq_40740256/article/details/83625403)  
[给activity设置自定义权限](https://blog.csdn.net/JQ_AK47/article/details/52488365)  
[为ACTIVITY设置特定权限才能启动](https://www.cnblogs.com/prescheng/p/6113141.html)  
