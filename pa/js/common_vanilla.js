window.onload = () => {
    //지도호출
    initMap();
    addMakers(map);

    //리모콘 스크롤
    const nav = document.querySelectorAll('header nav p');
    const menu = document.querySelectorAll('.menu a');
    const header = document.querySelector('header');

    for(var i=0; i < nav.length; i++) {
        nav[i].addEventListener('click', function() {
            var thisId = eval(this.dataset.id);
            var thisOffset = thisId.offsetTop - header.offsetHeight;
            
            window.scroll({
                behavior: "smooth",
                top: thisOffset,
            })
        })

        menu[i].addEventListener('click', function() {
            var thisId = eval(this.dataset.id);
            var thisOffset = thisId.offsetTop - header.offsetHeight;
            
            window.scroll({
                behavior: 'smooth',
                top: thisOffset,
            })
        })
    }

    const headlogo = document.querySelector('.headlogo');
    headlogo.addEventListener('click', function(event) {
        window.scroll({
            behavior: 'smooth',
            top: 0,
        })
        event.preventDefault();
    });

    //필터
    const filter = document.querySelectorAll('.filter p');
    const spot = document.querySelectorAll('.kankouspot > div');
    for(var i=1; i < filter.length; i++) {
        filter[i].addEventListener('click', function() {
            for(let sibling of this.parentNode.children) {
                sibling.classList.remove('on');
                this.classList.add('on');
            }
            
            for(let kankouspot of spot) {
                kankouspot.classList.add('off');
            }
            $('.'+$(this).attr('id')).removeClass('off');
        });
    }

    filter[0].addEventListener('click', function() {
        for(let sibling of this.parentNode.children) {
            sibling.classList.remove('on');
        }
        this.classList.add('on');

        for(let kankouspot of spot) {
            kankouspot.classList.remove('off');
        }
    });


    //모바일 스와이퍼
    let iw = window.innerWidth;
    if (iw < 768) {
        var swiper = new Swiper(".kobestart", {
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

    //스팟클릭이벤트
    $(document).on('click', '.kankouspot > div', function () {
        $('.kankoudetail').addClass('on');
        $('#' + $(this).attr('data-id')).addClass('on').siblings().removeClass('on')
    });

    $(document).on('click', '.overlay > p:first-child', function () {
        $('.kankoudetail').removeClass('on');
    });

    $(document).on('click', '.info', function () {
        $('.kankoudetail').addClass('on');
        $('#' + $(this).attr('data-id')).addClass('on').siblings().removeClass('on')
    });

    $(document).on('click', '.kankoudetail', function(e) {
        if($(this).has(e.target).length === 0 ) {
            $('.kankoudetail').removeClass('on');
        }
    });

    //코스 도시 전환 스위치
    var changebtn = document.querySelectorAll('.switch');
    for(var i=0; i < changebtn.length; i++) {
        changebtn[i].addEventListener('click', function(event) {
            for(let sibling of changebtn) {
                sibling.classList.remove('on');
                this.classList.add('on');
            }
            var idx = Array.from(changebtn).indexOf(event.currentTarget);
            var city = document.querySelectorAll('.swiper');
            for(let sibling of city) {
                sibling.classList.remove('on');
                city[idx].classList.add('on');
            }
        })
    }

    //말풍선
    var schedule = document.querySelectorAll('.schedule');
    for(var i=0; i < schedule.length; i++) {
        schedule[i].addEventListener('mouseenter', function() {
            var access = this.querySelector('.access');
            access.classList.add('on');
        })
        schedule[i].addEventListener('mouseleave', function() {
            var access = this.querySelector('.access');
            access.classList.remove('on');
        })
    }

    // //브라우저 크기조절 리프레시
    var lastWidth = window.innerWidth;

    function changeWinRefresh() {
        if (window.innerWidth != lastWidth) {
            window.location = window.location;
            lastWidth = window.innerWidth;
            return false;
        }
    };
    window.addEventListener('resize', changeWinRefresh);


    
}