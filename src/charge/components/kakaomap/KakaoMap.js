import { useContext, useEffect, useState } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import styled from 'styled-components';
import { MapContext } from '../contexts/MapContext';
import { removeDuplicates } from '../utils/utils';

// 카카오 지도 스타일
const MapContainer = styled(Map)`
  width: 100%;
  height: 100%;
  border: 1px solid #888;
`;

const KakaoMap = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState(
    [],
  );
  const [mapInstance, setMapInstance] = useState(null);
  const { selectedStation, mapLevel } =
    useContext(MapContext);

  // 지도 초기 위도, 경도
  const [center, setCenter] = useState({
    lat: 37.552484,
    lng: 126.937641,
  });

  // 충전소 데이터 fetch 및 중복 제거
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/charge/home',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        const uniqueStations = removeDuplicates(
          data.chargers,
        );
        setMarkers(
          uniqueStations.map((station, index) => ({
            index,
            id: station.id,
            lat: station.latitude,
            lng: station.longitude,
            StationId: station.stationId,
            StationName: station.stationName,
            Speed: station.speed,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, []);

  // 초기 지도 로딩 시 필터링된 마커 설정
  useEffect(() => {
    if (mapInstance) {
      handleBoundsChanged(mapInstance);
      mapInstance.setMaxLevel(5); // 확대 축소 레벨 제한
    }
  }, [mapInstance, markers]);

  // 지도 경계 변경 시 필터링된 마커 업데이트
  const handleBoundsChanged = (map) => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const filtered = markers.filter(
      (marker) =>
        marker.lat >= sw.getLat() &&
        marker.lat <= ne.getLat() &&
        marker.lng >= sw.getLng() &&
        marker.lng <= ne.getLng(),
    );
    setFilteredMarkers(filtered);
  };

  // 충전소 위치 찾기 버튼 클릭 시 지도 중심 업데이트
  useEffect(() => {
    if (selectedStation) {
      setCenter(selectedStation);
    }
  }, [selectedStation]);

  return (
    <>
      <MapContainer
        id='map'
        center={center}
        level={mapLevel}
        onCreate={setMapInstance}
        onBoundsChanged={handleBoundsChanged}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={4}
          gridSize={120}
        >
          {filteredMarkers.map((marker, index) => (
            <KakaoMapMarker
              key={index}
              index={index}
              lat={marker.lat}
              lng={marker.lng}
              Id={marker.StationId}
              StationName={marker.StationName}
              Speed={marker.Speed}
            />
          ))}
        </MarkerClusterer>
      </MapContainer>
    </>
  );
};

export default KakaoMap;
