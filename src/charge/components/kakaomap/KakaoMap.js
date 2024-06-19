import { useContext, useEffect, useState } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import styled from 'styled-components';
import { MapContext } from '../contexts/MapContext';
import { StationContext } from '../contexts/StationContext';

// 카카오 지도 스타일
const MapContainer = styled(Map)`
  width: 100%;
  height: 100%;
  border: 1px solid #888;
`;

const KakaoMap = () => {
  const [markers, setMarkers] = useState([]);
  const { stations, visibleCount } =
    useContext(StationContext);
  const { selectedStation, selectedMarkerIndex, mapLevel } =
    useContext(MapContext);

  // 지도 초기 위도, 경도
  const [center, setCenter] = useState({
    lat: 37.552484,
    lng: 126.937641,
  });

  useEffect(() => {
    setMarkers(
      stations.slice(0, visibleCount).map((station) => ({
        lat: station.latitude,
        lng: station.longitude,
        Id: station.stationId, // 데이터베이스의 id
        StationName: station.stationName,
        Speed: station.speed,
        isOpen: false,
      })),
    );
  }, [stations, visibleCount]);

  // 마커 클릭 시 창 열림
  const openWindow = (index) => {
    setMarkers(
      markers.map((marker, i) => ({
        ...marker,
        isOpen: i === index,
      })),
    );
  };

  // 창닫기 클릭시 창 닫힘
  const closeWindow = (index) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, isOpen: false } : marker,
    );
    setMarkers(updatedMarkers);
  };

  // 맵의 배경 클릭 시 창 닫힘
  const handleMapClick = () => {
    const updatedMarkers = markers.map((marker) => ({
      ...marker,
      isOpen: false,
    }));
    setMarkers(updatedMarkers);
  };

  // 선택된 좌표 변경 시 지도 중심 업데이트
  useEffect(() => {
    if (selectedStation) {
      setCenter(selectedStation);
      openWindow(selectedMarkerIndex);
    }
  }, [selectedStation, selectedMarkerIndex]);

  return (
    <>
      <MapContainer
        id='map'
        center={center}
        level={mapLevel}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <KakaoMapMarker
            key={index}
            index={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            Id={marker.stationId}
            StationName={marker.StationName}
            Speed={marker.Speed}
            isOpen={marker.isOpen}
            openWindow={() => openWindow(index)}
            closeWindow={() => closeWindow(index)}
          />
        ))}
        <ZoomControl
          position={'RIGHT'} /* 확대 및 축소 컨트롤러 */
        />
      </MapContainer>
    </>
  );
};

export default KakaoMap;
