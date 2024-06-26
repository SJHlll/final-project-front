import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlugAndGoMarker from '../../assets/img/marker-plug-and-go.png';
import MapInfo from './MapInfo';
import styled from 'styled-components';

const MapContainer = styled(Map)`
  width: 450px;
  height: 726px;
  border: 2px solid black;
  border-radius: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
`;

const PlugAndGoMap = ({ markers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = (marker) => {
    if (isOpen === marker) {
      setIsOpen(null);
    } else {
      setIsOpen(marker);
    }
  };

  const handleBackgroundClick = () => {
    setIsOpen(null);
  };

  return (
    <>
      <MapContainer
        id='map'
        center={{
          // 지도의 중심좌표
          lat: 36.34,
          lng: 127.77,
        }}
        level={13}
        onClick={handleBackgroundClick}
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
