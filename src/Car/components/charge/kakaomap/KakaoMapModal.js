import React, { useEffect } from 'react';
import styled from 'styled-components';
import styles from '../scss/KakaoMapModal.module.scss';
import { ModalFooter } from 'reactstrap';

const KakaoMapModal = ({ isOpen, onClose, marker }) => {
  // ESC 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span
            className={styles.closeBtn}
            onClick={onClose}
          >
            X
          </span>
        </div>
        {marker && (
          <>
            <div className={styles.stationContainer}>
              <p className={styles.stationName}>
                {marker.StationName}
              </p>
              <hr />
              <div className={styles.manAva}>
                <p className={styles.stationManagement}>
                  운영기관 : {marker.Management}
                </p>
                <p
                  className={
                    marker.Available === '이용가능'
                      ? styles.able
                      : styles.disable
                  }
                >
                  {marker.Available}
                </p>
              </div>
              <div className={styles.idSpeTyp}>
                <div className={styles.stationId}>
                  <div>충전기 ID</div>
                  <div>{marker.StationId}</div>
                </div>
                <div className={styles.stationSpeed}>
                  <div>구분</div>
                  <div>{marker.Speed}</div>
                </div>
                <div className={styles.stationType}>
                  <div>충전기 타입</div>
                  <div>{marker.Type}</div>
                </div>
              </div>
            </div>
          </>
        )}
        <ModalFooter>
          <div className={styles.footer}>
            <span className={styles.stationAddress}>
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
