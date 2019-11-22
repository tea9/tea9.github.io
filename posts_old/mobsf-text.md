---
title: mobsf记录
tags:
  - android 安全
abbrlink: 1045569623
date: 2019-08-28 15:59:44
---

## 环境

python3.6  
JDK1.8  

[MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF)  


## 安装

[下载](https://github.com/MobSF/Mobile-Security-Framework-MobSF/releases)  

/Users/name/mobsf  

[文档](https://github.com/MobSF/Mobile-Security-Framework-MobSF/wiki/1.-Documentation)  

**安装wkhtmltopdf**
[wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)  

```
cd Mobile-Security-Framework-MobSF
./setup.sh
./run.sh
http://localhost:8000/
```

---

```
git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git
cd Mobile-Security-Framework-MobSF
```

**安装依赖**  
```
python -m pip install -r requirements.txt --user
```

**运行mobsf**
```
python manage.py runserver

```
浏览器访问localhost:8000  

## LINKS
[MobSF配置-Mac版](https://www.jianshu.com/p/6569c0dbee73)  
[MobSF配置-Windows版](https://www.jianshu.com/p/4ba4312985ee?utm_campaign)  
[移动安全测试框架MobSF(二)：动态分析](https://blog.csdn.net/u013107656/article/details/53995545)  