---
layout: page
title: 赞赏列表
description: Appreciate
keywords: tea9
comments: true
menu: About
permalink: /appreciate/
header-img: 
---

# 感谢各位老板打赏

<style >
  .wechat img,.alipay img{
	width: 200px;
  	height: 200px;
  	display:inline;
  	vertical-align:middle;
  	margin-right: 40px;
  	/*float:right;*/
  }
  .wechat {
  	float: left;
  	/*margin-right: 20px;*/
  	padding-right: 20px;

  }
  
  table {
  	clear: both;
  }
</style>

{% if site.reward.enable %}
{% if site.reward.wechatpay %}
<div class="wechat" >
  <img class="wechat_qr" src="{{ site.reward.wechatpay }}" title="用微信请{{ site.author }}喝杯咖啡？" alt="用微信请{{ site.author }}喝杯咖啡？" />
  <p>微信支付</p>
</div>
{% endif %}

{% if site.reward.alipay %}
<div class="alipay" >
  <img class="alipay_qr" src="{{ site.reward.alipay }}" title="用支付宝请{{ site.author }}喝杯咖啡？" alt="用支付宝请{{ site.author }}喝杯咖啡？" />
  <p>支付宝</p>
</div>
{% endif %}

{% endif %}

<div class="bio">
    <p><a href="{{ site.message_link }}">打赏完了，不留个名吗？</a></p>
</div>

## 赞赏列表


 名字 | 金额 | 途径 | 时间 
-----|-----|-------
Miracles | 6.66| 微信支付 | 2018-09-06
N*e | 1.11| 微信支付 | 2018-09-08
*下 | 3| 微信支付 | 2018-11-05
*石 | 1.5| 微信支付 | 2018-11-19

