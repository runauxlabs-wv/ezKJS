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
        '能福寺': { lat: 34.668062, lng: 135.171392 },
        '湊川隧道': { lat: 34.681199, lng: 135.159482 },
        '瑞宝寺公園': { lat: 34.795343, lng: 135.255643 },
        '六甲有馬ロープウェー': { lat: 34.7664, lng: 135.247179 },
        '布引の滝': { lat: 34.709661, lng: 135.193846 },
        '明石海峡大橋': { lat: 34.631054, lng: 135.03338 },
        '六甲ケーブル': { lat: 34.737343, lng: 135.233492 },
        '神戸市立六甲山牧場': { lat: 34.751559, lng: 135.209054 },
        '有馬温泉': { lat: 34.797307, lng: 135.249679 },
        '洋食の朝日': { lat: 34.68505633067237, lng: 135.17887545348418 },
        '姫路城': { lat: 34.83775953351333, lng: 134.69329278058513 },
        '好古園': { lat: 34.837874010626045, lng: 134.68951623059888 },
        'ヒキュウ': { lat: 34.71659031610633, lng: 135.23920509301996 },
        'S.B.DINER-KOBE': { lat: 34.6920082113771, lng: 135.19036143806366 },
        '神戸どうぶつ王国': { lat: 34.654603450760206, lng: 135.22252528087958 },
        '六甲高山植物園': { lat: 34.76186404076524, lng: 135.24013525970926 },
        '六甲ガーデンテラス': { lat: 34.76450494606772, lng: 135.2474621454623 },
        'カラピンチャ': { lat: 34.709757816582794, lng: 135.21835798953293 },
        '生田神社': { lat: 34.694871501109496, lng: 135.19069968606286 },
        'メリケンパーク': { lat: 34.682568553240294, lng: 135.18864567274218 },
        '摩耶山 掬星台': { lat: 34.733680319468704, lng: 135.20592096565363 },
        'Camarche': { lat: 34.69677157873331, lng: 135.18830214114914 },
        '老祥記': { lat: 34.68812702857113, lng: 135.18799186294012 },
        '担担麺専門店': { lat: 34.70430795770205, lng: 135.2166939591572 }
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
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
};

//상세정보 호출
var spot = '';
var elem = '';
$.ajax({
    type: 'GET',
    url: '/portfolio/pa/json/hyogo.json',
    // url: '../json/hyogo.json',
    dataType: 'json',
    success: function(data) {
        $.each(data, function(i, obj) {
            spot += `<div class="${obj.class}" data-id="${obj.id}">`;
            spot += `<p class="img${i+1}"></p>`;
            spot += `<p>${obj.jname}</p>`;
            spot += `</div>`;
        });

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

        $('.kankouspot').empty();
        $('.kankouspot').append(spot);
        $('.kankoudetail').append(elem);
    }
});