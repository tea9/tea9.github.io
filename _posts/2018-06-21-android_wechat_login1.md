---
layout: post
title: "android微信第三方登录1"
date: 2018-06-21
category: android
tags: android weixin login
---

[github测试地址](https://github.com/shaomiao/AndroidWechatTest)  
[微信SDK下载地址](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=11_1)  
[微信开放平台](https://open.weixin.qq.com/)  
[微信api](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417751808&token=dcf5c640a7da2e579f50e32e282eb1bc1f384c0b&lang=zh_CN)  

## 开始接入微信登录

1. 申请你的AppID  
注意：  

##### 包名正确（重要）

##### 签名正确（重要）

微信提供的签名生成工具  
把包名添加上去就可以获取签名  
注意：把要获取签名的应用安装在手机上  
[获取签名应用](https://res.wx.qq.com/open/zh_CN/htmledition/res/dev/download/sdk/Gen_Signature_Android2.apk)  

2. 下载开发工具包  
https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419319167&lang=zh_CN  

3. 在项目中引入开发包  
![在项目中引入开发工具包](http://upload-images.jianshu.io/upload_images/2590671-b6783667e961b04b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

4. 使用开发工具包  
下面代码都是在MainActivity中  
[1]注册微信  

<pre><code>
private static final String APP_ID="你的appid";
private IWXAPI api;
private void regToWx(){
    api= WXAPIFactory.createWXAPI(this,APP_ID,true);
    api.registerApp(APP_ID);
}
@Override
protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      //注册微信
      regToWx();
}
</code></pre>
	
	
	
    
[2]登录微信

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		//注册微信
		regToWx();
		findViewById(R.id.wechat_login).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				//登录微信
				final SendAuth.Req req = new SendAuth.Req();
				req.scope = "snsapi_userinfo";
				req.state = "wechat_sdk_demo_test";
				api.sendReq(req);
			}
		});
	}
5.下面是最重要的一步。。。。  
[1]建包  
注意：要在你的包名下新建 wxapi 包  
你的包名.wxapi  

![你的包名.wxapi](http://upload-images.jianshu.io/upload_images/2590671-972bd98cefcbe360.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


[2]建立与微信通讯的activity  
在wxapi下新建activity  
WXEntryActivity  
[3]在AndroidManifest.xml中添加权限.   

	<uses-permission android:name="android.permission.INTERNET"/> 
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/> 
	<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/> 
	<uses-permission android:name="android.permission.READ_PHONE_STATE"/> 
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
[4]在AndroidManifest.xml中添加activity注册.   

	<activity android:name=".wxapi.WXEntryActivity"
		android:label="@string/app_name"
		android:exported="true"
		android:launchMode="singleTop"
		>
	</activity>

[5]在WXEntryActivity中继承Activity并实现IWXAPIEventHandler接口.   

![实现IWXAPIEventHandler接口](http://upload-images.jianshu.io/upload_images/2590671-4a894506b8235e85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
重写onCreate方法  
在onCreate中需要重新注册一下微信  
要不微信不执行回掉  
![重写onCreate方法](http://upload-images.jianshu.io/upload_images/2590671-bb5ff100cf328000.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



实现onReq和onResp方法  
[使用okhttp获取微信的openid和用户信息]  
(http://www.jianshu.com/p/c92e1134448d)

在onResp中可以获取code  
 通过code参数加上AppID和AppSecret等，通过API换取access_token；  
 通过access_token进行接口调用，获取用户基本数据资源或帮助用户实现基本操作。  
[详情请参照]  
(https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317851&token=dcf5c640a7da2e579f50e32e282eb1bc1f384c0b&lang=zh_CN)


![onReq和onResp方法](http://upload-images.jianshu.io/upload_images/2590671-8052581cdb699373.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
