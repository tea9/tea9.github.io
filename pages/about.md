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
<!--
    from https://www.fczbl.vip/about.html
                              ..
                            .' @`._
             ~       ...._.'  ,__.-;
          _..- - - /`           .-'    ~
         :     __./'       ,  .'-'- .._
      ~   `- -(.-'''- -.    \`._       `.   ~
        _.- '(  .______.'.-' `-.`         `.
       :      `-..____`-.                   ;
       `.             ````  稻花香里说丰年，  ;   ~
         `-.__          听取人生经验。  __.-'
              ````- - -.......- - -'''    ~
           ~                   ~
-->

<!--
碎碎念：
绝望的时候，一定要向生活抗争。
你不去抗争，怎么会知道上帝是否会来救你呢？

选择一件自己喜欢的事，就坚持到底，说不定哪天，这件事，就会给你带来意想不到的惊喜。

-->

<!--
哄人睡觉的话：

1.如果心倦了就找个时间休息，如果梦破了就找个机会修补。夜静然，人释然才能好好的放松。晚安！
2.梦想无论怎么模糊，它总潜伏在我们心底，使我们的心境永远得不到宁静，直到梦想成为事实。晚安！
3.孤单的夜不做孤单的人，有晚风和你嬉闹，有小虫陪你作伴，还有我的祝福，让你一夜美梦到天亮！
4.今晚温馨笑一笑，舒舒服服睡个觉，明天醒来笑一笑，整天生活有情调，一切烦恼都忘掉！
5.月儿弯弯，微笑甜甜，思念的心绪久未变；送上祝愿，问候片片，愿好运与你手相牵。亲爱的朋友，问好，晚安！
6.希望你做个好梦，晚安！
-->

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
于1999年 误闯地球 从此流落到此   

**标签：**Android开发/网络安全/区块链  

未来想去探索各种领域。  

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


+ tea9's的后宫群：237239327  

+ 搞安全的群：901902823  

+ 安卓逆向的群：839737747   

<!-- + 学习的群：924426847   -->

+ 唱歌的群：316485206  

<!-- + <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5W65BfQ">一键加群</a>
+ qq群二维码：  
<img src="/assets/img/qr.png" width="200" height="200"/> -->

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
	    data: [["HTML", 0.3], ["CSS", 0.3], ["JS", 0.4],
	     ["Android", 0.8],["java",0.4],["Kotlin",0.5],["Python",0.1],["solidity",0.1]]
	});
</script>
