//지도
let map;
function initMap() {
    var iw = window.innerWidth;
    if(iw > 767) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 34.797, lng: 134.984 },
            zoom: 11,
        });
    } else {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 34.797, lng: 134.984 },
            zoom: 9,
        });
    }
};

//지도마커
function addMakers(map) {
    const locations = {
        '노후쿠지': { lat: 34.668062, lng: 135.171392 },
        '미나토가와 터널': { lat: 34.681199, lng: 135.159482 },
        '즈이호지': { lat: 34.795343, lng: 135.255643 },
        '아리마 로프웨이': { lat: 34.7664, lng: 135.247179 },
        '누노비키 폭포': { lat: 34.709661, lng: 135.193846 },
        '아카시해협 대교': { lat: 34.631054, lng: 135.03338 },
        '롯코 케이블': { lat: 34.737343, lng: 135.233492 },
        '롯코산 목장': { lat: 34.751559, lng: 135.209054 },
        '아리마 온천': { lat: 34.797307, lng: 135.249679 },
        '요쇼쿠노 아사히': { lat: 34.68505633067237, lng: 135.17887545348418 },
        '히메지성': { lat: 34.83775953351333, lng: 134.69329278058513 },
        '코코엔': { lat: 34.837874010626045, lng: 134.68951623059888 },
        '히큐': { lat: 34.71659031610633, lng: 135.23920509301996 },
        'S.B.DINER-KOBE': { lat: 34.6920082113771, lng: 135.19036143806366 },
        '고베 동물왕국': { lat: 34.654603450760206, lng: 135.22252528087958 },
        '롯코산 고산식물원': { lat: 34.76186404076524, lng: 135.24013525970926 },
        '롯코 가든테라스': { lat: 34.76450494606772, lng: 135.2474621454623 },
        '카라핀차': { lat: 34.709757816582794, lng: 135.21835798953293 },
        '이쿠타 신사': { lat: 34.694871501109496, lng: 135.19069968606286 },
        '메리켄공원': { lat: 34.682568553240294, lng: 135.18864567274218 },
        '마야산': { lat: 34.733680319468704, lng: 135.20592096565363 },
        'Camarche': { lat: 34.69677157873331, lng: 135.18830214114914 },
        '로쇼키': { lat: 34.68812702857113, lng: 135.18799186294012 },
        '탄탄멘 전문점': { lat: 34.70430795770205, lng: 135.2166939591572 }
    };
    const markers = [];
    for (const location in locations){
        const markerOptions = {
            map: map,
            position: locations[location],
            icon: '/portfolio/pa/img/svg/markerH.png',
            // icon: '../img/svg/markerH.png',
            label: {
                text: location,
                className: 'markertags'
            }
        };        
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);
    };
    new markerClusterer.MarkerClusterer({ map, markers });
};

//상세정보 호출
$.ajax({
    type: 'GET',
    url: '/portfolio/pa/json/hyogo.json',
    // url: '../json/hyogo.json',
    dataType: 'json',
    success: function(data) {        
        var spot = '';
        $.each(data, function(i, obj) {
            spot += `<div class="${obj.class}" data-id="${obj.id}">`;
            spot += `<p class="img${i+1}"></p>`;
            spot += `<p>${obj.name}<span>${obj.jname}</span></p>`;
            spot += `</div>`;
        });
        
        var elem = '';
        $.each(data, function(i, obj) {
            elem += `<div class="overlay" id="${obj.id}">`;
            elem += `<p class="img${i+1}"><b>이미지를 클릭하면 팝업이 닫힙니다</b></p>`;
            elem += `<h6>${obj.name}<span>(${obj.jname})</span></h6>`;
            elem += `<p>${obj.info}</p>`;
            elem += `<table>`;
            elem += `<tr>`;
            elem += `<th>주소</th>`;
            elem += `<td>${obj.address}<br><span>${obj.jaddress}</span></td>`;
            elem += `</tr>`;
            elem += `<th>영업시간</th>`;
            elem += `<td>${obj.time}</td>`;
            elem += `</tr>`;
            elem += `<th>이용요금</th>`;
            elem += `<td>${obj.pay}</td>`;
            elem += `</tr>`;
            elem += `<th>오시는길</th>`;
            elem += `<td>${obj.access}</td>`;
            elem += `</tr>`;
            elem += `</table>`;
            elem += `</div>`;
        });
                
        $('.kankouspot').empty();
        $('.kankouspot').append(spot);
        $('.kankoudetail').append(elem);
    }
});