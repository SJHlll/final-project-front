// Modal.js
import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
`;

const KakaoMapModal = ({ isOpen, onClose, marker }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {marker && (
          <div>
            <h3 style={{ display: 'flex' }}>
              <span>{marker.StationName}</span>
              <a
                href={`https://map.kakao.com/link/to/${marker.Address},${marker.lat},${marker.lng}`}
                target='_blank'
                rel='noreferrer'
                style={{ marginLeft: 'auto' }}
              >
                길찾기
              </a>
            </h3>
            <p>주소: {marker.Address}</p>
            <p>충전 속도: {marker.Speed}</p>
            <p>충전기 타입: {marker.Type}</p>
            <p>관리 회사: {marker.Management}</p>
            <p>이용 시설: {marker.areaIn}</p>
            <p>이용 가능 여부: {marker.Available}</p>
            <p>위도: {marker.lat}</p>
            <p>경도: {marker.lng}</p>
            <p>충전기 ID: {marker.StationId}</p>
          </div>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default KakaoMapModal;
