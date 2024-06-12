import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const KakaoMapMarker = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timer = null;

  // 마커에 마우스 올릴 때 창 생김
  const handleMouseOver = () => {
    if (timer) clearTimeout(timer);
    setIsOpen(true);
  };

  // 뗄 때 0.2초 뒤 창 사라짐
  const handleMouseOut = () => {
    timer = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <MapMarker
      position={{
        lat: 37.552484,
        lng: 126.937641,
      }}
      clickable={true}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isOpen && (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <div style={{ padding: '5px', color: '#000' }}>
            <span style={{ marginRight: '10px' }}>
              한국ICT인재개발원 신촌센터
            </span>
            <span>
              <a
                href='https://map.kakao.com/link/to/한국ICT인재개발원 신촌센터,37.552484,126.937641'
                style={{ color: 'blue' }}
                target='_blank'
                rel='noreferrer'
              >
                길찾기
              </a>
            </span>
          </div>
        </div>
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
