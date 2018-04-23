var marryCard = {
        app: {}
    },
    _win = $(window),
    _winW = _win.width(),
    _winH = _win.height(),
    _marryCard = $('#marryCard'),
    _layWrapper = $('.lay-wrapper'),
    _r = 0,
    _bd = $('.bd'),
    _x, _y, _add, _kz = '',
    _imgs = [],
    startX, startY, endX, endY, _ts;

if (_winW > 640) {
    _winW = 640
}

if (navigator.userAgent.match(/Android/i) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
    console.log('wap')
}

if (navigator.userAgent.indexOf('iPhone') != -1) {
    console.log('iphone');
    if (is_weixn()) {
        if (_winH > 480 && _winH < 510) {

        }
    } else {
        console.log('noWx')
    }
}

if (navigator.userAgent.match(/Android/i)) {
    _kz = 'format/webp';
}

function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

$('.imgDs').css({
    'margin-top': (_winH - $('.imgDs').height()) / 2
}).show();

$(document).on('touchstart', '.musicPlay', function() {
    if ($(this).attr('play') == 'opend') {
        $(this).css({
            '-webkit-animation-play-state': 'paused'
        });
        $(this).attr('play', 'closed');
        document.querySelector('#playMusic').pause()
    } else {

        $(this).css({
            '-webkit-animation-play-state': 'running'
        });
        $(this).attr('play', 'opend');
        document.querySelector('#playMusic').play()
    }

})

$(document).on('touchmove', '.touch', function(e) {
    //stopDefault(e)
})

$('#loading').css({
    'top': (_winH - 100) / 2,
    'left': 0,
    'right': 0
})

