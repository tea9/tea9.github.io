---
layout: page
title: 关于
description: About
keywords: tea9
comments: true
menu: About
permalink: /about/
header-img: 
---
<style type="text/css">
	.skill{
	   width: 300px;
	    height: 300px;
	   margin: 50px auto;

	}
</style>

<!--重新布局aboutme 添加qq base
64 联系方式 赞赏列表-->

<!-- ## 欢迎你来到我的blog  -->

<!-- > 写写代码  
> 学习不同的东西  -->


<!-- ## 我在做什么

我还是个代码界的萌新，在各种编程群混脸熟。  

现在在做*安卓开发*。 -->

<!--我现在正在学习开发*小程序**web安全*你懂的！,还在接触*前端开发*。  -->

<div class="bio">
    <p><a href="{{ site.ap_link }}">{{ site.ap_reciate }}</a></p>
</div>

<div class="bio">
    <p><a href="{{ site.message_link }}">{{ site.message_title }}</a></p>
</div>

## 关于我

tea9/茶蛋/清茶...  
于1999年03月01日 来到地球  

没错我就是个死肥宅。  

但是，未来想去探索各种领域。  

你要是想跟我交流/py，欢迎加群。  

## 爱好捏？

平时对 什么都感兴趣！！！  面向对象编程，前端渣，安卓渣，python渣，  
ACG爱好者，萝莉控，萌即正义，死宅  
乐器？？？<!--古琴会一点吧，给我谱子可以弹--> 不存在的  
三分钟热度，，，，，但是每天三分钟，一辈子也很长了吧  
总在自杀边缘徘徊  emmmmmm 但是不会来真的  
可能有点内向，可能你不主动，我也不会主动，所以我等你来啊  


## 技能图
<!--from https://townwang.com/about-->
 <div class="skill" id="skill">
</div>



## 捕获我
+ qq: \u0031\u0031\u0035\u0032\u0038\u0037\u0030\u0033\u0032\u0039  

+ telegram: [@tea99](https://t.me/tea99)  

+ github: [github](https://github.com/tea9)  

+ twitter: [twitter](https://twitter.com/shaomiaosun)  


+ qq群号：237239327  
+ <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5W65BfQ">一键加群</a>
+ qq群二维码：  
<img src="/assets/img/qr.png" width="200" height="200"/>

+ 邮箱： 
+ shaomiaojava@163.com  
+ shaomiaojava@gmail.com  

<!-- 赞赏我

我的文章你要是喜欢或者对你有帮助，欢迎赞赏我，可能会有小礼物，我在准备中（比如亲手写的明信片、我做的小东西什么的）。  

<img src="/assets/img/alipay.png" width="200" height="200">
<img src="/assets/img/wechatpay.png" width="200" height="200">-->


<script type="text/javascript">
	//技能图绘制插件
    (function() {
            var Radar = function(cfg) {
            var outContainer = document.querySelector(cfg.el);
            var container = document.createElement("div");
            var cans = document.createElement("canvas");
            container.appendChild(cans);
            outContainer.appendChild(container);

            var ctx = cans.getContext("2d");
            var data = cfg.data;
            var w = cfg.width;
            var h = cfg.height;
            container.style.position = "relative";
            container.style.width = w+"px";
            container.style.height = h+"px";
            cans.width = w;
            cans.height = h;

            var step = data.length;
            var r = w/2;

            //绘制网格背景
            var isBlue = false;

            for(var s = 10; s > 0; s--) {
                ctx.beginPath();
                for(var i=0;i<step;i++) {
                    var rad = 2*Math.PI/step * i;
                    var x = r + Math.sin(rad)*r*(s/10);
                    var y = r + Math.cos(rad)*r*(s/10);
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = (isBlue = !isBlue)?'#EEA9A9' : '#f1f9ff';
                ctx.fill();
            }


            //绘制伞骨
            ctx.beginPath();
            for(var i=0;i<step;i++) {
                var rad = 2*Math.PI/step * i;
                var x = r + Math.sin(rad)*r;
                var y = r + Math.cos(rad)*r;
                ctx.moveTo(r,r);
                ctx.lineTo(x, y);

                var text = document.createElement("div");
                text.innerHTML = data[i][0];
                text.style.position = "absolute";

                //添加文本
                if(x > r) {
                    text.style.left = ( x + 10) + 'px';
                } else {
                    text.style.right = (w-x +5) + 'px';
                }

                if(y > r) {
                    text.style.top = y + 'px';
                } else {
                    text.style.bottom = (h - y) + 'px';
                }
                container.appendChild(text);
            }
            ctx.strokeStyle = "#e0e0e0"
            ctx.stroke();

            //绘制折线
            ctx.strokeStyle = "#f00";
            ctx.beginPath();

            for(var i=0;i<step;i++) {
                var rad = 2*Math.PI/step * i;
                var x = r + Math.sin(rad)*r*data[i][1];
                var y = r + Math.cos(rad)*r*data[i][1];
                ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.stroke();

            //添加数据点
            ctx.fillStyle = "#ff7676";
            for(var i=0;i<step;i++) {
                var rad = 2*Math.PI/step * i;
                var x = r + Math.sin(rad)*r*data[i][1];
                var y = r + Math.cos(rad)*r*data[i][1];
                ctx.beginPath();
                ctx.arc(x,y,4,0,2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }


        }
        window["Radar"] = Radar;
    })();
	/**
	 * [radar description]
	 * @type {Radar}
	 * 技能图绘制调用方法
	 */
    var radar = new Radar({
	    el: "#skill",
	    width: 300,
	    height: 300,
	    data: [["HTML", 0.5], ["CSS", 0.5], ["JS", 0.5],
	     ["Android", 0.9],["java",0.6],["Kotlin",0.5],["Python",0.3]]
	});
</script>
