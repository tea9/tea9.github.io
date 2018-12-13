---
layout: post
title: "arduino小车笔记"
date: 2018-12-03
category: arduino
tags: arduino
---

	模块 L298n arduino 
	拼装焊接
	代码 

	马达焊接导线

	uno 5v L298n 5v
	uno gnd l298n gnd

	电池 红线 连开关  l298n 12v+

	电池 黑线 l298n gnd

	马达线 l2980 out1 out2 out3 out4 

	l298n 4个引脚 1234 连 uno 1267

## 代码

	void setup()
	{
	  pinMode( 1 , OUTPUT);
	  pinMode( 2 , OUTPUT);
	  pinMode( 6 , OUTPUT);
	  pinMode( 7 , OUTPUT);
	}

	void loop()
	{
	  digitalWrite( 1 , HIGH );
	  digitalWrite( 2 , LOW );
	  digitalWrite( 6 , HIGH );
	  digitalWrite( 7 , LOW );
	}

## 前言

[Arduino Uno简介](https://baijiahao.baidu.com/s?id=1587399157305419173&wfr=spider&for=pc)  

## IMG
![]({{site.img_link}}/26/01.png)
![]({{site.img_link}}/26/02.png)

## L298N

![]({{site.img_link}}/26/03.png)
![]({{site.img_link}}/26/04.png)

## ESP8266

## ESP8266WIFI

## 蓝牙模块(HC-05)

[arduino蓝牙模块控制教程](https://jingyan.baidu.com/article/d45ad148b252a969552b80db.html)  

## LINKS

[使用Arduino与L298N(红板) 驱动直流电机](https://blog.csdn.net/ling3ye/article/details/51351115)  
[XTWduino UNO R3 开发板 改进版 行家版本 Arduino](http://b2b.liebiao.com/dianziyuanqijian/305205570.html)  
[[官方公告] blinker快速接入指南](https://www.arduino.cn/thread-76018-1-1.html)  
[Arduino UNO中文数据手册](https://www.arduino.cn/thread-81889-1-1.html)  
[arduino社区](https://www.arduino.cn/)  
[【开源硬件】智能小车学习教程](https://www.bilibili.com/video/av13906282?p=13)  
[Arduino智能小车——测试篇](https://blog.csdn.net/qq_16775293/article/list/3)  
[Arduino小车诞生记](https://www.guokr.com/article/252083/)  

[Arduino+ESP8266WIFI（1）——模块测试](https://blog.csdn.net/wuyanmin1995/article/details/74352155)  