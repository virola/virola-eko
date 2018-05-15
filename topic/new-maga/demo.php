<?php 
$filedata = file_get_contents('mock/data.json');
$data = json_decode($filedata, true);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<!-- Force latest IE rendering engine & Chrome Frame -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><?php echo $data['name'] ?></title>
<meta name="keywords" content="诗集" />
<meta name="description" content="<?php echo $data['description'] ?>" />
<meta name="date" content="2018-05-15"/>
<link href="https://cdn.bootcss.com/Swiper/4.2.6/css/swiper.min.css" rel="stylesheet">
<link rel="stylesheet" href="asset/css/animate.min.css">
<link rel="stylesheet" type="text/css" href="asset/css/base.css">
<link rel="stylesheet" type="text/css" href="asset/css/vertical.css">
</head>
<body>
<div class="main">
    <div id="slide" class="swiper-container">
        <div class="swiper-wrapper">
            <section class="swiper-slide" style="background-image: url(http://virola-eko.com/topic/magazine/mock/bg/1.jpg)">
                <div class="page page-first">
                    <h2 class="title"><?php echo $data['name'] ?></h2>
                    <p><?php echo $data['subtitle'] ?></p>
                </div>
            </section>

            <?php foreach ($data['pages'] as $index=>$page) {?>
            <?php $img = $index+2; if ($img > 10) { $img = 6; } ?>
            <section class="swiper-slide" style="background-image: url(http://virola-eko.com/topic/magazine/mock/bg/<?php echo $img?>.jpg)">
                <div class="page">
                    <h2 class="title"><?php echo $page['title'] ?></h2>
                    <p class=""><?php echo $page['content'] ?></p>
                </div>
            </section>
            <?php } ?>
        </div>
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev swiper-button-white"></div>
        <div class="swiper-button-next swiper-button-white"></div>
    </div>
    
    <!-- arrow -->
    <img class="arrow-v arrowing" src="asset/img/v_arrow.png" >
</div>


<!-- music -->
<audio id="music" loop="loop" src="https://pic.ibaotu.com/00/31/69/006888piC4eQ.mp3"></audio>
<img id="music-switch-on" class="music-switcher" src="http://virola-eko.com/asset/music/img/music-on.png" alt="">
<img id="music-switch-off" class="music-switcher" src="http://virola-eko.com/asset/music/img/music-off.png" alt="">

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/Swiper/4.2.6/js/swiper.min.js"></script>
<script src="asset/js/swiper.animate1.0.3.min.js"></script>
<script>
function initMusic() {
    var music = document.getElementById('music');

    var onBtn = document.getElementById('music-switch-on');
    var offBtn = document.getElementById('music-switch-off');

    offBtn.style.display = 'none';

    onBtn.addEventListener('click', function () {
        offBtn.style.display = 'block';
        onBtn.style.display = 'none';
        music.pause();
    }, false);

    offBtn.addEventListener('click', function () {
        onBtn.style.display = 'block';
        offBtn.style.display = 'none';
        music.play();
    }, false);
}

$(function () {
    const effects = [
        'slide', 'fade', 'cube', 'coverflow', 'flip'
    ];
    $('#slide').width($(window).width()).height($(window).height());

    var slider = new Swiper('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mode: 'vertical',
        effect: effects[Math.floor(effects.length * Math.random())]
    });
    initMusic();
});
</script>

<script src="../../asset/statics.js"></script>
</body>
</html>