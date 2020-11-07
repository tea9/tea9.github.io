---
title: mac的jdk版本切换
abbrlink: 3423508845
date: 2019-10-28 16:58:59
tags:
	- android
	- jdk
---

1.下载jdk并安装  

[jdk](https://www.oracle.com/technetwork/java/javase/downloads/index.html)  

2.   

```
vim ~/.bash_profile

添加
export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home
export JAVA_HOME=$JAVA_8_HOME
alias jdk7="export JAVA_HOME=$JAVA_7_HOME"
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_191.jdk/Contents/Home/ 

source ~/.bash_profile
```

3.  

```
jdk8
source ~/.bash_profile
java -version
echo $JAVA_HOME
```
---

```
brew install jenv
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile
jenv versions
jenv add /Library/Java/JavaVirtualMachines/jdk1.7.0_71.jdk/Contents/Home/
jenv versions
jenv remove 1.6
jenv local 1.8.0.25
java -version
jenv which java 完整路径
```

## LINKS

[Mac上使用Jenv管理多个JDK版本](https://www.jianshu.com/p/21f9ae99e88b). 
