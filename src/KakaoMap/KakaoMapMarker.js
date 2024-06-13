import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const KakaoMapMarker = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 마커 클릭 시 창 열림
  const openWindow = () => {
    setIsOpen(true);
  };
  // 닫기 클릭시 창 닫힘
  const closeWindow = () => {
    setIsOpen(false);
  };

  let lat = 37.552484; // 위도
  let lng = 126.937641; // 경도
  let StationName = '한국ICT인재개발원 신촌센터'; // 충전소 이름
  let AC = 2; // 완속 충전기 개수
  let DC = 3; // 급속 충전기 개수

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
                flexDirection: 'row-reverse',
                marginTop: '5px',
              }}
            >
              <a
                href='https://map.kakao.com/link/to/한국ICT인재개발원 신촌센터,37.552484,126.937641'
                style={{ color: 'blue', textDecoration: 'none' }}
                target='_blank'
                rel='noreferrer'
              >
                길찾기
              </a>
            </span>
          </div>
          <div
            onClick={closeWindow}
            style={{
              position: 'absolute',
              top: '-32px',
              right: '-1px',
              border: '1px solid black',
              fontSize: '25px',
              fontWeight: 'bold',
              width: '30px',
              height: '30px',
              textAlign: 'center',
              lineHeight: '23px',
              backgroundColor: 'white',
            }}
          >
            &times;
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