marryCard = {
    app: function() {
        var _mstatus = $('.mcm-select-status'),
            _mcounts = $('.mcm-select-count'),
            _mset = $('.mset'),
            _em = _mset.find('span'),
            _mcount = $('.mcount'),
            _emt = _mcount.find('span'),
            _layout = $('.layout'),
            _layPic = $('.lay-card-pic');

        _em.on('click', function() {

            for (var i = 0; i < _em.length; i++) {
                _em.eq(i).find('em').removeClass('mt')
            }
            $(this).find('em').addClass('mt');
            $('.mcm-status span').text($(this).find('em').text());
            $('.mcm-status').attr('status', $(this).find('em').attr('status'))
            _mstatus.fadeOut();

            if ($(this).text() != '赴宴') {
                $('.mcm-count').hide()
            } else {
                $('.mcm-count').fadeIn()
            }
        })

        _emt.on('click', function() {
            for (var i = 0; i < _emt.length; i++) {
                _emt.eq(i).find('em').removeClass('ct')
            }

            $(this).find('em').addClass('ct');
            $('.mcm-count span').text($(this).find('em').text());
            $('.mcm-count').attr('count', $(this).find('em').attr('count'));
            _mcounts.fadeOut();

        })

        $('.touchNum').on('touchend', function() {
            $('.touchC').fadeOut()
        })

        _layWrapper.css({
            'height': _winH
        })
        _layout.css({
            'height': _winH,
            'width': _winW,
            '-webkit-transform': ' translateY(' + _winH + 'px)'
        });



        $('.speech').css('height', _winW * 0.43)
        $('.guest-msg-cont dl').css({
            'height': $('.guest-msg-cont dd').height()
        })
        $('#mapCont').css('height', _winW * 0.43);

        $('.marry-card-msg').eq(0).css({
            'height': $('.hb').height() + 40
        });
        $('.marry-card-msg').eq(1).css({
            'height': $('.hb2').height() + 40
        })


        $('.mcm-send-cont').on('click', function(e) {
            e.preventDefault()
        })

        $('.user-msg').css('margin-top', ($('.guest-msg-cont dd').height() - $('.user-msg').height()) / 3)
        $('.arrow-left').css('top', ($('.guest-msg-cont dd').height() - $('.user-msg').height()) / 3)
        for (var i = 0; i < $('.gm-cont').length; i++) {
            $('.gm-cont').eq(i).css({
                'top': (_winH - $('.gm-cont').eq(i).height()) / 2
            })
        }

        $(document).on('touchstart', '.mcm-status', function() {
            _mstatus.fadeIn()
        })

        $(document).on('touchstart', '.mcm-count', function() {
            _mcounts.fadeIn()
        })

        $(document).on('touchstart', '.mask', function() {
            $(this).parent().fadeOut();
        });

        $(document).on('touchstart', '.map-btn', function() {
            $('.layout').hide()
            location.href = 'http://www.hunliji.com/p/wedding/baidunav.html#' + _x + ',' + _y;
        })

        marryCard.touch();
    },
    touch: function() {

        var _layout = $('.layout');

        for (var i = 0; i < $('.touch').length; i++) {
            $('.touch').eq(i).addClass('touch_' + i + '')
            touchBox('.touch_' + i + '')
        }

        function touchBox($obj) {
            document.querySelector($obj).addEventListener("touchstart", touchStart, false);
            document.querySelector($obj).addEventListener("touchmove", touchMove, false);
            document.querySelector($obj).addEventListener("touchend", touchEnd, false);
        }


        function touchStart(event) {
            var touch = event.touches[0];
            event.preventDefault();
            startY = touch.pageY;
            startX = touch.pageX;
        }

        function touchMove(event) {
            var touch = event.touches[0],
                _scrollMath;
            endY = touch.pageY - startY;
            _ts = _winH - Math.abs(endY);
            event.preventDefault();

            if (endY < 0 && _r < _layout.length - 1) {
                $('#wishPost').blur();
                $('#namePost').blur();
                if ($('body').attr('by') == 0) {
                    $('body').attr('by', 1);
                    _r = _r + 1;
                };

                _layout.eq(_r).css({
                    '-webkit-transform': 'translateY(0px)'
                });
                _layout.eq(_r).addClass('duration');
                _layout.eq(_r - 1).css({
                    '-webkit-transform': 'scale(0.5)'
                }).addClass('duration');

                if (_layout.eq(_r).hasClass('mapx') && $('body').attr('mp') == 0) {
                    $('body').attr('mp', 1)
                    marryCard.baiduMap(_x, _y);
                }
            }

            if (endY > 0 && _r > 0 && _r < _layout.length) {
                $('#wishPost').blur();
                $('#namePost').blur();
                if ($('body').attr('by') == 0) {
                    $('body').attr('by', 1);

                    _layout.eq(_r).css({
                        '-webkit-transform': 'translateY(' + _winH + 'px)'
                    });
                    _layout.eq(_r).addClass('duration');
                    _layout.eq(_r - 1).css({
                        '-webkit-transform': 'scale(1)'
                    }).addClass('duration');
                    _r = _r - 1;


                }
            }

        }

        function touchEnd(event) {
            event.preventDefault();
            /*
                if(endY<0&&_r>0){
                    if(Math.abs(_ts)>_winH-50){
                        _layout.eq(_r).css({'-webkit-transform':'translateY('+_winH+'px)'});
                        _layout.eq(_r).addClass('duration');
                        
                        _r=_r-1;
                    };
                }
                
                if(endY>0&&_r>0){
                    if(Math.abs(_ts)>_winH-50){
                        _layout.eq(_r).css({'-webkit-transform':'translateY(0px)'});
                        _layout.eq(_r).addClass('duration');
                    };
                }*/

            if ($('body').attr('by') == 1) {
                $('body').attr('by', 0);

            }
            /*
                setTimeout(function(){
                    for(var i=0;i<_layout.length;i++){
                        _layout.eq(i).removeClass('duration');
                    }
                },300)
                */

            if (_r >= _layout.length - 1) {
                $('.goIcon').css({
                    'top': 0,
                    'bottom': 'auto'
                })
                $('.goIcon').find('img').css({
                    '-webkit-transform': 'rotate(180deg)',
                    '-webkit-transition-duration': '800ms'
                })
                $('.creatMsg').fadeIn();
                $('.gotoWx').fadeIn();

            } else {
                $('.goIcon').css({
                    'top': 'auto',
                    'bottom': '10px'
                })
                $('.goIcon').find('img').css({
                    '-webkit-transform': 'rotate(0)',
                    '-webkit-transition-duration': '800ms'
                })
                $('.creatMsg').fadeOut();
                $('.gotoWx').fadeOut();
            }




        }
    },
    baiduMap: function($x, $y) {
        console.log($x, $y);
        baidu($x, $y)

        function baidu($x, $y) {
            var map = new BMap.Map("mapCont"),
                point = new BMap.Point($x, $y),
                marker = new BMap.Marker(point);
            map.centerAndZoom(point, 17);
            map.addOverlay(marker);
        }

    },
    imgOne: function(_imgSrc) {
        var _img = new Image();
        _img.onload = function() {
            marryCard.app();
            console.log('start');

            $('#loading').fadeOut()
            for (var i = 0; i < $('.layout').length; i++) {
                $('.layout').eq(i).css('z-index', i);

                // if ($('.layout').eq(i).hasClass('mapx') && $('body').attr('mp') == 0) {
                //     _r = i;
                //     $('body').attr('mp', 1)
                //     marryCard.baiduMap(_x, _y);
                //     $('.layout').eq(_r).css({
                //         '-webkit-transform': ' translateY(0px)'
                //     });
                // }
            }

            // 百度地图
            $('body').attr('mp', 0);

            $('.layout').eq(0).css({
                '-webkit-transform': ' translateY(0px)'
            });

            $('.tchr').css({
                'height': $('#mapCont').height()
            });

            setTimeout(function() {
                $('.bd').fadeOut()
            }, 1000);

            $('.layout').eq(0).addClass('duration');

            if (navigator.userAgent.match(/Android/i)) {
                $('.lay-card-pic').css({
                    'margin-top': (_winH - $('.lay-card-pic').height()) / 2
                })
            }

            $('.imgloading').remove();
        }
        _img.src = _imgSrc[0];

    },
    imgLoad: function(_imgSrc) {
        var _num = 0;
        for (var i = 0; i < _imgSrc.length; i++) {
            var _img = new Image();
            _img.onload = function() {
                _num++;
                if (_num >= _imgSrc.length) {

                    marryCard.app();
                    $('#loading').fadeOut()
                    for (var i = 0; i < $('.layout').length; i++) {
                        $('.layout').eq(i).css('z-index', i)
                    }

                    if (sessionStorage['a'] == 'pass') {
                        for (var i = 0; i < $('.layout').length; i++) {

                            if ($('.layout').eq(i).hasClass('mapx') && $('body').attr('mp') == 0) {
                                _r = i;
                                $('body').attr('mp', 1)
                                marryCard.baiduMap(_x, _y);
                                $('.layout').eq(_r).css({
                                    '-webkit-transform': ' translateY(0px)'
                                });
                            }

                        }

                    } else {
                        $('.layout').eq(0).css({
                            '-webkit-transform': ' translateY(0px)'
                        });
                        console.log('nopass')
                    }

                    $('.tchr').css({
                        'height': $('#mapCont').height()
                    });

                    setTimeout(function() {
                        $('.bd').fadeOut()
                    }, 1000);

                    $('.layout').eq(0).addClass('duration');

                    if (navigator.userAgent.match(/Android/i)) {
                        $('.lay-card-pic').css({
                            'margin-top': (_winH - $('.lay-card-pic').height()) / 2
                        })
                    }
                }
            }
            _img.src = _imgSrc[i];
        }
    },
    ajaxData: function() {
        var _userId, getData, cardId = marryCard.getUrlParams();
        _id = cardId['card_id'];
        _version = cardId['version'];
        _invationCode = cardId['invation_code'];
        _dw = cardId['dw'];

        _id = 'MzI1MzU5ZmlyZV9jbG91ZA'; // _params['card_id'];
        _invationCode = 'R1HEMTE'; // _params['invation_code'];



        $(document).on('touchend', '.mapBig', function() {
            $('#marryCard').css('opacity', 0)
            location.href = "http://admin.hunliji.com/p/wedding/home/APIInvation/displayMap?card_id=" + _id;
        })


        varAjax();

        function varAjax() {
            $.ajax({
                url: 'data/data.json',
                dataType: 'json',
                type: 'get',
                success: function(result) {

                    if (result.data.format.last_page_template.background_path != '') {
                        _color = 'background:url(' + result.data.format.last_page_template.background_path + ') repeat;'
                    } else {
                        if (result.data.speech_page_template != null) {
                            _color = 'background:' + result.data.format.speech_page_template.backgroundcolor + ''
                        }

                    }

                    //  $('body').css({'background':'#000'});
                    _userId = result.data.cardInfo.user_id;
                    _x = result.data.cardInfo.longitude;
                    _y = result.data.cardInfo.latitude;
                    _add = result.data.cardInfo.place;

                    function format(time, format) {
                        var t = new Date(time);
                        var tf = function(i) {
                            return (i < 10 ? '0' : '') + i
                        };
                        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
                            switch (a) {
                                case 'yyyy':
                                    return tf(t.getFullYear());
                                    break;
                                case 'MM':
                                    return tf(t.getMonth() + 1);
                                    break;
                                case 'mm':
                                    return tf(t.getMinutes());
                                    break;
                                case 'dd':
                                    return tf(t.getDate());
                                    break;
                                case 'HH':
                                    return tf(t.getHours());
                                    break;
                                case 'ss':
                                    return tf(t.getSeconds());
                                    break;
                            }
                        })
                    }

                    var _format = marryCard.format(result.data.cardInfo.time, 'yyyy年MM月dd日 HH点mm分');

                    // console.log(result.data.cardInfo.time)
                    // console.log(_format)

                    // console.log(marryCard.format(result.data.cardInfo.time, 'yyyy年MM月dd日 HH点mm分'))


                    // wxShare.setWeiXinData({
                    //     "appId": "",
                    //     "imgUrl": '' + result.data.cardInfo.share_image + '?imageView/1/w/100/h/100',
                    //     "link": "http://admin.hunliji.com/p/wedding/home/APIInvation/displayCard?card_id=" + _id + '&version=' + _version + '&invation_code=' + _invationCode,
                    //     "desc": '我们要结婚了！' + result.data.cardInfo.time + ',诚挚邀请您光临。点击查看更多。',
                    //     "title": '' + result.data.cardInfo.groom_name + '和' + result.data.cardInfo.bride_name + '的婚礼邀请'
                    // });

                    getData = {
                        marryPic: function() {
                            var _html = '';
                            for (var i = 0; i < result.data.pagesInfo.length; i++) {
                                _html += '<div class="layout touch" style="' + _color + '">';
                                _html += '<img class="lay-card-pic" src="' + result.data.pagesInfo[i].present_image_path + '?imageView/2/w/640/' + _kz + '"/>';
                                _html += '</div>';

                                _imgs.push(result.data.pagesInfo[i].present_image_path);
                            }
                            $('.lay-wrapper').append(_html);
                            getData.marryMsg();
                        },
                        marryMsg: function() {
                            var _avatar, _speech;
                            if (result.data.cardInfo.avatar == null) {
                                _avatar = 'http://www.hunliji.com/assets/avatar.jpg'
                            } else {
                                _avatar = result.data.cardInfo.avatar;
                            }
                            if (result.data.cardInfo.speech != null && result.data.cardInfo.speech != 'null' && result.data.cardInfo.speech != '') {
                                _speech = toStr(result.data.cardInfo.speech);
                            } else {
                                _speech = '诚邀您携家人参加我们的婚礼，为我们见证与祝福!';
                            }

                            _speech = '诚邀您携家人参加我们的婚礼，一起分享幸福时刻，为我们见证与祝福!';

                            function toStr(content) {
                                content = content.replace(/\r\n/g, "<br>")
                                content = content.replace(/\n/g, "<br>");
                                content = content.replace(/\r/g, "<br>");
                                return content;
                            }

                            var photoUrl = 'http://wedding.virola-eko.com/index.php?option=com_content&view=article&id=16&Itemid=131';
                            // 百度相册
                            // photoUrl = 'http://xiangce.baidu.com/galleria/list/261f8eccd02f0a838499de156ecf741c687bc047';

                            var _html = '';
                            _html += '<div class="gotoWx" style="display:none;text-align:center;border-radius:0 0 15px 0;background:rgba(0,0,0,0.6);z-index:99999"><img style="width:100%" src="http://marry.qiniudn.com/o_19rum1ttt1utg1hlt17n1hu91ugj9k.png"/></div>';
                            // _html += '<div class="creatMsg" style="display:none;z-index:99999"><img style="width:100%" src="http://marry.qiniudn.com/o_19rukpqf99gi1ems1gre11opnng90.png"/></div>';
                            _html += '<div class="layout mapx"><div class="guest-msg" style="background:url(' + result.data.format.last_page_template.background_path + ') no-repeat;background-size:100% 100%"><div class="gm-cont" >';
                            _html += '<div class="guest-msg-cont"><dl><dt class="touch"><div class="user-msg">';
                            _html += '<img src="' + _avatar + '?imageView/1/w/200/h/200"/><span>致宾客</span></div></dt><dd><i class="arrow-left"></i>';
                            _html += '<div class="speech swiper-no-swiping" ><p id="pch">' + _speech + '</p></div>';
                            _html += '<a class="photos" href="' + photoUrl + '">我们的幸福美照<i></i></a></dd></dl></div>';
                            _html += '<div class="map-box touch"><h3><em></em><span class="tpr" style="background:url(' + result.data.format.last_page_template.background_path + ') repeat;">酒店地址</span></h3>';
                            _html += '<div class="map-box-cont" style="position:relative;"><div class="touch tchr" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:9999"></div><div style="position:relative;padding:15px"><div class="mapBig" style="position:absolute;top:15px;right:15px;width:28px;height:28px;background:url(http://qnm.hunliji.com/o_19o0a8eda1r31tmo1a2514m5oqvk.png) no-repeat;background-size:100% 100%;z-index:99999"></div>';
                            _html += '<div id="mapCont"></div><div class="map-msg"><h5>地址：' + result.data.cardInfo.place + '</h5>';
                            _html += '<button class="map-btn"></button></div></div></div></div></div>';
                            _html += '</div></div>';

                            $('.lay-wrapper').append(_html);

                            $('.gotoWx').css({
                                'position': 'fixed',
                                'top': 0,
                                'left': 0,
                                'width': _winW * 0.1265,
                                'height': _winW * 0.1265,
                                'line-height': _winW * 0.116 + 'px'
                            });
                            $('.gotoWx').find('img').css({
                                'margin': 'auto',
                                'width': '64%'
                            });

                            $('.gotoWx').on('click', function() {
                                $('#marryCard').css('opacity', 0)
                                location.href = "http://wall.hunliji.com/gww/z2/" + _invationCode + "-" + _id;
                            })

                            $('.creatMsg').css({
                                'position': 'fixed',
                                'left': 0,
                                'right': 0,
                                'width': _winW * 0.406,
                                'margin': 'auto',
                                'top': (_winH - 410) / 2 + 415
                            })

                            $('.creatMsg').on('click', function() {
                                location.href = "http://dn.hunliji.com/download/app/qr?s=wxqt";
                            })

                            if ($('#pch').text().length > 60) {
                                $('.speech').css('overflow-y', 'auto')
                            }

                            $('.photos').click(function() {
                                $('#marryCard').css({
                                    'opacity': 0
                                })
                            })

                            getData.marryRely();

                            if (_dw == 1) {
                                $('#downHunliji').show()
                            }
                        },
                        marryRely: function() {
                            var _html = '';
                            _html += '<div class="layout touch"><div class="guest-wish" style="background:url(' + result.data.format.last_page_template.background_path + ') no-repeat;background-size:100% 100%"><div class="gm-cont">';
                            _html += '<div class="marry-card-msg" style="position:relative"><div class="touch" style="position:absolute;top:0;left:0;width:50%;height:100%;z-index:9"></div>';
                            _html += '<div style="position:absolute;top:0;left:0;right:0;margin:auto;width:85%;height:100%;">';
                            _html += '<div class="hb" style="margin:20px 0;">';
                            _html += '<div class="mcm-name"><em>您的真实姓名</em><input id="namePost" type="text" placeholder="名字"/></div><div id="statePost" class="mcm-status" status="0"><em>是否赴宴</em><span>赴宴</span><i></i></div>';
                            _html += '<div id="countPost" class="mcm-count" count="0"><em>赴宴人数</em><span>1人</span><i></i></div></div></div><div class="touch" style="width:100%;height:100%;"></div></div>';
                            _html += '<div class="touch" style="width:100%;height:15px;"></div><div class="marry-card-msg" style="position:relative">';
                            _html += '<div class="touch" style="position:absolute;top:0;left:0;width:12%;height:100%;z-index:9"></div><div class="touch" style="position:absolute;top:0;right:0;width:12%;height:100%;z-index:9"></div><div style="position:absolute;top:0;left:0;right:0;margin:auto;width:85%;height:100%;z-index:5">';
                            _html += '<div class="touch" style="height:20px;width:100%;"></div><div class="hb2"><h5 class="touch">对新人说些什么</h5>';
                            _html += '<textarea id="wishPost" class="mcm-send-cont" placeholder="收到请帖了，祝你们白头偕老，早生贵子。"></textarea>';
                            _html += '<div class="touch" style="height:20px;width:100%;"></div><button class="mcm-send-btn" >立即发送</button></div><div class="touch" style="height:20px;width:100%;"></div>';
                            _html += '<div class="touch" style="width:100%;height:100%;"></div></div></div>';
                            _html += '</div><div class="touch" style="width:100%;height:100%"></div></div>';



                            $(document).on('touchstart', '#namePost,#wishPost', function() {
                                $(this).focus()
                            })
                            if (_dw == 1) {} else {
                                $('.lay-wrapper').append(_html);
                            }
                        }
                    }
                    getData.marryPic();
                    marryCard.imgOne(_imgs);

                    $(document).on('touchend', '.mcm-send-btn', function() {
                        
                        $('#wishPost').blur();
                        $('#namePost').blur();
                        marryCard.tipMsg('Sorry, <br>这个功能懒得实现了 :P，<br>直接微信我吧~')
                        return;

                        if ($('#namePost').val() != '') {
                            postData()
                        } else {
                            console.log('noAjax')
                            marryCard.tipMsg('您还没填写姓名')
                        }

                    })
                    /*
                    for(var i=0;i<$('.layout').length;i++){
                        $('.layout').eq(i).css('background','#ebe6cb')
                    }
                    */



                    function successWin() {
                        var _html = '';
                        _html += '\
                            <div id="swin" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999999;">\
                                <div class="swin-box" style="display:none;position:relative;margin:auto;width:300px;height:245px;background:url(http://qnm.hunliji.com/o_19nr44kjggos1er61glnbkusbmk.png) no-repeat;background-size:100% 100%;  -webkit-transition-duration:300ms;-webkit-transform:scale(0.5);opacity:0;">\
                                    <h3 style="margin:auto;padding:30px 0 20px;width:90%;border-bottom:1px solid #ddd;text-align:center;font-size:20px;color:#ff7053;">发送成功</h3>\
                                    <dl style="position:relative;width:85%;margin:auto;margin-top:20px;">\
                                        <dt style="width:45px;height:45px;border-radius:50px;overflow:hidden;"><img style="width:100%" src="http://qnpic.hunliji.com/FlbCKHwmXjpC5tTxEPiVaJjZUAD5?imageView/1/w/50/h/50"/></dt>\
                                        <dd style="position:absolute;top:0;left:55px;">\
                                        <h5 style="padding:0 0 5px;font-size:18px;color:#ff7053;">' + result.data.cardInfo.groom_name + ' 和 ' + result.data.cardInfo.bride_name + '</h5>\
                                        <img style="width:100%" src="http://qnm.hunliji.com/o_19nr44kjiutv1iil15nv1kpslaim.png"/>\
                                        </dd>\
                                    </dl>\
                                    <span class="sdBtn" style="display:block;margin:auto;margin-top:50px;width:60%;"><img style="width:100%" src="http://qnm.hunliji.com/o_19nr44kjh4c7149pag162jr3jl.png"/></span>\
                                    <i class="cdbtn" style="position:absolute;top:10px;right:15px;width:25px;height:25px;"><img style="width:100%" src="http://qnm.hunliji.com/o_19nr4si2s1kl3qth1pg0e0eaabn.png"/></i>\
                                </div>\
                            </div>\
                            ';

                        $('body').append(_html);
                        $('.swin-box').css({
                            'margin-top': (_winH - 300) / 2
                        });

                        $('.swin-box dl').css({
                            'width': 300 * 0.85
                        })

                        $('.swin-box').show();
                        $('.swin-box').css({
                            '-webkit-transform': 'scale(1)',
                            'opacity': '1'
                        });



                        $(document).on('click', '.sdBtn', function() {

                            console.log(_invationCode + ',' + _id)

                            $('.swin-box').css({
                                '-webkit-transform': 'scale(.5)',
                                'opacity': '0'
                            });
                            setTimeout(function() {
                                $('#swin').fadeOut()
                            }, 300)
                            setTimeout(function() {
                                $('#swin').remove()
                            }, 1000)

                            $('#marryCard').css({
                                'opacity': 0
                            })
                            location.href = "http://wall.hunliji.com/gww/z2/" + _invationCode + "-" + _id;
                        })

                        $(document).on('click', '.cdbtn', function() {
                            $('.swin-box').css({
                                '-webkit-transform': 'scale(.5)',
                                'opacity': '0'
                            });
                            setTimeout(function() {
                                $('#swin').fadeOut()
                            }, 300)
                            setTimeout(function() {
                                $('#swin').remove()
                            }, 1000)
                        })

                    }

                    function postData() {
                        var _namePost = $('#namePost').val(),
                            _statePost = $('#statePost').attr('status'),
                            _wishPost = $('#wishPost').val(),
                            _countPost = $('#countPost').attr('count');

                        if ($('#wishPost').val() == '') {
                            _wishPost = $('#wishPost').attr('placeholder');
                        }
                        if (_statePost != 0) {
                            _countPost = ''
                        }

                        $.ajax({
                            url: 'http://www.hunliji.com/p/wedding/home/APIInvation/reply',
                            type: 'post',
                            data: {
                                'user_id': _userId,
                                'name': _namePost,
                                'state': _statePost,
                                'wish_language': _wishPost,
                                'count': _countPost,
                                'version': _version
                            },
                            success: function(result) {
                                console.log(result)
                                if (result.status.RetCode == 0) {
                                    //marryCard.tipMsg('发送成功！');
                                    successWin();
                                    console.log('发送成功')

                                } else {
                                    marryCard.tipMsg('服务器异常问题，请重新提交！')
                                }


                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest)
                            }
                        })
                    }

                    trendsImg();

                    function trendsImg() {
                        var _html = '',
                            $html = '',
                            _path, _goIcon;

                        if (result.data.theme_info.front_page_template.music_icon != '') {
                            _path = result.data.theme_info.front_page_template.music_icon;
                        } else {
                            _path = 'http://qnm.hunliji.com/o_19met78loohuujo12kn1u4i9qai.png';
                        }
                        // console.log(result.data.theme_info.front_page_template.music_icon)
                        _html += '<div class="musicPlay music-play">';
                        _html += '<img src="' + _path + '"/></div>';

                        $('body').append(_html);

                        if (result.data.theme_info.common_page_template.page_icon != '') {
                            _goIcon = result.data.theme_info.common_page_template.page_icon;
                        } else {
                            _goIcon = 'http://qnm.hunliji.com/o_19mes3c36g2quor17trb561fq512.png';
                        }

                        $html += '<div class="goIcon go-icon">';
                        $html += '<img src="' + _goIcon + '"/></div>';

                        $('body').append($html);
                    }

                    musicPath();

                    function musicPath() {
                        var _html = '',
                            _music;
                        // console.log(result.data.audios)
                        if (result.data.audios != null && result.data.audios != 'null' && result.data.audios != '') {
                            _music = result.data.audios[0].audio_path;
                            _html += '<div class="invMusic ">';
                            _html += '<audio id="playMusic" preload="load" loop src="' + _music + '">';
                            _html += '</audio></div>';

                            $('body').append(_html);

                            $('body').on('touchstart', function() {
                                if ($(this).attr('aid') == 0) {
                                    $('.musicPlay').css({
                                        '-webkit-animation-play-state': 'running'
                                    });
                                    $('.musicPlay').attr('play', 'opend');
                                    document.querySelector('#playMusic').play();
                                    $(this).attr('aid', 1)
                                }
                            })
                        } else {
                            $('.musicPlay').hide()

                        }
                    }

                    //$('.guest-msg').css('background',result.data.format.speech_page_template.backgroundcolor);
                    $('.tpr').css('color', result.data.format.speech_page_template.backgroundcolor);
                    $('.map-box h3 em').css('border-color', result.data.format.speech_page_template.backgroundcolor);
                    $('.photos').css('color', result.data.format.last_page_template.font_color);
                    $('.photos i').css('background-color', result.data.format.last_page_template.font_color);
                    //$('.guest-wish').css('background',result.data.format.speech_page_template.backgroundcolor);

                    $('.marry-card-msg h5').css('color', result.data.format.last_page_template.font_color);
                    $('.mcm-status i').css('background-color', result.data.format.last_page_template.font_color);
                    $('.mcm-send-btn').css('background', result.data.format.last_page_template.font_color);
                    $('.mcm-count i').css('background-color', result.data.format.last_page_template.font_color);
                    $('.mcm-name em').css('color', result.data.format.last_page_template.font_color);
                    $('.mcm-status em').css('color', result.data.format.last_page_template.font_color);
                    $('.mcm-count em').css('color', result.data.format.last_page_template.font_color);

                    $('.speech p').css('color', result.data.format.last_page_template.font_color)

                    $('.goIcon').find('img').css({
                        'background': 'url(' + result.data.theme_info.common_page_template.page_icon + ') no-repeat',
                        'background-size': '100% 100%'
                    })
                }
            })
        }

    },
    tipMsg: function($cont) {
        var _html = '';
        _html += '<div class="tipbox" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99">';
        _html += '<div id="tips" style="display:none;-webkit-transition-duration:300ms;-webkit-transform:scale(0.5);opacity:0;margin:auto;padding:30px 10px;width:70%;color:#ff705e;font-size:1.8rem;-webkit-box-sizing:border-box;text-align:center;border-radius:6px;background:#fff;">' + $cont + '</div></div>';

        $('body').append(_html);

        $('#tips').show();
        $('#tips').css({
            '-webkit-transform': 'scale(1)',
            'opacity': '1'
        });

        setTimeout(function() {
            $('#tips').css({
                '-webkit-transform': 'scale(.5)',
                'opacity': '0'
            });
        }, 3500);

        setTimeout(function() {
            $('.tipbox').remove();
        }, 4000)

        $('#tips').css({
            'margin-top': (_winH - 70) / 2
        })
    },
    stopDefault: function(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;

        return false;
    },
    marryPhoto: function() {
        var _layWrapper = $('#lay-wrapper'),
            _params = marryCard.getUrlParams();
        _id = 'MzI1MzU5ZmlyZV9jbG91ZA'; // _params['card_id'];
        _version = _params['version'];
        _invationCode = 'R1HEMTE'; // _params['invation_code'];



        // sessionStorage.a = 'pass';

        $.ajax({
            url: 'data/data.json',
            dataType: 'json',
            type: 'get',
            success: function(result) {
                var _colord;
                if (result.data.format.last_page_template.background_path != '') {
                    _colord = 'url(' + result.data.format.last_page_template.background_path + ') no-repeat;background-size:100% 100%'
                } else {
                    if (result.data.speech_page_template != null) {
                        _colord = '' + result.data.format.speech_page_template.backgroundcolor + ''
                    }

                }
                // console.log(_colord);

                $('body').css({
                    'background': '' + _colord + ''
                });

                var _format = marryCard.format(result.data.cardInfo.time, 'yyyy年MM月dd日 HH点mm分');
                // wxShare.setWeiXinData({
                //     "appId": "",
                //     "imgUrl": '' + result.data.cardInfo.share_image + '?imageView/1/w/100/h/100',
                //     "link": "http://admin.hunliji.com/p/wedding/home/APIInvation/displayCard?card_id=" + _id + '&version=' + _version + '&invation_code=' + _invationCode,
                //     "desc": '我们要结婚了！' + result.data.cardInfo.time + ',诚挚邀请您光临。点击查看更多。',
                //     "title": '' + result.data.cardInfo.groom_name + '和' + result.data.cardInfo.bride_name + '的婚礼邀请'
                // });

                var $html = '',
                    _p;
                // 视频
                // if (result.data.vedios != null) {
                //     if (result.data.vedios[0].video_path != '') {
                //         if (result.data.vedios[0].video_path != '' && result.data.vedios[0].video_path != 'null' && result.data.vedios[0].description != null) {
                //             _p = '<p>' + result.data.vedios[0].description + '</p>'
                //         } else {
                //             _p = ''
                //         }

                //         /*
                //     var _html='';
                //         _html+='<div class="photo-cont" style="position:relative;">';
                //         _html+='<img class="lay-pic vidbg" src="'+result.data.vedios[0].video_path+'?vframe/jpg/offset/1|imageView/1/h/640"/>';
                //         _html+=_p;
                //         _html+='<a href="'+result.data.vedios[0].video_path+'" style="position:absolute;top:0;left:0;display:block;width:100%;height:100%;text-align:center;"><img class="playV" style="width:100px;" src="http://www.sharejs.com/uploadfiles/2012/07/16/134240093635548.png"/></a>';
                //         _html+='</div>';
                //     */

                //         if (navigator.userAgent.indexOf('iPhone') != -1) {
                //             console.log('iphone');
                //             var _html = '';
                //             _html += '<div class="photo-cont" style="position:relative;">';
                //             _html += '<img class="lay-pic vidbg" src="' + result.data.vedios[0].video_path + '?vframe/jpg/offset/1|imageView/1/h/640"/>';
                //             _html += _p;
                //             _html += '<a href="' + result.data.vedios[0].video_path + '" style="position:absolute;top:0;left:0;display:block;width:100%;height:100%;text-align:center;"><img class="playV" style="width:100px;" src="http://www.sharejs.com/uploadfiles/2012/07/16/134240093635548.png"/></a>';
                //             _html += '</div>';
                //         }

                //         if (navigator.userAgent.match(/Android/i)) {
                //             console.log('Android');
                //             var _html = '';
                //             _html += '<div class="photo-cont" style="position:relative;">';
                //             _html += '<img class="lay-pic vidbg" style="display:none" src="' + result.data.vedios[0].video_path + '?vframe/jpg/offset/1|imageView/1/h/640"/>';
                //             _html += _p;
                //             //_html+='<a href="'+result.data.vedios[0].video_path+'" style="position:absolute;top:0;left:0;display:block;width:100%;height:100%;text-align:center;"><img class="playV" style="width:100px;" src="http://www.sharejs.com/uploadfiles/2012/07/16/134240093635548.png"/></a>';
                //             _html += '<video id="videoBox" width="100%" controls="controls" ><source type="video/mp4" src="' + result.data.vedios[0].video_path + '"></video>';
                //             _html += '</div>';
                //         }

                //         _layWrapper.prepend(_html)

                //         var _vidimg = new Image();
                //         _vidimg.onload = function() {
                //             $('.playV').css({
                //                 'margin-top': ($('.vidbg').height() - 100) / 2
                //             })
                //         }
                //         _vidimg.src = $('.vidbg').attr('src')
                //     }
                // }

                for (var i = 0; i < result.data.photos.length; i++) {
                    if (result.data.photos[i].description != null) {
                        if (result.data.photos[i].description != '' && result.data.photos[i].description != 'null') {
                            _p = '<p>' + result.data.photos[i].description + '</p>'
                        } else {
                            _p = ''
                        }
                    } else {
                        _p = ''
                    }
                    $html += '<div class="photo-cont">';
                    $html += '<img class="lay-pic" src="' + result.data.photos[i].photo_path + '?imageView/2/w/640"/>';
                    $html += _p;
                    $html += '</div>';



                }
                _layWrapper.append($html)

                trendsImg();

                function trendsImg() {
                    var _html = '',
                        $html = '',
                        _path, _goIcon;

                    if (result.data.theme_info.front_page_template.music_icon != '') {
                        _path = result.data.theme_info.front_page_template.music_icon;
                    } else {
                        _path = 'http://qnm.hunliji.com/o_19met78loohuujo12kn1u4i9qai.png';
                    }

                    _html += '<div class="musicPlay music-play"  style="position:fixed;">';
                    _html += '<img src="' + _path + '"/></div>';

                    $('body').append(_html);

                    /*
                    if(result.data.cardInfo.path_image !=''){
                        _goIcon = result.data.cardInfo.path_image;
                    }else{
                        _goIcon = 'http://qnm.hunliji.com/o_19mes3c36g2quor17trb561fq512.png';
                    }
                    
                    $html+='<div class="goIcon go-icon">';
                    $html+='<img src="'+_goIcon+'"/></div>';
                    
                    $('body').append($html);
                    */
                }

                musicPath();

                function musicPath() {
                    var _html = '',
                        _music;

                    if (result.data.audios != null) {
                        _music = result.data.audios[0].audio_path;
                        _html += '<div class="invMusic ">';
                        _html += '<audio id="playMusic" preload="load" loop src="' + _music + '">';
                        _html += '</audio></div>';

                        $('body').append(_html);

                        $('body').on('touchstart', function() {
                            if ($(this).attr('aid') == 0) {
                                $('.musicPlay').css({
                                    '-webkit-animation-play-state': 'running'
                                });
                                $('.musicPlay').attr('play', 'opend');
                                document.querySelector('#playMusic').play();
                                $(this).attr('aid', 1)
                            }
                        })
                    } else {
                        $('.musicPlay').hide()

                    }
                    console.log(result.data.audios)

                }


            }
        })
    },
    getUrlParams: function() {
        var urlParams;
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function(s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);
        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
        return urlParams;
    },

    format: function(time, format) {
        var t = new Date(time);
        var tf = function(i) {
            return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }
};

