// Modal.js
import React from 'react';
import styled from 'styled-components';
import '../scss/KakaoMapModal.scss';
import { ModalBody, ModalFooter } from 'reactstrap';

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
  padding: 0 15px 0;
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
        <div className='header'>
          <span className='close-btn' onClick={onClose}>
            X
          </span>
        </div>
        <ModalBody>
          {marker && (
            <>
              <div className='station-container'>
                <p className='station-name'>
                  {marker.StationName}
                </p>
                <hr />
                <div className='man-ava'>
                  <p className='station-management'>
                    운영기관 : {marker.Management}
                  </p>
                  <p
                    className={
                      marker.Available === '이용가능'
                        ? 'able'
                        : 'disable'
                    }
                  >
                    충전 가능 여부 : {marker.Available}
                  </p>
                </div>
                <div className='id-spe-typ'>
                  <div className='station-id'>
                    <div>충전기 ID</div>
                    <div>{marker.StationId}</div>
                  </div>
                  <div className='station-speed'>
                    <div>구분</div>
                    <div>{marker.Speed}</div>
                  </div>
                  <div className='station-type'>
                    <div>충전기 타입</div>
                    <div>{marker.Type}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <div className='footer'>
            <span className='station-address'>
              {marker.Address}
            </span>
            <br />
            <a
              href={`https://map.kakao.com/link/to/${marker.StationName},${marker.lat},${marker.lng}`}
              target='_blank'
              rel='noreferrer'
            >
              (길찾기)
            </a>
          </div>
        </ModalFooter>
      </ModalContent>
    </ModalBackground>
  );
};

export default KakaoMapModal;
