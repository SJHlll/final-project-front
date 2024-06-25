import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const PlugAndGoMap = ({ markers }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          width: '350px',
          height: '350px',
        }}
        level={13}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.stationId}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            clickable={true}
            onClick={() => setIsOpen(true)}
          >
            {isOpen && <div>ㅎㅇ</div>}
          </MapMarker>
        ))}
      </Map>
    </>
  );
};

export default PlugAndGoMap;
