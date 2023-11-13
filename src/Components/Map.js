import { useEffect } from 'react';

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.137922, 129.055628), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 title 객체 배열입니다
    var positions = [
      {
        title: '흰여울문화마을',
        latlng: new kakao.maps.LatLng(35.07885, 129.04402),
      },
      {
        title: '깡깡이 예술마을',
        latlng: new kakao.maps.LatLng(35.092648, 129.03255),
      },
      {
        title: '광안리어방축제',
        latlng: new kakao.maps.LatLng(35.07885, 129.11893),
      },
      {
        title: '국립해양박물관',
        latlng: new kakao.maps.LatLng(35.078728, 129.08018),
      },
      {
        title: '태종대 유원지',
        latlng: new kakao.maps.LatLng(35.052643, 129.0878),
      },
      {
        title: '송정해수욕장, 죽도공원',
        latlng: new kakao.maps.LatLng(35.1786, 129.19966),
      },
      {
        title: '임랑해수욕장',
        latlng: new kakao.maps.LatLng(35.31905, 129.26451),
      },
      {
        title: '부산해양자연사박물관',
        latlng: new kakao.maps.LatLng(35.22178, 129.07591),
      },
      {
        title: '임시수도기념관',
        latlng: new kakao.maps.LatLng(35.103527, 129.01735),
      },
    ];

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  });

  return (
    <div
      id='map'
      style={{
        width: '550px',
        height: '400px',
      }}
    ></div>
  );
};

export default Map;
