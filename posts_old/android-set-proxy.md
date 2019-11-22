---
title: android设置代理app（要root的）
tags:
  - android
abbrlink: 449313118
date: 2019-08-09 18:56:54
---

## 前言

使用app给手机设置代理，查询代理功能，但是要root的。  

## 关键代码
原理就是通过adb命令设置代理，然后我打包成了一个app。  

```
private void setProxy() {
        String proxyStr = edit.getText().toString().trim();
        RootCmd.execRootCmdSilent("settings put global http_proxy "+proxyStr);
        Toast.makeText(this, "设置成功", Toast.LENGTH_SHORT).show();
    }
```

查询代理。  

```
private void refresh() {
        StringBuilder sb=new StringBuilder();
        Properties properties = System.getProperties();
        for (Map.Entry<Object, Object> property : properties.entrySet()) {
            Log.d(TAG, property.getKey() + "=" + property.getValue());
            sb.append(property.getKey() + "=" + property.getValue()+"\n");
        }

        // 仅读取代理host和post
        String x=System.getProperty("http.proxyHost"); // https.proxyHost
        String y=System.getProperty("http.proxyPort"); // https.proxyPort
        Log.e(TAG,x);
        Log.e(TAG,y);
        sb.append("http.proxyHost" + "=" + System.getProperty("http.proxyHost")+"\n");
        sb.append("http.proxyPort" + "=" + System.getProperty("http.proxyPort")+"\n");
        text.setText(sb.toString());
    }
```

## CODE
[android_test_proxy](https://github.com/tea9/android_test_proxy)  

## APK
![](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/31/1.jpg)  

[testproxy.apk](https://coding.net/u/tea9/p/image/git/raw/master/blog_img/31/testproxy.apk)  

## LINKS

[Android 设置网络代理](https://blog.csdn.net/lovecluo/article/details/83541189)  
[android代码执行adb shell终端命令（linux命令）并返回执行结果](https://blog.csdn.net/qq_27512671/article/details/78099015)  
