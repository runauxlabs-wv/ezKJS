window.onload = () => {

    //브라우저 크기조절 리프레시
    var lastWidth = $(window).width();
    $(window).resize(function() {
        if ($(window).width() != lastWidth) {
            location.reload();
            lastWidth = $(window).width();
            return false;
        }
    });

    var iw = window.innerWidth;
    if(iw >= 1200) {
        $('section').mouseenter(function() {
            $(this).find('.set').addClass('on');
        }).mouseleave(function() {
            $(this).find('.set').removeClass('on');
        });
    }
}