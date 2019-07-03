---
layout:     post
title:      "git通过命令本地代码上传github"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-alitrip.jpg"
tags:
    - "git"
---
在github上建立远程仓库


![new](http://upload-images.jianshu.io/upload_images/2590671-3c5e7b7fdca9a1b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![20160829153253.png](http://upload-images.jianshu.io/upload_images/2590671-d16f18097e411c50.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



打开Git Bash  ---- cd到本地项目 目录 
git init  ----建立git仓库
git add . ----将 项目所有文件添加到仓库中  如果想添加某个特定的文件，只需把.换成特定的文件名即可
git commit -m "提交说明" ----将add的文件commit到仓库


git remote add origin https://github.com/hanhailong/CustomRatingBar
git pull origin master
git push -u origin master

//配置sshkey
http://jingyan.baidu.com/article/a65957f4e91ccf24e77f9b11.html

