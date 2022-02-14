window.onload = () => {
    
    //지도호출
    initMap();
    addMakers(map);
    

    //정보 불러오기
    // $('.kankouspot').append(spot);
    // $('.kankoudetail').append(elem);

    //리모콘 스크롤
    $('header nav p, .menu a').each(function() {
        $(this).click(function() {
            var thisOffset = $("#" + $(this).attr('data-id')).offset().top - $('header').innerHeight();
            $('html, body').stop(true).animate({
                scrollTop: thisOffset
            }, 1000);
        });
    });

    $('.headlogo').click(function() {
        $('html, body').stop(true).animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    //필터
    var contents = $('.kankouspot > div');
        
    $('.filter > p').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        contents.addClass('off');
        $('.'+$(this).attr('id')).removeClass('off');
    });
    
    $('#allselect').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        contents.removeClass('off');
    });

    //모바일 스와이퍼
    let iw = window.innerWidth;
    if (iw < 768) {
        var swiper = new Swiper(".mySwiper", {
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });
        //모바일 nav
        $('.menu').click(function() {
            $('.menu ul').stop(true).slideToggle(500);
        });
    };

    //브라우저 크기조절 리프레시
    var lastWidth = window.innerWidth;

    function changeWinRefresh() {
        if (window.innerWidth != lastWidth) {
            window.location = window.location;
            lastWidth = window.innerWidth;
            return false;
        }
    }
    window.addEventListener('resize', changeWinRefresh);

    //스팟클릭이벤트
    $('.kankouspot > div').click(function() {
        $('.kankoudetail').addClass('on');
        $('#' + $(this).attr('data-id')).addClass('on').siblings().removeClass('on')
    });

    $('.overlay > p:first-child').click(function() {
        $('.kankoudetail').removeClass('on');
    });

    $('.info').click(function () {
        $('.kankoudetail').addClass('on');
        $('#' + $(this).attr('data-id')).addClass('on').siblings().removeClass('on')
    });

    $('.kankoudetail').click(function(e) {
        // console.log($(this).has(e.target).length);
        if($(this).has(e.target).length === 0 ) {
            $('.kankoudetail').removeClass('on');
        }
    });

    //코스 도시 전환 스위치
    $('.switch').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $('.swiper').eq($(this).index()).addClass('on').siblings().removeClass('on');
    });


    //말풍선
    $('.schedule').hover(function(){
        $(this).find('.access').toggleClass('on');
    });
}