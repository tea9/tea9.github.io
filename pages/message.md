---
layout: page
title: 有什么话要对我说吗？别怕，大胆来！！！
description: Message
keywords: tea9
comments: true
menu: Message
permalink: /message/
header-img: https://images.unsplash.com/photo-1530170663623-fa2b93103c22?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb5e4dbc5137236c12dfdc58c2aa7da5&auto=format&fit=crop&w=1568&q=80
---

## 留言板

可以勾搭，可以交流，可以发飙，说什么都可以。  

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530159774625&di=9924be4b32068447118cb3464c35324f&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2Fimges%2F2017%2F0517%2F20170517084236902.jpg)

<div class="valine_comment"></div>

<!-- valine comment -->
<!-- <script src="https://cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src='https://unpkg.com/valine@latest/dist/Valine.min.js'></script> -->
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
