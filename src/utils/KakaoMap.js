import React, { useEffect } from 'react';

const { kakao } = window;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(37.552484, 126.937641), // 위도, 경도
      level: 3, // 지도의 레벨(확대, 축소)
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 학원 건물 마커
    const mapX = 37.552484;
    const mapY = 126.937641;

    const markerPosition = new kakao.maps.LatLng(mapX, mapY);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div
      id='map'
      style={{
        width: '500px',
        height: '500px',
      }}
    ></div>
  );
};

export default KakaoMap;
