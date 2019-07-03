---
layout:     post
title:      "java-web-接收json串"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/home-bg-art.jpg"
tags:
    - "java"
---
![json](http://upload-images.jianshu.io/upload_images/2590671-827e6b185d2ae379.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



	// json测试 接收一个json串
	StringBuffer sb = new StringBuffer();
	BufferedReader br = new BufferedReader(
			new InputStreamReader((ServletInputStream) request.getInputStream(), "utf-8"));
	String temp;
	while ((temp = br.readLine()) != null) {
		sb.append(temp);
	}
	br.close();
	System.out.println(sb.toString());




	// 返回json数据
	response.setContentType("application/x-javascript; charset=utf-8");  
	PrintWriter pw = response.getWriter();  
	JsonObject jsonObject = new JsonObject();
	jsonObject.addProperty("name", "aaa");
	System.out.println(jsonObject.toString());
	pw.write(jsonObject.toString());  
	pw.flush();  
	pw.close();
