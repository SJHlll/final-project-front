import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import { useState } from 'react';

const KakaoMap = () => {
  // 마커 클릭 시 창 열림
  const openWindow = (index) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, isOpen: true } : { ...marker, isOpen: false },
    );
    setMarkers(updatedMarkers);
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

  const [markers, setMarkers] = useState([
    {
      lat: 37.552484,
      lng: 126.937641,
      StationName: '한국ICT인재개발원 신촌센터',
      AC: 2,
      DC: 3,
      isOpen: false,
    },
    {
      lat: 37.531863,
      lng: 126.914162,
      StationName: '국회의사당',
      AC: 0,
      DC: 0,
      isOpen: false,
    },
  ]);

  return (
    <>
      <Map
        id='map'
        center={{
          lat: 37.552484, // 맨 처음 보여줄 위도
          lng: 126.937641, // 맨 처음 보여줄 경도
        }}
        style={{
          width: '1280px',
          height: '798px',
          border: '1px solid #888',
        }}
        level={6} // 맨 처음 확대 및 축소 정도 (1 ~ 15)
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <KakaoMapMarker
            key={index}
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
      </Map>
    </>
  );
};

export default KakaoMap;