function imgLoading() {
    console.log(11);
    var _html = '';
    _html += '\
        <div class="imgloading" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fffbe9;z-index:999">\
            <div class="imgDs" style="margin:auto;display:-webkit-box;width:120px;">\
                <span class="imgDs-1th" style="display:block;width:15px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia1ebn15mrbce144510td12.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-2th" style="display:block;width:15px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia7nn1org1a8h1k2e10714.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-3th" style="display:block;width:15px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmiau1pnso1h3213mm6fru.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-4th" style="display:block;width:15px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia1sp51pbo1sn1q1s1eo7v.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-5th" style="display:block;width:9px;height:25px;background:url(http://qnm.hunliji.com/o_19ntf6aeo1keum251b3umjuh52c.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-6th" style="display:block;width:13px;height:25px;background:url(http://qnm.hunliji.com/o_19ntf6aeo1etf1pppqke1n501s3t2d.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-7th" style="display:block;width:13px;height:25px;background:url(http://qnm.hunliji.com/o_19ntf6aeoj7u14vs14rl1ib91c0t2b.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-8th" style="display:block;width:8px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia1nig1bf81ba73iq1tin15.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-9th" style="display:block;width:8px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia1nig1bf81ba73iq1tin15.png) no-repeat;background-size:100% 100%; "></span>\
                <span class="imgDs-10th" style="display:block;width:8px;height:25px;background:url(http://qnm.hunliji.com/o_19nt8fmia1nig1bf81ba73iq1tin15.png) no-repeat;background-size:100% 100%; "></span>\
            </div>\
        </div>\
        ';

    $('body').append(_html);

    $('.imgDs').css({
        'margin-top': (_winH - $('.imgDs').height()) / 2
    })
}
