import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlugAndGoMarker from '../assets/img/marker-plug-and-go.png';
import MapInfo from './MapInfo';
import styled from 'styled-components';
import { SecondMapContext } from '../../../../contexts/SecondMapContext';

const PlugAndGoMap = ({ markers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedStation, mapLevel, setMapLevel } =
    useContext(SecondMapContext);

  const [center, setCenter] = useState({
    lat: 36.34,
    lng: 127.77,
  });

  // 마커클릭 - 인포윈도우 열기
  const handleMarkerClick = (marker) => {
    if (isOpen === marker) {
      setIsOpen(null);
    } else {
      setIsOpen(marker);
    }
  };

  // 배경클릭 - 인포윈도우 닫기
  const handleBackgroundClick = () => {
    setIsOpen(null);
  };

  // 휠 올리고 내릴 시 실시간 맵 레벨 업데이트
  const handleZoomChanged = (map) => {
    const level = map.getLevel();
    setMapLevel(level);
  };

  // 위치 보여주기
  useEffect(() => {
    if (selectedStation) {
      setCenter(selectedStation); // 중심 이동
      setIsOpen(selectedStation.StationId); // 인포윈도우 열기
    }
  }, [selectedStation]);

  return (
    <>
      <MapContainer
        id='map'
        center={center}
        level={mapLevel}
        onClick={handleBackgroundClick}
        onZoomChanged={handleZoomChanged}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.stationId}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            image={{
              src: PlugAndGoMarker,
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
            clickable={true}
            onClick={() =>
              handleMarkerClick(marker.stationId)
            }
          >
            {isOpen === marker.stationId && (
              <MapInfo m={marker} />
            )}
          </MapMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default PlugAndGoMap;

const MapContainer = styled(Map)`
  width: 584px;
  height: 726px;
  border: 2px solid #999;
  border-radius: 15px;
  position: absolute;
  left: 259px;
  top: 15px;
`;
