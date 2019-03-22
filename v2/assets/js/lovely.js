/* title 可爱的提示 忘了哪里抄的了看着可爱就粘贴过来了 下次得记录下*/
/* 找到了 原主人是这个 https://hubojing.github.io/ */

(function() {
    var OriginTitile = document.title, titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '快回来嘛！';
            clearTimeout(titleTime);
        } else {
            document.title = '(つェ⊂)抱抱~你回来了!';
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            },2000);
        }
    });
})();
