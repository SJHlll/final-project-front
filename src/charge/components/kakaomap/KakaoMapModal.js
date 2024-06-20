// Modal.js
import React from 'react';
import styled from 'styled-components';
import '../scss/KakaoMapModal.scss';

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
  border-radius: 10px;
  width: 35%;
  max-height: 90%;
  overflow-y: auto;
`;

const KakaoMapModal = ({ isOpen, onClose, marker }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <span className='close-btn' onClick={onClose}>
          X
        </span>
        {marker && (
          <>
            <div className='station-container'>
              <p className='station-name'>
                {marker.StationName}
              </p>
              <hr />
              <div className='man-ava'>
                <p className='station-management'>
                  {marker.Management}
                </p>
                <p
                  className={
                    marker.Available === '이용가능'
                      ? 'able'
                      : 'disable'
                  }
                >
                  {marker.Available}
                </p>
              </div>
              <div className='id-spe-typ'>
                <p className='station-id'>
                  {marker.StationId}
                </p>
                <p className='station-speed'>
                  {marker.Speed}
                </p>
                <p className='station-type'>
                  {marker.Type}
                </p>
              </div>
              <p className='station-address'>
                주소: {marker.Address}
              </p>
              <a
                href={`https://map.kakao.com/link/to/${marker.StationName},${marker.lat},${marker.lng}`}
                target='_blank'
                rel='noreferrer'
                style={{ marginLeft: 'auto' }}
              >
                길찾기
              </a>
            </div>
            {/* 
            충전기
              DC차데모 : DC_ChadeMO.png
              DC콤보 : DC_Combo.png
              AC3상 : AC_3.png
             */}
          </>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default KakaoMapModal;
