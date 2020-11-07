---
layout:     post
title:      "安卓代码段--跳转activity通过intent穿参数"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
tags:
    - "安卓代码段"
---

findViewById(R.id.image).setOnClickListener(new View.OnClickListener(){
	@Override
	public void onClick(View v) {
		Intent intent=new Intent(MainActivity.this,TestAcitvity.class);
                //通过putExtra传递参数
		intent.putExtra("data","hello word");
		startActivity(intent);
	}
});

-------------------------------------------

Intent i=getIntent();
//通过getStringExtra接收string类型参数
String data= i.getStringExtra("data");
