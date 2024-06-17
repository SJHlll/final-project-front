import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const KakaoMapMarker = ({
  id,
  lat,
  lng,
  StationName,
  AC,
  DC,
  isOpen,
  openWindow,
  closeWindow,
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
              <div
                style={{
                  display: 'flex',
                  fontSize: '0.8em',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '50px',
                    height: '20px',
                    padding: '5px',
                    lineHeight: '17.5px',
                    textAlign: 'right',
                    marginBottom: '5px',
                    backgroundColor: '#ebf5ff',
                    color: '#2c7fdf',
                    border: '1px solid #2c7fdf',
                    borderRadius: '10px',
                  }}
                >
                  {id}
                </span>
                <a
                  href={`https://map.kakao.com/link/to/${StationName},${lat},${lng}`}
                  style={{
                    color: 'blue',
                    textDecoration: 'none',
                    fontWeight: 'normal',
                    marginRight: '10px',
                    marginLeft: 'auto',
                  }}
                  target='_blank'
                  rel='noreferrer'
                >
                  길찾기
                </a>
                <span
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    fontWeight: 'normal',
                  }}
                  onClick={closeWindow}
                >
                  창닫기
                </span>
              </div>
              <span>{StationName}</span>
            </div>
            <hr />
            <span>
              급속 : {AC}개 / 완속 : {DC}개
            </span>
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
