---
layout: post
title: "树莓派笔记"
date: 2018-10-23
category: 树莓派 
tags: 树莓派
---

## 更新系统&关机&重启

	sudo apt-get update && sudo apt-get upgrade

关机  

	sudo shutdown -h now
	sudo halt
	sudo poweroff
	sudo init 0

重启  

	sudo reboot
	shutdown -r now
	shutdown -r 18:23:52 #定时重启在18点23分52秒关闭

## 树莓派固定ip

	vi /etc/dhcpcd.conf

添加配置项  
	
	interface eth0 # 指定接口 eth0
	
	static ip_address=192.168.1.20/24 # 指定静态IP，/24表示子网掩码为 255.255.255.0
	
	static routers=192.168.1.1 # 路由器/网关IP地址
	
	static domain_name_servers=114.114.114.114 # 手动自定义DNS服务器

保存之后重启  

	sudo reboot

**另外注意配置时，你的静态IP一定要和你的路由器网段一致**。


## 树莓派SSH连接
默认账号：pi   密码：raspberry  

	ssh root@172.26.4.214

	ssh pi@172.26.4.214



## 树莓派VNC（远程连接）
开启VNC  
	
	sudo raspi-config

![vnc]({{site.img_link}}/22/01.png) 
![vnc]({{site.img_link}}/22/02.png) 


win：
下载vnc连接软件
[链接:](https://pan.baidu.com/s/10A0iSWmXUJedNLfbist8ug)  
密码:vzxy

输入ip密码连接


## 树莓派连接 xrdp

树莓派：  

	sudo apt-get install xrdp

win：
WIN+R - mstsc
输入ip密码连接


## 树莓派连接摄像头

配置  

![vnc]({{site.img_link}}/22/03.png) 
![vnc]({{site.img_link}}/22/04.png) 

拍摄照片  

	raspistill -o cam.jpg

拍摄视频  

	raspivid -o vid.h264


python3  
camera.py  

	from picamera import PiCamerafrom time import sleep 
	camera = PiCamera()
	camera.start_preview()
	sleep(10)
	camera.stop_preview()


拍摄照片

	camera.start_preview()
	sleep(5) 
	camera.capture('/home/pi/Desktop/image.jpg') 
	camera.stop_preview()

录制视频  

	camera.start_preview() 
	camera.start_recording('/home/pi/video.h264') 
	sleep(10)
	camera.stop_recording()
	camera.stop_preview()



	vcgencmd get_camera
	vim /boot/config.txt

	start_x=1
	gpu_mem=256

[树莓派摄像头](https://pan.baidu.com/s/1wafsFY7_8iuQZm0QX4QJug)  
密码:6pig

## 树莓派wiki系统

[docker安装](http://www.runoob.com/docker/ubuntu-docker-install.html)  
[wiki.js](https://github.com/Requarks/wiki)  

config and docker
TTTTTTTTTTTTTT
wikijs

docker-compose  

	sudo pip install docker-compose
	pip install request



## LINKS

[资源下载](http://shumeipai.nxez.com/download)  
[使用VNC远程登陆树莓派](https://blog.csdn.net/u012952807/article/details/70225700)  
[树莓派手动指定静态IP和DNS 终极解决大法](https://blog.csdn.net/u013178472/article/details/78574878)  
[Multi-Cam Module Error](https://raspberrypi.stackexchange.com/questions/51322/multi-cam-module-error)  
[用wiki.js搭建自己的wiki知识库](https://blog.csdn.net/michael_llh/article/details/80210951)  

[[经验] 用树莓派2控制一个LED灯](http://bbs.elecfans.com/jishu_542880_1_1.html)  
[树莓派GPIO最入门教程：先从控制一个LED小灯开始](https://www.jianshu.com/p/27104b0c5da1)  

[树莓派 Learning 003 --- GPIO 001 --- 点亮LED](https://blog.csdn.net/github_35160620/article/details/52140967)  

[引脚图](https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%A0%91%E8%8E%93%E6%B4%BE%E9%92%88%E8%84%9A%E5%9B%BE&hs=2&pn=5&spn=0&di=9211195430&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2469181244%2C1318570245&os=2596068280%2C2211848993&simid=1258434643%2C4156524171&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=11&oriquery=%E6%A0%91%E8%8E%93%E6%B4%BE%E9%92%88%E8%84%9A%E5%9B%BE&objurl=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F80704-7a5b8c35888d93b8.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B3twgfi7_z%26e3Bv54AzdH3FrAzdH3Fuv00v8vukkw1&gsm=0&islist=&querylist=)  

[树莓派 3 + L298N模块 驱动直流电机](https://www.jianshu.com/p/775b4fb2c98d)  

[树莓派3 GPIO 介绍及 RPi.GPIO 库的使用](https://www.jianshu.com/p/1db0b3e4fd56)  

[Sunny的树莓派小车DIY教程（附视频）](http://shumeipai.nxez.com/2015/11/08/raspberry-pi-car-diy-tutorials-by-sunny.html)  


