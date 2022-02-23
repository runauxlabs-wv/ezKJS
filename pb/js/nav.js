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

//nav
$('.sec1top > .inner').mouseenter(function() {
    $(".sec1top").addClass('on');
}).mouseleave(function() {
    $(".sec1top").removeClass('on');
});

$('.menuicon').click(function() {
    if($('.menuicon').hasClass('fa-bars')) {
        $('.menu, .member div').addClass('on');
        $(this).removeClass('fa-bars').addClass('fa-times').css('color', '#005BAB');
    } else {
        $('.menu, .member div').removeClass('on');
        $(this).removeClass('fa-times').addClass('fa-bars').css('color', 'white');
    }
});

var iw = innerWidth;
if(iw > 1199) {
    $('.gnb > li').on('mouseenter focusin', function() {
        $(this).children('.snb').addClass('on');
    }).on('mouseleave focusout', function() {
        $(this).children('.snb').removeClass('on');
    });
} else {
    $('.snb').hide();
    $('.gnb > li > a').click(function(event) {
        $(this).next().stop(true).slideToggle();
        $('.gnb > li > a').not(this).next().stop(false,true).slideUp();
        return false
    });
    $('p').has('.fa-print').hide(); //프린트 숨김
};