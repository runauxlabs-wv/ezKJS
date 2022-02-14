//지도
let map;
function initMap() {
    var iw = window.innerWidth;
    if(iw > 767) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 35.8648, lng: 136.9908},
            zoom: 9,
        });
    } else {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 35.8648, lng: 136.9908},
            zoom: 8,
        });
    }
};

//지도마커
function addMakers(map) {
    const locations = {
        '히다타카야마 옛거리': { lat: 36.14178021375649, lng:  137.25944673803727 },
        '히다 동조궁': { lat: 36.13427504413989, lng: 137.24349318837125 },
        '미즈나시신사': { lat: 36.08542826556979, lng: 137.2520127899816 },
        '쿠니하치 식당': { lat: 36.187200300802445, lng: 137.25443530670333 },
        '시라카와고': { lat: 36.25761968219851, lng: 136.90439186796107 },
        '넨코지': { lat: 35.74739266494822, lng: 137.08143930136222 },
        '금화산': { lat: 35.434167690113064, lng: 136.7787987367205 },
        '금화산 로프웨이': { lat: 35.43450904219606, lng: 136.77502309564105 },
        '금화산 다람쥐마을': { lat: 35.432117258279476, lng: 136.7799286231087 },
        '기후성': { lat: 35.43394210656, lng: 136.78206902588087 },
        '멘야 시라카와': { lat: 36.142732025774784, lng: 137.25679555352428 },
        '치토세': { lat: 36.14268208299061, lng: 137.25221757831574 },
        '이로도리': { lat: 35.41037323553805, lng: 136.78851152068546 },
        '국부대불': { lat: 36.21892139965142, lng: 137.21414327161892 },
        '고코쿠시지': { lat: 35.44635960450977, lng: 136.7955521910765 },
        '게로온천': { lat: 35.80778590359562, lng: 137.24252094691713 },
        '리키도우': { lat: 35.43240846919707, lng: 136.74469924875845 },
        '게로 갓쇼마을': { lat: 35.80840970462495, lng: 137.2495098812939 },
        '미소카츠 미와': { lat: 35.41760088137266, lng: 136.75887564896072 },
        '히카루 뮤지엄': { lat: 36.156191008860965, lng: 137.23432731618132 },
        '히다노사토': { lat: 36.13239122949016, lng: 137.23455654140812 },
        '수족관 아쿠아토토': { lat: 35.371624874992804, lng: 136.81052240285248 },
        '정법사': { lat: 35.432453027202506, lng: 136.7718185614537 },
        '노부나가 광장': { lat: 35.41027281823198, lng: 136.75679242734867 },
        '타카야마 진야': { lat: 36.139629844015246, lng: 137.25757101596724 },
        '사라시나': { lat: 35.42508140093894, lng: 136.7571376789231 },
        'CENTER4 HAMBURGERS': { lat: 36.14102483147304, lng: 137.26098941488655 },
        '이나바 신사': { lat: 35.427308842007506, lng: 136.7701399617669 }
    };
    const markers = [];
    for (const location in locations) {
        const markerOptions = {
            map: map,
            position: locations[location],
            icon: '/portfolio/pa/img/svg/markerG.png',
            // icon: '../img/svg/markerG.png',
            label: {
                text: location,
                className: 'markertags'
            }
        };
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);
    };
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
};

//상세정보 호출
var spot = '';
var elem = '';
$.ajax({
    type: 'GET',
    url: '/portfolio/pa/json/gifu.json',
    // url: '../json/gifu.json',
    dataType: 'json',
    success: function(data) {
        $.each(data, function(i, obj) {
            spot += `<div class="${obj.class}" data-id="${obj.id}">`;
            spot += `<p class="img${i+1}"></p>`;
            spot += `<p>${obj.name}<span>${obj.jname}</span></p>`;
            spot += `</div>`;
        });

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