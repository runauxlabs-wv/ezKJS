window.onload = function() {
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
    var iw = window.innerWidth;
    
    if(iw > 1199) {
        //PC nav 펼치기
        $('.nav > li').on('mouseenter focusin', function() {
            //bar 이동
            var thisoffset = $(this).offset().left;
            $('#navbar').show().stop().animate({left: thisoffset}, 200, "swing");
            //snb 펼치기
            $('.snb').eq($(this).index()).addClass('on').siblings().removeClass('on');
        }).on('mouseleave focusout', function() {
            $('#navbar').hide();
            $('.snb').removeClass('on');
        });
    } else {
        //모바일 nav 펼치기
        $('.menu').click(function() {
            $('.nav').addClass('on');
            if(iw < 768) {
                $('.reactmenu').addClass('on');
            }
        });
        //snb 펼치기
        $('.nav > li > a').click(function() {
            $('.snb').stop(false,true).slideUp(500);
            $(this).siblings('.snb').stop(true).slideToggle(500);
        });                
        //모바일 nav 닫기
        $('.menuclose').click(function() {
            $('.nav').removeClass('on');
            $('.snb').hide();
            if(iw < 768) {
                $('.reactmenu').removeClass('on');
            }
        });
    }

    //search 이동 애니메이션
    $('.searchbox').click(function() {
        $('.slide').addClass('on');
        $('.searchbox').stop().animate({top:20}, 500);
        $('html, body').animate({scrollTop:0}, 500);
    });

    $('.bg').click(function() {
        $('.searchbox').stop().animate({top:'40vw'}, 500);
        $('.slide, .subfrm').removeClass('on');
        $('.subfrm > div').hide();
        $('.stationFilter li').removeClass('on');
        $('.stationList').empty();
    });

    //subfrm 닫기
    $('.frmclose').click(function() {
        $('.subfrm').removeClass('on');
    });

    //스와이퍼
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });

    //마우스 오버시 일시정지
    $('.swiper-slide').mouseenter(function() {
        swiper.autoplay.stop();
    }).mouseleave(function() {
        swiper.autoplay.start();
    });


    //승차권종류 탭전환
    $('.ticket > li').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $('.tripInfoTicket p').removeClass('on');
        //역초기화
        $('#departure').html('출발역 입력');
        $('#destination').html('도착역 입력');
        //라디오초기화
        $('#straight').prop('checked', true);
        $('.roundtrip, .subfrm').removeClass('on');
        //탑승인원초기화
        $('#people span:last-child').empty().html('탑승인원');
        $('select[name=seat] option:eq(0), select[name=direction] option:eq(0), select[name=seatSort] option:eq(0)').prop("selected", true);
        $('.peopleOption :input').val('0');
        $('.minus').addClass('on').siblings().removeClass('on');
        peopleCheck = 0;
        //탭별 하위항목 숨기기
        var radio = $(this).index();
        $('.radiobtn span').show();
        $('#train option:eq(0)').prop("selected", true);
        $('#train option:eq(1)').html('KTX/SRT');
        if(radio == 0) {
            $('#t1, #train').addClass('on');
        } else if(radio == 1) {
            $('#t2, #train').addClass('on');
            $('.radiobtn span:last-child').hide();
            $('#t2 option:eq(0)').prop("selected", true);
            $('#train option:eq(1)').html('KTX');
        } else if(radio == 2) {
            $('#t3, #train').addClass('on');
            $('.radiobtn span:first-child').nextAll().hide();
            $('#train option:eq(1)').html('KTX').prop("selected", true);
        } else if(radio == 3){
            $('#traveltrain, #t4').addClass('on');
            $('.radiobtn span:last-child').hide();
            $('#traveltrain option:eq(0), #t4 option:eq(0)').prop("selected", true);
            $('#t4 select, #t4 select option').attr('disabled', false);
            $('#t4 select option:eq(4)').attr('disabled', true);
        }
    });

    //라디오버튼
    $("input[name='trip']").change(function() {
        if($('#roundtrip').prop('checked')) {
            $('.roundtrip').addClass('on');
        } else {
            $('.roundtrip').removeClass('on');
        }
    })

    //티켓옵션
    $('#t2 select, #train select').change(function() {
        var selected = $(this).val();

        if(selected == 'KTX 5000 특가') {
            $('#straight').prop('checked', true);
            $('.radiobtn span:first-child').nextAll().hide();
        } else {
            $('.radiobtn span:nth-child(2)').show();
        }        
    });

    $('#traveltrain select').change(function() {
        var selected = $(this).val();
        $('#t4 select, #t4 select option').attr('disabled', false);
        if(selected == '동해산타열차') {
            $('#t4 select option:nth-child(5)').attr('disabled', true);
        } else if(selected == '서해금빛열차') {
            $('#t4 select option:nth-child(1)').nextAll().attr('disabled', true);
            $('#t4 select option:nth-child(5)').attr('disabled', false);
        } else {
            $('#t4 select').attr('disabled', true);
        }
    });

    ////역 선택
    //역정보 불러오기
    var datalist;
    $.ajax({
        type: 'GET',
        url: '/portfolio/pd/json/station.json',
        // url: '../json/station.json',
        async: false,
        dataType: 'json',
        success: function(data) {
            datalist = data;
            //datalist 추가
            var option = '';
            $.each(data.all, function(i, obj) {
                option += '<option value="' + obj + '"</option>';
            });
            $('#station').append(option);
        }
    });

    //역목록
    var stationPoint;
    $('.tripInfoPoint p').click(function() {
        $('.subfrm').addClass('on');
        $('.whereStation').show().siblings().hide();
        $('#stationSearch').val('');
        if($(this).hasClass('start')) {
            stationPoint = 1;
            $('#stationSearch').attr('placeholder', '출발역 선택');
        } else {
            $('#stationSearch').attr('placeholder', '도착역 선택');
            stationPoint = 2;
        }
    });

    //가나다 필터
    $('.stationFilter li').click(function(event) {
        $(this).addClass('on').siblings().removeClass('on');
        $('.stationList').empty();
        //필터별 역 추가
        var station = '';
        var list = new Array('가','나','다','마','바','사','아','자','차','타','파','하');
        var listindex = eval('list[' + $(this).index() + ']');
        var filterlist = eval('datalist.' + listindex);
        $.each(filterlist, function(i, obj) {
            station += '<li>' + obj + '</li>';
        });
        $('.stationList').append(station);
        event.stopPropagation();
    });

    //리스트에서 역 클릭
    $(document).on('click', '.popularStation li, .stationList li', function() {
        if(stationPoint == 1) {
            $('#departure').html($(this).text());
        } else {
            $('#destination').html($(this).text());
        }
        $('.subfrm').removeClass('on');
    });

    //리스트에서 역검색
    $(document).on('change', '#stationSearch', function() {
        if(stationPoint == 1) {
            $('#departure').html($(this).val());
        } else {
            $('#destination').html($(this).val());
        }
        $('.subfrm').removeClass('on');
    });

    ////탑승인원
    //인원선택창
    $('#people').on('click focusin', function() {
        $('.subfrm').addClass('on');
        $('.howPeople').show().siblings().hide();
    });

    //인원선택창 버블링 방지
    $('#stationSearch, .howPeople').click(function(event) {
        event.stopPropagation();
    });
    
    // + - input 직접입력
    $('.age input[type=text]').on('change keyup focusin', function() {
        var adult = Number($('#adult').val());
        var children = Number($('#children').val());
        var senior = Number($('#senior').val());
        var baby = Number($('#baby').val());
        var Lsum = adult+children+senior+baby;

        if($(this).val() <= 0) {
            $(this).val('0');
            $(this).prev().addClass('on').end().next().removeClass('on');
        } else if($(this).val() > 0 && $(this).val() < 9) {
            if(Lsum < 9) {
                $(this).siblings().removeClass('on');
                $('.age .plus').removeClass('on');
            } else if(Lsum == 9 ) {
                $('.age .plus').addClass('on');
                $(this).siblings('.minus').removeClass('on');
            } else {
                $(this).val('0');
                alert('탑승인원은 성인, 어린이, 유아, 경로를 포함하여 9명을 넘을 수 없습니다')
            }
        } else {
            if(Lsum < 9) {
                $(this).val('9');
                $(this).next().addClass('on').end().prev().removeClass('on');
            } else if(Lsum == 9 ) {
                $('.age .plus').addClass('on');
            } else {
                $(this).val('0');
                alert('탑승인원은 성인, 어린이, 유아, 경로를 포함하여 9명을 넘을 수 없습니다')
            }
        }
    });
    // + - 버튼작동
    $('.age h2 span').click(function() {
        var adult = Number($('#adult').val());
        var children = Number($('#children').val());
        var senior = Number($('#senior').val());
        var baby = Number($('#baby').val());
        var Lsum = adult+children+senior+baby;
        
        var $input = $(this).siblings('input[type=text]');
        if($(this).hasClass('minus') && $input.val() > 0) {
            if(Lsum > 0) {
                $input.val($input.val()-1);
                if($input.val() == 0) {
                    $(this).addClass('on');
                } else if($input.val() == 8) {
                    $(this).siblings('span').removeClass('on');
                }
            }
            if(Lsum == 9) {
                $('.age .plus').removeClass('on');
            }
        } else if ($(this).hasClass('plus') && $input.val() < 9) {
            if(Lsum < 9) {
                $input.val(Number($input.val())+1);
                if($input.val() == 9) {
                    $(this).addClass('on');
                } else if($input.val() == 1) {
                    $(this).siblings('span').removeClass('on');
                }
            }
            if(Lsum == 8) {
                $('.age .plus').addClass('on');
            }
        }
    });
    $('.disabled h2 span').click(function() {
        var $input = $(this).siblings('input[type=text]');
        if($(this).hasClass('minus') && $input.val() > 0) {
            $input.val($input.val()-1);
            if($input.val() == 0) {
                $(this).addClass('on');
            } else if($input.val() == 8) {
                $(this).siblings('span').removeClass('on');
            }
        } else if ($(this).hasClass('plus') && $input.val() < 9) {
            $input.val(Number($input.val())+1);
            if($input.val() == 9) {
                $(this).addClass('on');
            } else if($input.val() == 1) {
                $(this).siblings('span').removeClass('on');
            }
        }
    });


    //리셋
    $('#peoReset').click(function() {
        $('select[name=seat] option:eq(0), select[name=direction] option:eq(0), select[name=seatSort] option:eq(0)').prop("selected", true);
        $('.peopleOption :input').val('0');
        $('.minus').addClass('on').siblings().removeClass('on');
    });

    //전송
    var peopleCheck;
    $('#peoSubmit').click(function() {
        var seat = $('select[name=seat]').val();
        var direction = $('select[name=direction]').val();
        var seatSort = $('select[name=seatSort]').val();
        var adult = Number($('#adult').val());
        var children = Number($('#children').val());
        var senior = Number($('#senior').val());
        var baby = Number($('#baby').val());
        var mild = Number($('#mild').val())
        var severe = Number($('#severe').val())
        var Lsum = adult+children+senior+baby;
        var Rsum = mild+severe;
            
        if(Lsum == 0) {
            alert('탑승인원을 입력해주세요');
            peopleCheck = 0;
        } else {
            var seatvalue = seat + ' / ' + direction + ' / ' + seatSort;
            $('#people span:first-child').html(seatvalue);
            $('#people span:last-child').empty();
            if(adult > 0) {
                $('#people span:last-child').append('성인 ' + adult);
            }

            if(adult == 0 && children > 0) {
                $('#people span:last-child').append('어린이 ' + children);
            } else if (children > 0) {
                $('#people span:last-child').append(', 어린이 ' + children);
            }

            if(adult == 0 && children == 0 && baby > 0) {
                $('#people span:last-child').append('유아 ' + baby);
            } else if (baby > 0) {
                $('#people span:last-child').append(', 유아 ' + baby);
            }
            
            if(adult == 0 && children == 0 && baby == 0 && senior > 0) {
                $('#people span:last-child').append('경로 ' + senior);
            } else if(senior > 0) {
                $('#people span:last-child').append(', 경로 ' + senior);
            } 

            if(Rsum > 0) {
                if(Lsum >= Rsum) {
                    if(mild > 0 && severe == 0) {
                        $('#people span:last-child').append(' (장애 경 ' + mild + ')');
                    } else if(mild == 0 && severe > 0) {
                        $('#people span:last-child').append(' (장애 중 ' + severe + ')');
                    } else {
                        $('#people span:last-child').append(' (장애 경 ' + mild + ', 중 ' + severe + ')');
                    }
                    $('.subfrm').removeClass('on');
                } else {
                    alert('장애정도의 합이 탑승인원보다 많을 수 없습니다');
                }
            } else {
                $('.subfrm').removeClass('on');
            }
            peopleCheck = 1;
        }
    });

    //조회클릭시 입력정보확인
    $('.searchbtn').click(function() {
        var departure = $('#departure').text();
        var destination = $('#destination').text();
        if(departure == '출발역 입력' || destination == '도착역 입력' || peopleCheck != 1) {
            alert('출발역, 도착역, 시간, 탑승인원을 모두 입력했는지 확인해주세요')
        } else if (departure === destination) {
            alert('출발역과 도착역은 같을 수 없습니다')
        } else {
            alert('조회 기능은 준비중입니다')
        }
    });


    //패밀리 사이트
    var sitego = document.getElementById('siteGo');

    function siteLink() {
        var choice = document.getElementById('familyselect').value;
        if(choice != "") {
            window.open(choice, '_blank');
        };
    };

    sitego.addEventListener('click',siteLink);


















    
}