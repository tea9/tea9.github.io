---
title: android aapt查看应用包名
tags:
  - android安全
abbrlink: 994062500
date: 2019-07-17 17:04:21
---
## 查看应用包名
```
aapt dump badging xx.apk 

package: name='com.xx.www' versionCode='1' versionName='1.0'
sdkVersion:'15'
targetSdkVersion:'19'
uses-permission:'android.permission.INTERNET'
uses-permission:'android.permission.READ_EXTERNAL_STORAGE'
uses-permission:'android.permission.WRITE_EXTERNAL_STORAGE'
uses-permission:'android.permission.ACCESS_NETWORK_STATE'
uses-permission:'android.permission.READ_PHONE_STATE'
uses-permission:'android.permission.ACCESS_WIFI_STATE'
uses-permission:'android.permission.READ_LOGS'
application-label:'LoginDemo'
application-label-en:'LoginDemo'
application-label-in:'LoginDemo'
application-label-zh_HK:'LoginDemo'
application-label-zh_MO:'LoginDemo'
application-label-ja_JP:'LoginDemo'
application-label-zh_TW:'LoginDemo'

```
