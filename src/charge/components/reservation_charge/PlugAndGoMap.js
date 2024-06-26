import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlugAndGoMarker from '../../assets/img/marker-plug-and-go.png';
import MapInfo from './MapInfo';

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
      <Map
        id='map'
        center={{
          // 지도의 중심좌표
          lat: 36.34,
          lng: 127.77,
        }}
        style={{
          width: '700px',
          height: '700px',
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
            {isOpen === marker.stationId && <MapInfo />}
          </MapMarker>
        ))}
      </Map>
    </>
  );
};

export default PlugAndGoMap;
