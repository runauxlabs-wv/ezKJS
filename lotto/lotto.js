window.onload = () => {
    const 몇번나왔냐 = document.querySelector('.about');
    function about() {
        var num = '';
        for(var i=1; i<=45; i++) {
            num += `<p>${i}번 = <span>0</span> 회</p>`
        }
        몇번나왔냐.innerHTML = num;
    }
    about();

    const 추첨결과 = document.querySelector('.result');


    var n = 1;
    function 로또생성기() {
        const 횟수리스트 = document.querySelectorAll('.about p span');
        var 횟수리스트배열 = new Array();
        for(var v=0; v<45; v++) {
            횟수리스트배열.push(횟수리스트[v].textContent);
        }

        var lotto = [];

        for(var i=0; i<6; i++) {
            var num = Math.floor(Math.random() * 45) + 1;

            for(var j in lotto) {
                while(num == lotto[j] || num > 45) {
                    num = Math.floor(Math.random() * 45) + 1;
                }
            }
            lotto.push(num);
        }
        lotto.sort(function(a,b) {
            return a-b;
        });

        var atari = '';
        for(var k in lotto) {
            atari += `<span>${lotto[k]}</span>`;
            var 횟수 = Number(횟수리스트[lotto[k] - 1].textContent);
            횟수리스트[lotto[k] - 1].innerHTML = 횟수 + 1;
        }
        추첨결과.innerHTML = atari;

        $('.history').append(`<tr><th>${n} 회차</th><td>${lotto}</td>`);
        n++;
    }

    var btn = document.querySelector('.create');
    btn.addEventListener('click', 로또생성기);

    const 버튼 = document.querySelector('.nankai');

    let 온오프 = false;
    function 열고닫고() {
        if(온오프 == false) {
            몇번나왔냐.classList.add('on');
            온오프 = true;
        } else {
            몇번나왔냐.classList.remove('on');
            온오프 = false;
        }
    }

    버튼.addEventListener('click',열고닫고)
}