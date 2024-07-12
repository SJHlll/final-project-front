import { useContext, useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { MapContext } from '../../../../contexts/MapContext';
import { removeDuplicates } from '../utils/utils';
import KakaoMapModal from './KakaoMapModal';
import QuickMarker from '../assets/img/marker-quick.png';
import SlowMarker from '../assets/img/marker-slow.png';
import DisableMarker from '../assets/img/marker-disable.png';
import SmallScreen from './SmallScreen';

// 카카오 지도 스타일
const MapContainer = styled(Map)`
  width: 1920px;
  height: 89vh;
  border: 1px solid #888;
`;

const KakaoMap = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState(
    [],
  );
  const [mapInstance, setMapInstance] = useState(null);
  const { selectedStation, mapLevel, setMapLevel } =
    useContext(MapContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] =
    useState(null);
  const [filter, setFilter] = useState('disable');

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
          `${process.env.REACT_APP_API_URL}/charge/list`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        const uniqueStations = removeDuplicates(
          data.chargers,
        );
        setMarkers(
          uniqueStations.map((station) => ({
            lat: station.latitude,
            lng: station.longitude,
            StationId: station.stationId,
            StationName: station.stationName,
            Address: station.address,
            Speed: station.speed,
            Type: station.chargerType,
            Management: station.management,
            areaIn: station.areaIn,
            Available: station.available,
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
  }, [mapInstance, markers, filter]);

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
        marker.lng <= ne.getLng() &&
        (filter !== 'disable' ||
          marker.Available !== '이용자제한'),
    );
    setFilteredMarkers(filtered);
  };

  // 충전소 위치 찾기 버튼 클릭 시 지도 중심 업데이트
  useEffect(() => {
    if (selectedStation) {
      setCenter(selectedStation);
    }
  }, [selectedStation]);

  // 휠 올리고 내릴 시 실시간 맵 레벨 업데이트
  const handleZoomChanged = (map) => {
    const level = map.getLevel();
    setMapLevel(level);
  };

  // 마커 클릭 함수
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsModalOpen(true);
  };

  // SmallScreen 이용자제한 마커 표시 토글
  const handleToggleFilter = (filterType) => {
    setFilter((prevFilter) =>
      prevFilter === filterType ? '' : filterType,
    );
  };

  return (
    <>
      <SmallScreen
        onToggle={handleToggleFilter}
        filter={filter}
      />
      <MapContainer
        id='map'
        center={center}
        level={mapLevel}
        onCreate={setMapInstance}
        onBoundsChanged={handleBoundsChanged}
        onZoomChanged={handleZoomChanged}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={5}
          gridSize={40}
        >
          {filteredMarkers.map((marker) => (
            <MapMarker
              // key={marker.id}
              key={marker.stationId}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              clickable={true}
              onClick={() => handleMarkerClick(marker)}
              image={{
                src:
                  marker.Available === '이용가능'
                    ? marker.Speed === '급속'
                      ? QuickMarker // 급속
                      : SlowMarker // 완속
                    : DisableMarker, // 이용자제한
                size: {
                  width: 35,
                  height: 50,
                },
                options: {
                  offset: {
                    x: 17.5,
                    y: 50,
                  },
                },
              }}
            />
          ))}
        </MarkerClusterer>
        <KakaoMapModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          marker={selectedMarker}
        />
      </MapContainer>
    </>
  );
};

export default KakaoMap;
