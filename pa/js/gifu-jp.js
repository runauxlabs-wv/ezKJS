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
}

//지도마커
function addMakers(map) {
    const locations = {
        '飛騨高山古い町並': { lat: 36.14178021375649, lng:  137.25944673803727 },
        '飛騨東照宮': { lat: 36.13427504413989, lng: 137.24349318837125 },
        '一宮水無神社': { lat: 36.08542826556979, lng: 137.2520127899816 },
        '国八食堂': { lat: 36.187200300802445, lng: 137.25443530670333 },
        '白川郷': { lat: 36.25761968219851, lng: 136.90439186796107 },
        '念興寺': { lat: 35.74739266494822, lng: 137.08143930136222 },
        '金華山': { lat: 35.434167690113064, lng: 136.7787987367205 },
        '金華山ロープウェー': { lat: 35.43450904219606, lng: 136.77502309564105 },
        '金華山リス村': { lat: 35.432117258279476, lng: 136.7799286231087 },
        '岐阜城': { lat: 35.43394210656, lng: 136.78206902588087 },
        '麺屋しらかわ': { lat: 36.142732025774784, lng: 137.25679555352428 },
        'ちとせ': { lat: 36.14268208299061, lng: 137.25221757831574 },
        'イロドリ': { lat: 35.41037323553805, lng: 136.78851152068546 },
        '国府大仏': { lat: 36.21892139965142, lng: 137.21414327161892 },
        '護国之寺': { lat: 35.44635960450977, lng: 136.7955521910765 },
        '下呂温泉': { lat: 35.80778590359562, lng: 137.24252094691713 },
        'りきどう': { lat: 35.43240846919707, lng: 136.74469924875845 },
        '下呂温泉合掌村': { lat: 35.80840970462495, lng: 137.2495098812939 },
        'みそかつ三和': { lat: 35.41760088137266, lng: 136.75887564896072 },
        '光ミュージアム': { lat: 36.156191008860965, lng: 137.23432731618132 },
        '飛騨の里': { lat: 36.13239122949016, lng: 137.23455654140812 },
        '世界淡水魚園水族館': { lat: 35.371624874992804, lng: 136.81052240285248 },
        '正法寺': { lat: 35.432453027202506, lng: 136.7718185614537 },
        '信長ゆめ広場': { lat: 35.41027281823198, lng: 136.75679242734867 },
        '高山陣屋': { lat: 36.139629844015246, lng: 137.25757101596724 },
        '更科': { lat: 35.42508140093894, lng: 136.7571376789231 },
        'CENTER4 HAMBURGERS': { lat: 36.14102483147304, lng: 137.26098941488655 },
        '伊奈波神社': { lat: 35.427308842007506, lng: 136.7701399617669 }
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
        // console.log(data);

        $.each(data, function(i, obj) {
            elem += `<div class="overlay" id="${obj.id}">`;
            elem += `<p class="img${i+1}"><b>イメージをクリックするとこの画面が消えます</b></p>`;
            elem += `<h6>${obj.jname}</h6>`;
            elem += `<p>${obj.jinfo}</p>`;
            elem += `<table>`;
            elem += `<tr>`;
            elem += `<th>住所</th>`;
            elem += `<td>${obj.jaddress}</td>`;
            elem += `</tr>`;
            elem += `<th>営業時間</th>`;
            elem += `<td>${obj.jtime}</td>`;
            elem += `</tr>`;
            elem += `<th>利用料金</th>`;
            elem += `<td>${obj.jpay}</td>`;
            elem += `</tr>`;
            elem += `<th>アクセス</th>`;
            elem += `<td>${obj.jaccess}</td>`;
            elem += `</tr>`;
            elem += `</table>`;
            elem += `</div>`;
        });

        $.each(data, function(i, obj) {
            spot += `<div class="${obj.class}" data-id="${obj.id}">`;
            spot += `<p class="img${i+1}"></p>`;
            spot += `<p>${obj.jname}</p>`;
            spot += `</div>`;
        });
        $('#loadingbox').hide();
    }
});