---
layout:     post
title:      "android-中okhttp-传递json数据"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
参考地址 http://blog.csdn.net/lmj623565791/article/details/47911083
client  基础配置

	public final static int CONNECT_TIMEOUT = 60;
	public final static int READ_TIMEOUT = 100;
	public final static int WRITE_TIMEOUT = 60;
	public static final OkHttpClient client = new OkHttpClient.Builder()
			.readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)//设置读取超时时间
			.writeTimeout(WRITE_TIMEOUT, TimeUnit.SECONDS)//设置写的超时时间
			.connectTimeout(CONNECT_TIMEOUT, TimeUnit.SECONDS)//设置连接超时时间
			.build();


get方法  
参数：
     url get请求地址 

    	public String get(String url) throws IOException {
		Request request = new Request.Builder().url(url).get().build();
		Response response = client.newCall(request).execute();
		if (response.isSuccessful()) {
			return response.body().string();
		} else {
			throw new IOException("Unexpected code " + response);
		}
	}


post方法  
参数：
    url  post请求地址
    json  json字符串


	public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

	public static String post(String url, String json) throws IOException {
		RequestBody body = RequestBody.create(JSON, json);
		Request request = new Request.Builder()
				.url(url)
				.post(body)
				.build();
		Response response = client.newCall(request).execute();
		if (response.isSuccessful()) {
			return response.body().string();
		} else {
			throw new IOException("Unexpected code " + response);
		}
	}


调用：

	new Thread() {
		@Override
		public void run() {
			//传的json
			JSONObject jsonObject = new JSONObject();
			try {
				String callStr = OKHttpTool.post(HttpUrl.API_ACTIVE, jsonObject.toString());
				JSONObject call_json = new JSONObject(callStr);
				final String msg = call_json.getString("msg");
				if (call_json.getInt("status") == 1){
					//在子线程中调用ui线程
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							Toast.makeText(ActivationCardActivity.this, msg, Toast.LENGTH_SHORT).show();
							finish();
						}
					});
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
	}.start();
