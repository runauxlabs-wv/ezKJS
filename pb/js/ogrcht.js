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

    //조직도 이벤트
    $.ajax({
        type: 'GET',
        url: '/portfolio/pb/json/list.json',
        // url: '../json/list.json',
        dataType: 'json',
        success: function(data) {
            var elem = '';

            $.each(data, function(index, obj) {
                // elem += `<tr>`
                // elem += `<th>${obj.department}</th>`
                // elem += `<th>${obj.name}</th>`
                // elem += `<th>${obj.rank}</th>`
                // elem += `<th>${obj.research}</th>`
                // elem += `<th>${obj.tel}</th>`
                // elem += `<th>${obj.email}</th>`
                // elem += `</tr>`
                elem += '<tr>';
                elem += '<th>' + obj.department + '</th>'
                elem += '<th>' + obj.name + '</th>'
                elem += '<th>' + obj.rank + '</th>'
                elem += '<th>' + obj.research + '</th>'
                elem += '<th>' + obj.tel + '</th>'
                elem += '<th>' + obj.email + '</th>'
                elem += '</tr>'
            });
            
            var val;
            
            $('.conbody li, .conbody h6, .conbody p').click(function() {
                val = 1;
                $('.detail tbody').empty();
                $('.detail tbody').append(elem);//모달 표
            });

            $('.confooter .button').click(function() {
                val = 2;
                if(val === 1) {
                    $('.detail').show().css('display','flex');
                } else if (val === 2) {
                    // 빈칸확인
                    var search = $('form input');
                    if(!search.val()) {
                        alert('검색어를 입력해주세요');
                        return false;
                    } else {                 
                        $('.confooter tbody').empty();
                        $('.confooter tbody').append(elem); //게시판 표
                    }
                }
                return false;
            });
        }
    });

    $('.conbody li, .conbody h6, .conbody p').click(function() {
        $('.detail').show().css('display','flex');
    });

    $('.detail').click(function(e) {
        // console.log($(this).has(e.target).length);
        if($(this).has(e.target).length === 0 ) {
            $('.detail').hide();
        }
    });



    //프린트
    $('.fa-print').parent().click(function() {
        window.print();
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
}