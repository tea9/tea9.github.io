---
title: android_app_渗透测试方法大全笔记
tags:
  - android安全
abbrlink: 3031031354
date: 2019-08-30 14:43:01
---

## 客户端程序安全测试

### 数字签名检测
```
jarsigner -verify APK -verbose -certs
```
1.jar已验证  
2.CN及其他字段是否正确标识客户端来源和发布者身份

### 反编译检测

```
dex2jar classes.dex 文件路径
```

jd-gui打开生成的jar文件

1.是否混淆
2.是否加固

#### 反编译为smali代码

```
apktool d APK 文件路径
```

忽略资源文件 加入-r   

```
apktool d -r APK 文件路径
```

只反编译资源文件加入-s选项，不对dex进行反编译  
```
apktool d -s APK 文件路径
```
#### 处理odex文件