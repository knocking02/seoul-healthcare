<script setup>
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref } from "vue";
import { loadScript, unloadScript } from "vue-plugin-load-script";

const { proxy } = getCurrentInstance()

const currentPosition = ref([37.56649, 126.97831])		// 사용자 현재 위치. default: 서울시청
const selectedPoints = ref([])	// 마커 좌표..
const totalDistant = ref(0)			// 마커 총 거리


/** S-MAP 불러오기 */
let map = null;			// map 객체
let markers = [];		// marker
let lineLayer = null	// polyline 객체
let polylineLayers = []	// polyline 객체

const createMap = () => {
	
	loadScript('http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=')
		.then(() => {
				map = L.map('map_', {
					continuousWorld: true
					,worldCopyJump: false
					,zoomControl: false			// zoomControl바 출력여부
					,zoomAnimation: true
					,fadeAnimation : true
					,inertia : false
					,closePopupOnClick : false
					,attributionControl : true										
					,minZoom: 2	// 지도 최소 레벨
			});
				
				map.setView(currentPosition.value, 9);  //지도 좌표 이동
								
				BaseMapChange(map, L.Dawul.BASEMAP_GEN);  // 일반지도
				
				// 스케일바
				var scaleBar = new L.Control.Scale({position:'bottomright'});
				map.addControl(scaleBar);

				// 레벨바
				var slider = new L.Control.Zoomslider({position:'topright'});
				map.addControl(slider);

				map.on('click', (e) => {	
					setSelectedPoints(e.latlng)	
					createMarker(e.latlng)					
				})			
				
		})
		.catch((error) => {
				console.log(error)
		});
}


/** 일반지도, 위성지도 Change */
const onMapChange = (mapType) => BaseMapChange(map, L.Dawul[mapType])


/** 좌표 정보로 거리 계산 및 정보 저장 */
const setSelectedPoints = ({lat, lng}) => {
	let distance = 0
	if(selectedPoints.value.length > 0) {
		let selectedPoint = selectedPoints.value[selectedPoints.value.length-1]
		distance = getDistance([selectedPoint.lat,selectedPoint.lng], [lat, lng])
		totalDistant.value += distance
	}else {
		totalDistant.value = 0
		distance = 0
	}

	selectedPoints.value.push({
		lat: lat,
		lng: lng,
		dst: distance
	})	
}

/** Marker 생성 */
const createMarker = ({lat, lng}) => {	
	
	let marker = new L.Marker(new L.LatLng(lat, lng),{
			icon: new L.Icon({      	
				iconUrl: '/images/icons/pin_2.png',
    		iconAnchor: [11,30],  // 오프셋 (핀의 끝이 좌표로 매칭하기 위해 적용)
    	})
	}).addTo(map);

	
	let content = selectedPoints.value[selectedPoints.value.length-1].dst + 'm <br/>총 : ' + totalDistant.value + 'm';
	marker.bindPopup(content,{minWidth:20,offset:[0,-30]});
	marker.togglePopup()

	// marker.on('click', function(e) {
	// 	alert('ok')
	// })

	markers.push(marker)

	createPolyline()	
}


/** marker 삭제 */
const onClearMarker = () => {
	// 클릭한 좌표 모두 삭제
	selectedPoints.value = []
	// marker 삭제
	for(i=0;i<markers.length;i++) {
		map.removeLayer(markers[i]);
	}	
	onClearPolyline()
}

/** polyline 삭제 */
const onClearPolyline = () => {
	for(i=0;i<polylineLayers.length;i++) {
		map.removeLayer(polylineLayers[i]);
	}		
}

/** Polyline 그리기 */
const onCreatePolyline = () => {	
	createPolyline()
}


/** Polyline 생성 */
/*
const createPolyline = (latlng) => {

	let coordinates = selectedPoints.value.map((item) => {
		return [item.lat, item.lng]
	})

	let linedata = {
		type: "Feature",
		geometry: {
			type: 'LineString',
			coordinates: coordinates
		},
	}

	// linedata 지도에 표현
	lineLayer = new L.GeoJSON(linedata, {
		style: () => {
			return {
				weight: 3,   				// 라인굵기
				color : "#0100FF",  // 라인컬러
				opacity : 1   			// 투명도
			}
		}
	}).addTo(map)

	//map.fitBounds(lineLayer.getBounds(),{ padding: [100, 100] });  // 레이어 크기만큼 지도 레벨조정및 위치이동	

}
*/


const createPolyline = () => {
	let latlngs = selectedPoints.value.map((item) => {
		return [item.lat, item.lng]
	})

	let polylineLayer = L.polyline(latlngs, {color: 'blue'}).addTo(map);	
	polylineLayers.push(polylineLayer)
	//map.fitBounds(polyline.getBounds());	
}


// 현재 자신의 위치 정보 가져오기
const getCurrentPosition = () => {
	navigator.geolocation.getCurrentPosition((position) => {
		if(position) {
			currentPosition.value = [position.coords.latitude, position.coords.longitude]
			console.log(currentPosition.value)
		}		
	});
}

// 거리 구하기
const getDistance = (a, b) => {
    var lat1 = a[0];
    var lng1 = a[1];
    var lat2 = b[0];
    var lng2 = b[1];
    
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
    var r = 6371; //지구의 반지름(km)
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = r * c; // Distance in km
    return Math.round(d*1000);
}


onMounted( async () => {
	await getCurrentPosition()
	await createMap()	
})

onUnmounted(() => {	

	// 지도 개체 해제, 관련 모든 이벤트 제거
	map.remove()		
	
	// load된 script 제거
	unloadScript('http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapJs&key=')
		.then(() => {
			console.log('map unload')
		})
		.catch((error) => {
			console.log(error)
		})
})


</script>

<template>
	<div>
		<h4>S-Map Test</h4>
		<b-button @click="onMapChange('BASEMAP_GEN')" class="m-md-1">일반지도</b-button>
		<b-button @click="onMapChange('BASEMAP_SATE')" class="m-md-1">항공지도</b-button>
		<b-button @click="onClearMarker" class="m-md-1">Marker 삭제</b-button>		
		<div style="display:flex;padding-top:5px">
			<div id="map_" style="width:1000px;height:700px"></div>
			<div style="padding-left:15px">
				<h6>총거리 {{totalDistant}} m</h6>
				<textarea cols="30" rows="35" style="font-size:0.8em">{{selectedPoints}}</textarea>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import 'http://map.seoul.go.kr/smgis/apps/mapsvr.do?cmd=gisMapCss';
</style>
