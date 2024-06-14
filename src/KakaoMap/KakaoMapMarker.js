import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const KakaoMapMarker = ({
  isOpen,
  openWindow,
  closeWindow,
  lat,
  lng,
  StationName,
  AC,
  DC,
}) => {
  return (
    <MapMarker
      position={{
        lat,
        lng,
      }}
      clickable={true}
      onClick={openWindow}
    >
      {isOpen && (
        <div style={{ minWidth: '200px', position: 'relative' }}>
          <div style={{ padding: '5px', color: '#000' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {StationName}
            </div>
            <hr />
            <div>급속 충전기 : {AC}개</div>
            <div>완속 충전기 : {DC}개</div>
            <hr />
            <span
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px',
              }}
            >
              <a
                href={`https://map.kakao.com/link/to/${StationName},${lat},${lng}`}
                style={{ color: 'blue', textDecoration: 'none' }}
                target='_blank'
                rel='noreferrer'
              >
                길찾기
              </a>
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={closeWindow}
              >
                창닫기
              </span>
            </span>
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
