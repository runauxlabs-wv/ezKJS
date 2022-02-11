window.onload = function () {

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
    
    //리모콘
    $('.nav-container a').click(function() {
        var thisOffset = $('section').eq($(this).index()).offset().top;
        $('html, body').stop().animate({scrollTop: thisOffset}, 800, "swing");
        return false;
    });

    var iw = window.innerWidth;
    $(window).scroll(function() {
        if(iw > 767) {
            var height = $('.nav-container').height();
            if($(this).scrollTop() > height) {
                $('.nav-container').addClass('on');
            } else {
                $('.nav-container').removeClass('on');
            }
        }
    });

    //모바일 리모콘
    if(iw < 768) {
        $('.menu').click(function() {
            $('.nav-container').slideToggle(500);
        });

        $('.nav-tab').click(function() {
            $('.nav-container').slideUp(500);
        });
    }

    //works
    var swiper = new Swiper(".works", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    $('.imgbox').mouseenter(function() {
        $(this).find('.img2').addClass('on');
    }).mouseleave(function() {
        $(this).find('.img2').removeClass('on');

    });

    //메일보내기
    emailjs.init("user_Cg4T7iW4Ox0GnOneLi9Vn");

    $('.submitbtn').click(function() {
        var $name = $('input[name=name]').val();
        var $phone = $('input[name=phone]').val();
        var $email = $('input[name=email]').val();
        var $message = $('textarea').val();
        var templateParams = {
            from_name: '포트폴리오',
            name: $name,
            phone: $phone, 
            email : $email,
            message : $message
        };

        if(!$name || !$phone || !$email) {
            alert('성함과 이메일주소, 연락처를 입력했는지 확인해주세요')
        } else {
            emailjs.send("service_visd03x","template_z99ds5s",templateParams);
            alert('정상적으로 전송되었습니다!')
        }
    });



    particlesJS("bg", {
        "particles": {
            "number": {
                "value": 20,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1.0557003759917487,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 250,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": false
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
};
