---
layout: page
title: 欢迎提出您的建议和留言哦！！欢迎勾搭！！！
description: Message
keywords: tea9
comments: true
menu: Message
permalink: /message/
---

## 留言板

<div class="valine_comment"></div>

<!-- valine comment -->
<script src="http://cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src='https://unpkg.com/valine@latest/dist/Valine.min.js'></script>

<script>
new Valine({
        el: '.valine_comment' ,
        notify: false, 
        verify: false, 
        appId: '{{ site.comments.valine_app_id }}',
        appKey: '{{ site.comments.valine_app_key }}',
        placeholder: '{{ site.comments.valine_placeholder }}',
        path:'https://tea9.github.io/message/', 
        avatar:'{{ site.comments.valine_avatar }}' ,
        pageSize: "10"
    });
</script>
