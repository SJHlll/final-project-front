import { useState } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import styled from 'styled-components';

// 카카오 지도 스타일
const MapContainer = styled(Map)`
  width: 1280px;
  height: 798px;
  border: 1px solid #888;
`;

const KakaoMap = () => {
  // 지도 초기 위도, 경도
  const [center, setCenter] = useState({ lat: 37.552484, lng: 126.937641 });

  const [markers, setMarkers] = useState([
    {
      id: '000001',
      lat: 37.552484,
      lng: 126.937641,
      StationName: '한국ICT인재개발원 신촌센터',
      AC: 2,
      DC: 3,
      isOpen: false,
    },
    {
      id: '000002',
      lat: 37.531863,
      lng: 126.914162,
      StationName: '국회의사당',
      AC: 0,
      DC: 0,
      isOpen: false,
    },
  ]);

  // 마커 클릭 시 창 열림
  const openWindow = (index) => {
    const clickedMarker = markers[index];
    setMarkers(
      markers.map((marker, i) => ({
        ...marker,
        isOpen: i === index,
      })),
    );
    setCenter({ lat: clickedMarker.lat, lng: clickedMarker.lng });
  };

  // 창닫기 클릭시 창 닫힘
  const closeWindow = (index) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, isOpen: false } : marker,
    );
    setMarkers(updatedMarkers);
  };

  const handleMapClick = () => {
    // 맵의 배경 클릭 시 창 닫힘
    const updatedMarkers = markers.map((marker) => ({
      ...marker,
      isOpen: false,
    }));
    setMarkers(updatedMarkers);
  };

  return (
    <>
      <MapContainer
        id='map'
        center={center}
        isPanto={true}
        level={6} // 맨 처음 확대 및 축소 정도 (1 ~ 15)
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <KakaoMapMarker
            key={index}
            id={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            StationName={marker.StationName}
            AC={marker.AC}
            DC={marker.DC}
            isOpen={marker.isOpen}
            openWindow={() => openWindow(index)}
            closeWindow={() => closeWindow(index)}
          />
        ))}
        <ZoomControl position={'RIGHT'} /* 확대 및 축소 컨트롤러 */ />
      </MapContainer>
    </>
  );
};

export default KakaoMap;
