---
layout: page
title: Hello 你有什么想对我说的嘛？嘤嘤嘤
description: Message
keywords: tea9
comments: true
menu: Message
permalink: /message/
header-img: 
---

## 留言板

可以勾搭，可以交流，可以发飙，说什么都可以。  

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530159774625&di=9924be4b32068447118cb3464c35324f&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2Fimges%2F2017%2F0517%2F20170517084236902.jpg)

想跟我说点悄悄话？  
+ qq: MTE1Mjg3MDMyOQ==  

+ telegram: [@tea99](https://t.me/tea99)  

<div class="valine_comment"></div>
{% include comment.html %}

<script>
new Valine({
        av: AV,
        el: '.valine_comment' ,
        notify: false, 
        verify: false, 
        appId: '{{ site.comments.valine_app_id }}',
        appKey: '{{ site.comments.valine_app_key }}',
        placeholder: '{{ site.comments.valine_placeholder }}',
        path:window.location.pathname, 
        avatar:'{{ site.comments.valine_avatar }}' ,
        pageSize: "10"
    });
</script>
