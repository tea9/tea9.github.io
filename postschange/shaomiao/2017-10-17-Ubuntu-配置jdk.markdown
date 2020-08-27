---
layout:     post
title:      "Ubuntu-配置jdk"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-unix-linux.jpg"
tags:
    - "ubuntu"
---
1.首先从官网下载jdk
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

2.创建jdk目标路径
 sudo mkdir /usr/lib/jvm 

3.进入到下载jdk的目录 解压缩
 sudo tar -C /usr/lib/jvm -xzf jdk-7u55-linux-x64.tar.gz

4.查看本机上是否还有java可选。这里用到以下命令 
 sudo update-alternatives --list java
如果出现错误

5.配置环境变量命令：
 sudo gedit ~/.bashrc
添加以下代码：
export JAVA_HOME=/usr/lib/jvm/jdk1.7.0_55   
export JRE_HOME=${JAVA_HOME}/jre  
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib  
export PATH=${JAVA_HOME}/bin:$PATH

6.查看是否配置成功：
 java -version
