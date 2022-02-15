window.onload = function() {

    //계산기 선택
    $('.title').click(function() {
        $('.calculator > div').eq($(this).index()).addClass('on').siblings().removeClass('on');
        $('header .inner').stop(true).slideUp(300);
        $('.menubtn').removeClass('active');
        reset();
    });


    //초기화
    function reset() {
        $('.calculator :input').val('');
        $('.changer :input').val('1');
        $('.selector li:first').addClass('on').siblings().removeClass('on');
        $('.length').addClass('on').siblings().removeClass('on');
        $('.spec, #retiremoney, #average, #holidaymoney').empty();
        $('.insurResult span').html('0');
        list = list0;
        lengthVal = 1;
        input = 1;
        TRL();
        $('.workperson select option:eq(0)').prop("selected", true);
    };

    //nav여닫
    $('.menubtn').click(function() {
        if($(this).hasClass('active')) {
            $('header .inner').stop(true).slideUp(300);
            $(this).removeClass('active');
        } else {
            $('header .inner').stop(true).slideDown(300);
            $(this).addClass('active');
        }
    });

    //숫자만입력
    var inNumber = function() {
        this.value = this.value.replace(/[^-0-9]/g,'');
    };
    var inputNumber = document.querySelectorAll('#pay, #pluspay, #vacapay, .calList input, #insurpay, #after, #dDay, #dateinput, #hourpay');

    Array.prototype.forEach.call(inputNumber, function(eachInput) {
        eachInput.addEventListener('keyup', inNumber);
    });

    //날짜 하이픈
    var Hyphen = function() {
        this.value = this.value.replace(/[^-0-9]/g,'').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    };
    var dates = document.querySelectorAll('#datepicker1, #datepicker2, #datepicker3, #dateinput');

    Array.prototype.forEach.call(dates, function(eachdate) {
        eachdate.addEventListener('keyup', Hyphen);
    });

    //////도량계산기
    
    //도량변환 필터
    $('.selector li').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        $('.calList > div').eq($(this).index()).addClass('on').siblings().removeClass('on');
        $('.changer :input').val('1');
        list = eval('list' + $(this).index());
        lengthVal = 1 / $('.calList > div').eq($(this).index()).find('select').val();
        input = $('.calList > div').eq($(this).index()).find('input').val();
        TRL();
    });

    var list0 = [{"name": "밀리미터(mm)","value": "0.1"},{"name": "센티미터(cm)","value": "1"},{"name": "미터(m)","value": "100"},{"name": "킬로미터(km)","value": "100000"},{"name": "인치(in)","value": "2.5399986284007405"},{"name": "피트(ft)","value": "30.480370641307"},{"name": "야드(yd)","value": "91.441111923921"},{"name": "마일(mile)","value": "161290.3225806452"},{"name": "리(里)","value": "40000"}];
    var list1 = [{"name":"제곱미터(m<sup>2</sup>)", "value":"1"},{"name":"아르(a)", "value":"10"},{"name":"헥타르(ha)", "value":"10000"},{"name":"제곱킬로미터(km<sup>2</sup>)", "value":"1000000"},{"name":"에이커(ac)", "value":"4048.582995951417"},{"name":"평", "value":"3.305785123966942"}];
    var list2 = [{"name":"밀리그램(mg)", "value":"0.000001"},{"name":"그램(g)", "value":"0.001"},{"name":"킬로그램(kg)", "value":"1"},{"name":"톤(t)", "value":"1000"},{"name":"온스(oz)", "value":"0.028349523084478"},{"name":"파운드(lb)", "value":"0.4535922921968972"},{"name":"돈", "value":"0.0037499999953125"},{"name":"근", "value":"0.599999880000024"}];
    var list3 = [{"name":"cc", "value":"0.001"},{"name":"밀리미터(mL)", "value":"0.001"},{"name":"리터(L)", "value":"1"},{"name":"갤런(gal)", "value":"3.785412534257983"},{"name":"배럴(bbl)", "value":"158.9067217543302"},{"name":"온스(oz)", "value":"0.0295735301763274"}];
    var list4 = [{"name":"m/s", "value":"1"},{"name":"m/h", "value":"277.77777777777777"},{"name":"km/s", "value":"1000"},{"name":"km/h", "value":"0.277777777777777"},{"name":"노트(kn)", "value":"0.5144445747704034"},{"name":"마하(mach)", "value":"340.0204012240734"}];
    var list = list0;

    //계산
    $('.calList select').change(function() {
        lengthVal = 1 / $(this).val();
        input = $(this).prev().val();
        TRL();
    }); //단위선택

    $('.calList input').keyup(function(){
        lengthVal = 1 / $(this).next().val();
        input = $(this).val();
        TRL();
    }); //키보드입력

    function TRL() {
        var cm = input * lengthVal;

        $('.calList .spec').empty();

        var elem = "";
        $.each(list, function(idx, i) {
            var result = cm / i.value;
            if(parseFloat(result.toFixed(1)).toString().length > 9) {
                elem += '<p><span>' + parseFloat(result.toFixed(6)).toExponential(2) + '</span> <span>' + i.name + '</span></p>';
            } else {
                elem += '<p><span>' + parseFloat(result.toFixed(6)) + '</span> <span>' + i.name + '</span></p>';
            }
        });
        
        $('.spec').append(elem);
    };

    //세자리마다 콤마
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    
    //////퇴직금

    //달력
    $(function() {
        $('#datepicker1, #datepicker2, #datepicker3').datepicker({
            showOn: "button",
            // buttonImage: "/ez210927/kjs/pc/img/cal.png",
            buttonImage: "./img/cal.png",
            buttonImageOnly: true,
            buttonText: "달력",
            dateFormat: "yy-mm-dd",
            showMonthAfterYear:true,
            showOtherMonths: true,
            changeYear: true,
            yearRange: '1980:2030',
            changeMonth: true,
            monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
        });
        // $('#datepicker1').datepicker('setDate', '-1Y');
        // $('#datepicker2').datepicker('setDate', 'today');
    });

    //달력 정규식
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    
    $('#datepicker1, #datepicker2, #datepicker3, #dateinput').on("keyup change", function() {
        if(!regex.test($(this).val())) {
            $(this).parent().addClass('on');
        } else {
            $(this).parent().removeClass('on');
        }
    });
    
    //날짜계산
    $('#datepicker1, #datepicker2').change(function() {
        var start = $('#datepicker1').val();
        var end = $('#datepicker2').val();
        
        var start_Array = start.split('-');
        var end_Array = end.split('-');
                
        var start_date = new Date(start_Array[0], Number(start_Array[1]-1), start_Array[2]);
        var end_date = new Date(end_Array[0], Number(end_Array[1]-1), end_Array[2]);
        
        var rbetween = (end_date.getTime() - start_date.getTime())/1000/60/60/24;

        if (start_date > end_date) {
            alert('퇴사일이 입사일보다 빠를 수 없습니다.');
            $(this).val('');
        } else if (rbetween < 365) {
            alert('근무일수가 365일 미만인 경우 수급자격이 없습니다. 날짜를 확인해주세요.');
            $(this).val('');
        } else {
            $('.repay p').removeClass('on');
        }
    });

    //날짜부터 넣어주세요
    $('#pay').focus(function() {
        if(!$('#datepicker1').val()) {
            $('.indateselect').addClass('on');
            $('#datepicker1').focus();
        } else if ($('#datepicker1').val() && !$('#datepicker2').val()) {
            $('.outdateselect').addClass('on').siblings().removeClass('on');
            $('#datepicker2').focus();
        }
    });

    //금액계산
    $('#pay, #pluspay, #vacapay').on('keyup focus', function() {
        numberWithCommas($(this).val());
        var start = $('#datepicker1').val();
        var end = $('#datepicker2').val();
        
        var start_Array = start.split('-');
        var end_Array = end.split('-');
                
        var start_date = new Date(start_Array[0], Number(start_Array[1]-1), start_Array[2]);
        var end_date = new Date(end_Array[0], Number(end_Array[1]-1), end_Array[2]);
        var recent_date = new Date(end_Array[0], Number(end_Array[1]-4), end_Array[2]);

        var rbetween = (end_date.getTime() - start_date.getTime())/1000/60/60/24;
        var recently = (end_date.getTime() - recent_date.getTime())/1000/60/60/24;

        var a = Number($('#pay').val()*3);
        var b = Number($('#pluspay').val());
        var c = Number($('#vacapay').val());
        var pay = Math.floor((((a+b+c)/recently)*30)*(rbetween/365));

        if($('#pay').val() >= 10 && regex.test($('#datepicker2').val())) {
            $('#retiremoney').html(numberWithCommas(pay));
            $('#average').html(numberWithCommas(Math.floor((a+b+c)/recently)));
        } else if ($('#pay').val() == "") {
            $('#retiremoney').html('');
            $('#average').html('');
        }
    });
    

    //////4대보험

    $('#insurpay').keyup(INS);
    $('.workperson select').change(INS);

    function INS() {
        var pay = document.querySelector('#insurpay').value;
        var perNum = document.querySelector('.workperson select').value;

        var pension = Math.floor((pay*0.045)/10)*10;
        if(pension <= 14850) {
            pension = 14850;
        } else if (pension >= 235800) {
            pension = 235800;
        };
        var health = Math.floor((pay*0.03495)/10)*10;
        if(health <= 9750) {
            health = 9750;
        } else if (health >= 1826775) {
            health = 1826775;
        };
        var care = Math.floor((health*0.1227)/10)*10;
        var hireP = Math.floor((pay*0.008)/10)*10;
        var hireC = Math.floor(pay*(0.008 + Number(perNum))/10)*10;

        $('.insurResult tr:eq(1) span').html(numberWithCommas(pension));
        $('.insurResult tr:eq(1) td:last-child span').html(numberWithCommas(pension*2)+'원');
        $('.insurResult tr:eq(2) span').html(numberWithCommas(health));
        $('.insurResult tr:eq(2) td:last-child span').html(numberWithCommas(health*2)+'원');
        $('.insurResult tr:eq(3) span').html(numberWithCommas(care));
        $('.insurResult tr:eq(3) td:last-child span').html(numberWithCommas(care*2)+'원');
        $('.insurResult tr:eq(4) td:nth-child(2) span').html(numberWithCommas(hireP));
        $('.insurResult tr:eq(4) td:nth-child(3) span').html(numberWithCommas(hireC));
        $('.insurResult tr:eq(4) td:last-child span').html(numberWithCommas(hireP + hireC)+'원');
        $('.insurResult tr:eq(5) td').html('총 ' + numberWithCommas((pension + health + care)*2 + hireP + hireC) + '원');
    };


    //////디데이
    
    //기준일의 요일과 남은날짜
    $('#datepicker3').on("keyup change", function() {
        if(regex.test($(this).val())) {
            btwTime();
        }
    });
    
    var howday = document.querySelector('#howday');
    
    function btwTime() {
        var pickdate = $('#datepicker3').val();
        var week = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
        var dayOfweek = week[new Date(pickdate).getDay()];

        var pickdate_Array = pickdate.split('-');
        var pickdate_date = new Date(pickdate_Array[0], Number(pickdate_Array[1]-1), pickdate_Array[2]);

        var today = new Date();
        var nyear = today.getFullYear();
        var nmonth = today.getMonth();
        var ndate = today.getDate();
        var now = new Date(nyear, nmonth, ndate);

        var dbetween = (now.getTime() - pickdate_date.getTime())/1000/60/60/24;

        if(dbetween < 0) {
            howday.innerHTML = '기준일은 <span>' + dayOfweek + '</span>이며, 오늘로부터 <span>' + Math.abs(dbetween) + '</span>일 남았습니다.';
        } else if (dbetween > 0) {
            howday.innerHTML = '기준일은 <span>' + dayOfweek + '</span>이며, 오늘로부터 <span>' + Math.floor(dbetween) + '</span>일 전입니다.';
        } else {
            howday.innerHTML = '기준일은 <span>' + dayOfweek + '</span>이며, 오늘입니다.';
        };
    };
    
    //날짜계산
    //남은날
    function afterdate() {
        var pickdate = $('#datepicker3').val();
        var pickdate_Array = pickdate.split('-');
        
        var after = Number(document.querySelector('#after').value);
        var afterresult = document.querySelector('#afterresult');
        var result = new Date(pickdate_Array[0], Number(pickdate_Array[1]-1), Number(pickdate_Array[2]) + after);
        
        var year = result.getFullYear();
        var month = result.getMonth();
        var date = result.getDate();

        if(!pickdate) {
            alert('기준일을 입력해주세요.');
        } else {
            afterresult.value = year + '년' + month+1 + '월' + date + '일';
        }
    };
    var btn1 = document.querySelector('#btn1')
    btn1.addEventListener('click', afterdate);
    
    //전날
    function dDaydate() {
        var pickdate = $('#datepicker3').val();
        var pickdate_Array = pickdate.split('-');
        
        var dDay = Number(document.querySelector('#dDay').value);
        var dDayresult = document.querySelector('#dDayresult');
        var result = new Date(pickdate_Array[0], Number(pickdate_Array[1]-1), Number(pickdate_Array[2]) - dDay);
        
        var year = result.getFullYear();
        var month = result.getMonth();
        var date = result.getDate();

        if(!pickdate) {
            alert('기준일을 입력해주세요.');
        } else {
            dDayresult.value = year + '년' + month+1 + '월' + date + '일';
        }
    };
    
    var btn2 = document.querySelector('#btn2')
    btn2.addEventListener('click', dDaydate);

    //그날까지는
    function dateinputdate() {
        var pickdate = $('#datepicker3').val();
        var dateinput = document.querySelector('#dateinput').value;

        var pickdate_Array = pickdate.split('-');
        var dateinput_Array = dateinput.split('-');
        
        var pickdate_date = new Date(pickdate_Array[0], Number(pickdate_Array[1]-1), pickdate_Array[2]);
        var dateinput_date = new Date(dateinput_Array[0], Number(dateinput_Array[1]-1), dateinput_Array[2]);

        var result = (dateinput_date.getTime() - pickdate_date.getTime())/1000/60/60/24;

        var dateinputresult = document.querySelector('#dateinputresult');

        if(!pickdate) {
            alert('기준일을 입력해주세요.');
        } else {
            if(!regex.test(dateinput)) {
                alert('입력한 날짜가 잘못되었습니다. 0100년 1월 1일 부터 입력할 수 있습니다.');
            } else {
                dateinputresult.value = Math.floor(result) + '일';
            }
        }
    };

    var btn3 = document.querySelector('#btn3')
    btn3.addEventListener('click', dateinputdate);


    //////주휴수당

    $('.info').click(function() {
        $('.whatholiday').show();
    });

    $('.close').click(function() {
        $('.whatholiday').hide();
    });

    $('.whatholiday').click(function(e) {
        // console.log($(this).has(e.target).length);
        if($(this).has(e.target).length === 0 ) {
            $('.whatholiday').hide();
        }
    });

    //옵션추가
    for(var i = 15; i <= 40; i++) {
        frm.hour.add(new Option(i + '시간', i));
    };

    for(var i = 0; i <= 5; i++) {
        var j = 10 * i;
        frm.minute.add(new Option(j + '분', j));
    };

    //40시간일때 분 숨기기
    $('#hour').change(function() {
        if($(this).val() == 40) {
            $("#minute option[value='0']").nextAll().hide();
        } else {
            $("#minute option[value='0']").nextAll().show();
        }
    });

    //수당계산
    $('#holresult').click(function() {
        if(!$('#hour').val()) {
            $('.hourselect').addClass('on');
            $('#holidaymoney').html('');
        } else if($('#hour').val() && !$('#minute').val()) {
            $('.hourselect').removeClass('on');
            $('.minuteselect').addClass('on');
            $('#holidaymoney').html('');
        } else {
            if($('#hourpay').val() < 9160) {
                alert('2022년의 최저시급은 9,160원 입니다. 시급을 확인해주세요.')
            } else {
                var hour = Number($('#hour').val()*60);
                var minute = Number($('#minute').val());
                var money = Math.floor(((((hour+minute)/2400)*480*$('#hourpay').val())/60)/10)*10;
                $('.hourselect, .minuteselect').removeClass('on');
                $('#holidaymoney').html(numberWithCommas(money));
            }
        }
    });



}