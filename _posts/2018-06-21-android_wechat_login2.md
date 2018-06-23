---
layout: post
title: "android微信第三方登录2"
date: 2018-06-21
category: android
tags: android weixin
---


利用http与微信通信换取用户信息和openid  
使用了okhttp作为http通信的框架  

------------------------------------
1. 首先实例化okhttp连接  

	`private final OkHttpClient client = new OkHttpClient();`


###### 获得code

	case BaseResp.ErrCode.ERR_OK:
	//      可用以下两种方法获得code
	//      resp.toBundle(bundle);
	//      Resp sp = new Resp(bundle);
	//      String code = sp.code;
	//      或者
	String code = ((SendAuth.Resp) baseResp).code;
	String state = ((SendAuth.Resp) baseResp).state;
	Toast.makeText(getApplicationContext(), "恭喜这是你的code" + code, Toast.LENGTH_LONG).show();
	Log.e(TAG, "onResp: " + code);
	try {
		getAccess_token(code);
	} catch (Exception e) {
		e.printStackTrace();
	}
	//上面的code就是接入指南里要拿到的code
	break;

-------------------------------------------
###### 根据code获取用户信息

	private void getAccess_token(String code) throws Exception {
		String url = "https://api.weixin.qq.com/sns/oauth2/access_token?" +
				"appid=" + ConfigUtil.Wechat_Appid +
				"&secret=" + ConfigUtil.Wechat_AppSecret +
				"&code=" + code +
				"&grant_type=authorization_code";
		run(url);
	}

-----------------------------------------
###### 引入okhttp包

![引入okhttp的包](http://upload-images.jianshu.io/upload_images/2590671-e535b2d91c6473b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


	//通过http与微信通信
    public void run(String url) throws Exception {
	final Request request = new Request.Builder()
			//.url("http://publicobject.com/helloworld.txt")
			.url(url)
			.get()
			.build();

	client.newCall(request).enqueue(new Callback() {
		@Override
		public void onFailure(Call call, IOException e) {
			e.printStackTrace();
		}

		@Override
		public void onResponse(Call call, Response response) throws IOException {
			if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
			try {
				String responseStr=response.body().string();
				JSONObject jsonObject = new JSONObject(responseStr);
				System.out.println(TAG + jsonObject.getString("access_token"));//在回调中获取access_token
			} catch (JSONException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}


		}
	});
	}

##### 注意：
如果微信调不起来  
仔细检查签名是否正确  
如果修改过签名  
可以重新安装下微信再试一下  