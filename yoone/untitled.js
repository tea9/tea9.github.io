
        window.hitokoto_playlist = 2158283120;
        // CheckOS
        var os = function () {
            var ua = navigator.userAgent,
                isWindowsPhone = /(?:Windows Phone)/.test(ua),
                isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
                isAndroid = /(?:Android)/.test(ua),
                isFireFox = /(?:Firefox)/.test(ua),
                isChrome = /(?:Chrome|CriOS)/.test(ua),
                isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox &&
                    /(?:Tablet)/.test(ua)),
                isPhone = /(?:iPhone)/.test(ua) && !isTablet,
                isPc = !isPhone && !isAndroid && !isSymbian;
            return {
                isTablet: isTablet,
                isPhone: isPhone,
                isAndroid: isAndroid,
                isPc: isPc
            };
        }();

        // Animate
        $.fn.extend({
            animateCss: function (animationName, callback) {
                var animationEnd = (function (el) {
                    var animations = {
                        animation: 'animationend',
                        OAnimation: 'oAnimationEnd',
                        MozAnimation: 'mozAnimationEnd',
                        WebkitAnimation: 'webkitAnimationEnd',
                    };

                    for (var t in animations) {
                        if (el.style[t] !== undefined) {
                            return animations[t];
                        }
                    }
                })(document.createElement('div'));

                this.addClass('animated ' + animationName).one(animationEnd, function () {
                    $(this).removeClass('animated ' + animationName);

                    if (typeof callback === 'function') callback();
                });

                return this;
            },
        });

        function tadaHeart() {
            $('#like_number1').animateCss('tada');
            $('#like_number2').animateCss('tada');
        }
        var tada = window.setInterval(tadaHeart, 600);

        // Love Hitokoto !
        var like_num = 8;
        var sid = 1233;

        function loveHitokoto() {
            fetch("https://v1.hitokoto.cn?encode=json")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    fetch("https://hitokoto.cn/getLike?ID=" + data.id)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (result) {
                            // Update Like
                            sid = data.id;
                            like_num = result.data.total;
                            $("#like_number1").attr("data-badge", result.data.total);
                            $("#like_number2").attr("data-badge", result.data.total);

                            if ($('#hitokoto').hasClass("animated")) {
                                $('#hitokoto').removeClass("animated");
                                $('#hitokoto').removeClass("fadeIn");
                            }
                            $('#hitokoto').animateCss('bounce');
                            $('#hitokoto_text').text(data.hitokoto);
                            var author = !!data.from ? data.from : "无名氏"
                            $('#hitokoto_author').text("-「" + author + "」");
                            window.setTimeout(loveHitokoto, 10000);
                        })
                        .catch(function (err){
                             console.error(`在更新一言时捕获错误， 错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
                             loveHitokoto();
                         });
                })
                .catch(function (err) {
                    console.error(`在更新一言时捕获错误， 错误信息: ${err.message}. 当前时间: ${new Date().toISOString()}`);
                    loveHitokoto();
                });
        }
        var isID = 0;
        if (!isID) {
          window.setTimeout(loveHitokoto, 10000);
        }
        APlayer.prototype.add163 = function add163(id) {
            if (!id) throw new Error("Unable Property.");
            return fetch163Song(id)
              .then(function (data) {
                var obj = {
                    name: data[0].name,
                    artist: data[0].artist,
                    cover: data[0].pic,
                    url: data[0].url,
                    lrc: data[0].lrc.base
                }
                this.list.add(obj);
                return obj;
            }.bind(this))
        }
        if (os.isTablet || os.isPc) {
            // Active player
            // CheckCookie
            var player_auto = Cookies.get('player_auto');
            if (player_auto) {
                // isAuto
                if (player_auto === "autod") {
                    activePlayer();
                } else {
                    activePlayer(false);
                }
            } else {
                swal("是否需要播放我们精选的乐曲来欣赏一言呢？", {
                    buttons: {
                        cancel: "拒绝",
                        allow: "好的"
                    }
                })
                .then(function (value) {
                    if (value == "allow") {
                        activePlayer();
                        Cookies.set('player_auto', 'autod', { expires: 365 });
                    } else {
                        // do nothing
                       activePlayer(false); 
                       Cookies.set('player_auto', 'no', { expires: 365 });
                    }
                });
            }
        }
        function activePlayer(auto = true) {
            fetch163Playlist(window.hitokoto_playlist)
                .then(function(data) {
                  var songs = [];
                  data.map(function(song) {
                     songs.push({
                       name: song.name,
                       artist: song.artist,
                       cover: song.pic,
                       url: song.url,
                       lrc: song.lrc.base
                     });
                  });
                  return songs;
                })
                .then(function(songs) {
                    window.player = new APlayer({
                      container: document.getElementById('aplayer'),
                      lrcType: 1,
                      fixed: true,
                      autoplay: auto,
                      preload: 'metadata',
                      audio: songs
                    });
                    window.player.lrc.toggle();
                    window.player.volume(0.5);
                    $("#active_player").text("暂停");
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    