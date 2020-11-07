---
title: hexo的live2d记录
abbrlink: 186406879
date: 2019-08-11 14:19:25
tags:
	- live2d
---

```
npm install --save hexo-helper-live2d

live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-shizuku
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true


npm install live2d-widget-model-shizuku

```

## LINKS
[在Hexo博客上添加可爱的Live 2D模型](https://www.jianshu.com/p/4b61d8702cfa)  
[文档](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)  
[模型名称](https://github.com/xiazeyu/live2d-widget-models)  
[模型预览](https://huaji8.top/post/live2d-plugin-2.0/)  
