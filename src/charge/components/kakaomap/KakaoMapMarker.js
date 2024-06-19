import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const KakaoMapMarker = ({
  lat,
  lng,
  Id,
  StationName,
  Speed,
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
        <div
          style={{
            minWidth: '200px',
            position: 'relative',
          }}
        >
          <div style={{ padding: '5px', color: '#000' }}>
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
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
                  {Id}
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
              <span
                style={{
                  display: 'inline-block',
                  maxWidth: '250px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {StationName}
              </span>
            </div>
            <hr />
            <span>{Speed}</span>
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
