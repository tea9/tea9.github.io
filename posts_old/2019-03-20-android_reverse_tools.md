layout: post
title: android逆向工具/命令
category:
  - android安全
tags:
  - android安全
  - android逆向
abbrlink: 1200045731
date: 2019-03-20 00:00:00
---
## 工具
#### sdkmanager
```
$sdkmanager --list # 查看已经安装的及可安装的SDK包

$sdkmanager emulator # 下载安装模拟器

$sdkmanager platform-tools # 下载安装工具 adb fastboot

$sdkmanager --update # 更新所有可更新的包

# 以android7.1开发为例，执行如下命令

$sdkmanager build-tools;25.0.3
$sdkmanager docs
$sdkmanager platforms;android-25
$sdkmanager sources;android-25
```
#### emulator

```
$emulator -version
```

#### adb 
```
$adb version
```

#### ndk

```
$sdkmanager ndk-bundle # 下载安装ndk

# 使用CMake构建 使用LLDB进行调试
$sdkmanager cmake;3.6.3155560
$sdkmanager lldb;2.3

$ndk-build -v

```

#### javac
```
$javac -source 1.7 -target 1.7 Hello.java # 编译java源文件
```

#### dx
```
$dx --dex --output=Hello.dex Hello.class #生成dex文件
```

#### javap
```
$javap -c -classpath . Hello #使用javap反编译Hello.class 查看 java字节码
```
#### dexdump
```
$dexdump -d Hello.dex #查看Dalvik字节码
```

#### baksmali
```
$baksmali -o baksmaliout Hello.dex # 使用baksmali生成smali反汇编文件
```

#### smali
```
$smali -o HelloWorld.dex HelloWorld.smali #编译smali文件

#运行dex
$adb push HelloWorld.dex /sdcard/
$adb shell dalvikvm -cp /sdcard/HelloWorld.dex HelloWorld
HelloWorld
```


#### apktool
[apktool](https://bitbucket.org/iBotPeaches/apktool/downloads/)  
[ShakaApktool](https://github.com/rover12421/ShakaApktool)  

apk反编译与回编译工具  
```
# 反编译
java -jar apktool.jar d -f <xx.apk> -o <XX>
java -jar apktool_2.3.3.jar d -f xx.apk -o XX


java -jar apktool.jar -r -f d xx.apk -o xx #-r忽略资源文件-f强制删除现有文件夹

apktool 参数
-f 如果目标文件夹已存在，则强制删除现有文件夹（默认如果目标文件夹已存在，则解码失败）。
-o 指定解码目标文件夹的名称（默认使用APK文件的名字来命名目标文件夹）。
-s 不反编译dex文件，也就是说classes.dex文件会被保留（默认会将dex文件解码成smali文件）。
-r 不反编译资源文件，也就是说resources.arsc文件会被保留（默认会将resources.arsc解码成具体的资源文件）。

#回编译
java -jar apktool.jar b XX 
```


#### signapk

[signapk](https://github.com/as0ler/Android-Tools/tree/master/Autosign/Auto-Sign)  
```
java -jar signapk.jar testkey.x509.pem testkey.pk8 xx.apk test_signed.apk
```


#### smali/baksmali

[smali/baksmali](https://bitbucket.org/JesusFreke/smali/downloads/)  
dex文件的反编译与回编译工具


#### dex2jar

[dex2jar](https://sourceforge.net/projects/dex2jar/files/)  
将dex转换为jar包工具
```
1.把apk的后缀名修改成.zip
2.解压
3.获取classes.dex(有的时候会有多个classes.dex)
4.把classes.dex 文件放到 dex2jar 文件夹内

命令：

d2j-dex2jar classes.dex // 会生成classes-dex2jar.jar

mac:
sh d2j-dex2jar.sh classes.dex
```

---

使用dex2jar会提示没有权限  
> d2j-dex2jar.sh: line 36: ./d2j_invoke.sh: Permission denied  

使用命令把dex2jar提升下权限就可以了  

	sudo chmod -R 777 dex2jar-2.0

#### jd-gui

[jd-gui](http://java-decompiler.github.io/)  
查看jar包的java代码  
`使用jd-gui打开classes-dex2jar.jar就可以看到源代码了`

#### jadx

[jadx](https://github.com/skylot/jadx/releases/tag/v0.7.1)  
可直接反编译apk或dex

#### 010Editor

[010 Editor](http://www.sweetscape.com/010editor/)  
跨平台的二进制编辑器

#### DDMS

```
adb 连接设备管理
adb connect 127.0.0.1:62001 //连接夜神模拟器
```

#### JEB

[jeb](https://www.pnfsoftware.com/)  

跨平台Android静态分析工具

#### IDA Pro

静态反编译软件  

#### BytecodeViewer
ava反编译器，Java字节码编辑器，APK编辑器，Dex编辑器，APK反编译器，DEX反编译器,Hex查看器，代码搜索器和代码调试器。
[BytecodeViewer](https://github.com/Konloch/bytecode-viewer/releases)  
`java -jar Bytecode-Viewer-2.9.11.jar `  

#### ZjDroid 

基于Xposed的一款脱壳神器ZjDroid工具  

[ZjDroid github](https://github.com/halfkiss/ZjDroid)  

#### Androguard

跨平台恶意软件分析套件p175  

[Androguard](https://github.com/androiguard/androguard)

#### MobSF

同时支持Android、ios、Windows 平台上的软件分析，同时支持静态分析、动态分析及Web API测试  

[MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)  

## 集成工具

macos
[Android-Crack-Tool](https://github.com/Jermic/Android-Crack-Tool)

windows
[Android Killer](http://www.pd521.com)

## 常用linux shell命令

```

$ls /xx #列出文件目录

$cat ./build.gradle #在终端输入文件内容

$grep -r "hello" ./ #grep命令用于搜索匹配文本内容

$grep -r "hello" ./ -A 10 # 查看前10条

$grep -r "hello" ./ | grep "world" # 同时包含 hello world字符串的文件并列出

$mkdir -p foo/bar #创建文件夹 -p多级目录

$unzip -d /temp xx.zip #解压文件
$unzip -l xx.zip #查看包含文件

$file android.jar #查看文件格式及内容
```

## 相关链接

[Android 反编译神器jadx的使用](https://blog.csdn.net/Fisher_3/article/details/78654450)  
[Smalidea+IntelliJ IDEA/Android Studio动态调试安卓app教程](https://blog.csdn.net/linchaolong/article/details/51146492)  
[ZjDroid工具介绍及脱壳详细示例](https://www.cnblogs.com/goodhacker/p/3961045.html)  
[Android中Xposed框架篇---基于Xposed的一款脱壳神器ZjDroid工具原理解析](https://blog.csdn.net/jiangwei0910410003/article/details/52840602)