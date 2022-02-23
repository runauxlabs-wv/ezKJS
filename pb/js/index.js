window.onload = function() {
    
    //배경슬라이드
    $('.background > img:gt(0)').hide();
    setInterval(function() {
        $('.background > img:first').fadeOut(2000).next().fadeIn(2000).end().appendTo('.background');
    }, 6000);

    //섹션1
    var swiper1 = new Swiper(".Swiper1", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    
    //섹션2
    var swiper2 = new Swiper(".Swiper2", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });

    //책들
    var swiper = new Swiper(".contents", {
        direction: "vertical",
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        observer: true,
        observeParents: true,
    });

    //공지사항 변경버튼
    $('.selectbox > p').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $('.plusview > p').eq($(this).index()).addClass('on').siblings().removeClass('on');
        $('.box3 > ul').eq($(this).index()).addClass('on').siblings().removeClass('on');
    });

    //책 탭 변경버튼
    $('.filter > li').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $('.contents').eq($(this).index()).addClass('on').siblings().removeClass('on');
    });

    //패밀리사이트 이동
    var sitego = document.getElementById('go');

    function siteLink() {
        var choice = document.getElementById('select').value;
        if(choice != "") {
            window.open(choice, '_blank');
        };
    };

    sitego.addEventListener('click',siteLink);


    //탑으로가자~
    $(window).scroll(function(){
        if($(this).scrollTop() > 100) {
            $('.toTop').fadeIn(500).css('display','flex');
        } else {
            $('.toTop').fadeOut(300);
        };
    });

    $('.toTop').click(function() {
        $('html, body').animate({
            scrollTop : 0
        },500);
    });



    setInterval(function() {
        $(".ogrcht").toggleClass("on"); 
    }, 800);
}