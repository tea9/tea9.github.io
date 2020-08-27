title: android drozer
abbrlink: 1688426988
category:
  - android安全
tags:
  - android安全
date: 2019-04-11 13:38:47
---
## 介绍
> dorzer是一个android开源安全测试工具

## 安装

[drozer官网](https://labs.mwrinfosecurity.com/tools/drozer)  
[drozer github](https://github.com/mwrlabs/drozer)  
[drozer.whl](https://github.com/mwrlabs/drozer/releases)  
客户端[Agent.apk](https://github.com/mwrlabs/drozer/releases/download/2.3.4/drozer-agent-2.3.4.apk)  
测试包[sieve.apk](https://github.com/mwrlabs/drozer/releases/download/2.3.4/sieve.apk)  
[官方使用文档](https://labs.mwrinfosecurity.com/assets/BlogFiles/mwri-drozer-user-guide-2015-03-23.pdf)  


```
sudo pip install dist/drozer-2.x.x-py2-none-any.whl

adb install drozer-agent-2.x.x.apk

drozer-agent Enabled

adb forward tcp:31415 tcp:31415
drozer console connect
```
---

**基础信息获取**
```
run app.package.list -f sieve

run app.package.info -a com.xx.xx
```

**确定攻击面**

```
run app.package.attacksurface com.xx.xx
```

**Activity**
```
run app.activity.info -a com.xx.xx
```

**手机获得root权限**  

```
adb install drozer-agent-2.3.4.apk
adb install sieve.apk

1.adb forward tcp:31415 tcp:31415
2.Agent.apk 打开Embedded Server Enabled
3.drozer console connect

➜  Downloads drozer console connect         
Selecting 8f498d40e02d7b23 (Xiaomi MI 4W 6.0.1)

            ..                    ..:.
           ..o..                  .r..
            ..a..  . ....... .  ..nd
              ro..idsnemesisand..pr
              .otectorandroidsneme.
           .,sisandprotectorandroids+.
         ..nemesisandprotectorandroidsn:.
        .emesisandprotectorandroidsnemes..
      ..isandp,..,rotectorandro,..,idsnem.
      .isisandp..rotectorandroid..snemisis.
      ,andprotectorandroidsnemisisandprotec.
     .torandroidsnemesisandprotectorandroid.
     .snemisisandprotectorandroidsnemesisan:
     .dprotectorandroidsnemesisandprotector.

drozer Console (v2.4.4)
dz> 

```
## 使用

```
dz> run app.package.list #设备中已安装的包
dz> run app.package.list -f sieve #关键字查找包名
com.mwr.example.sieve (Sieve)

dz> run app.package.info --help 

dz> run app.package.info --package [包名]

dz> run app.package.info -a com.mwr.example.sieve #查看包信息
Package: com.mwr.example.sieve
  Application Label: Sieve
  Process Name: com.mwr.example.sieve
  Version: 1.0
  Data Directory: /data/user/0/com.mwr.example.sieve
  APK Path: /data/app/com.mwr.example.sieve-1/base.apk
  UID: 10152
  GID: [3003]
  Shared Libraries: null
  Shared User ID: null
  Uses Permissions:
  - android.permission.READ_EXTERNAL_STORAGE
  - android.permission.WRITE_EXTERNAL_STORAGE
  - android.permission.INTERNET
  Defines Permissions:
  - com.mwr.example.sieve.READ_KEYS
  - com.mwr.example.sieve.WRITE_KEYS
  
Application Label 显示app的名称
Process Name 显示运行该app的进程名称
Version 所安装的app的版本
Data Directory 用来存储用户数据以及明确与该app关联的应用程序目录完整路径
APK Path 设备中app真正的package文件所在的路径
UID 与该app关联的用户ID 
GID 与该app的用户ID相关联的系统group id
Shared Libraries 该app使用的共享库的完整路径
Shared User ID 可以使用该app的共享用户的ID
Use Permissions app的权限列表

# 根据包的权限寻找包
dz> run app.package.info -p [权限标识]
dz> run app.package.info -p android.permission.INTERNET

# 列出导出的activity
dz> run app.activity.info

# 根据名称搜索activity
dz> run app.activity.info --filter [activity名]
dz> run app.activity.info --filter facebook
dz> run app.activity.info --f facebook

# 搜索指定包中的activity
dz> run app.activity.info --package [package名]
dz> run app.activity.info -a [package名]
dz> run app.activity.info -a com.android.phone

# 枚举content provider
dz> run app.provider.info
dz> run app.provider.info -a [包名] #包名称进行搜索
dz> run app.provider.info -p [权限标识] # 权限进行搜索

# 枚举service
dz> run app.service.info --package [包名]
dz> run app.service.info -p [权限标识]

# 根据service名进行搜索
dz> run app.service.info -f [过滤字符串]
dz> run app.service.info -filter [过滤字符串]

# 列出未导出的service
dz> run app.service.info -u
dz> run app.service.info --unexported
dz> run app.service.info --help

# 攻击点
run app.package.attacksurface xx.xx.xx

# 启动activity
run app.activity.start --component xx.xx.xx xx.xx.Activity
```


## LINKS

[Drozer 安装和使用 (Mac)](https://www.jianshu.com/p/168cdd3daa1d)  
[Drozer安装(Mac系统)和使用](https://www.jianshu.com/p/65fc2d52c7b1)  
[利用drozer进行Android渗透测试](https://www.cnblogs.com/goodhacker/p/3906180.html)  
[Drozer模块命令大全（一）](https://blog.csdn.net/cch139745/article/details/53519900)  
[Drozer模块命令大全（二）](https://blog.csdn.net/cch139745/article/details/53691123)  
[Android安全测试框架Drozer（使用篇）](https://www.jianshu.com/p/dfa92bab3a55)  
[利用drozer进行Android渗透测试](http://www.blogjava.net/qileilove/archive/2015/03/18/423597.html)  