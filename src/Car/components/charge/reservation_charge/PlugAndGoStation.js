import React, { useContext, useState } from 'react';
import styles from '../scss/PlugAndGoStation.module.scss';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import ReservationModal from './ReservationModal';
import style from '../../../../scss/Button.module.scss';
import { SecondMapContext } from '../../../../contexts/SecondMapContext';

const PlugAndGoStation = ({
  lat,
  lng,
  StationId,
  Name,
  Address,
  Speed,
  Type,
  price,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { setSelectedStation, setMapLevel } = useContext(
    SecondMapContext,
  );

  // 위치 찾기 버튼 클릭 시 발동하는 함수
  const handleLocateClick = () => {
    setSelectedStation({ lat, lng, StationId }); // 선택된 좌표 업데이트, 충전기 아이디 전송
    setMapLevel(5); // 지도 레벨 설정
  };

  // Modal Open 버튼 활성화
  const button = () => (
    <div>
      <button
        className={`${style.publicBtn} ${style.reserveButton}`}
        onClick={toggle}
      >
        예약하기
      </button>
    </div>
  );

  const closeBtn = (
    <button className={style.publicBtn} onClick={toggle}>
      &times;
    </button>
  );

  // 예약하기 모달창 활성화
  const modalOpen = () => (
    <ModalBackground>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ top: '15%' }}
      >
        <ModalBody>
          <ReservationModal
            chargeId={StationId}
            stationName={Name}
            address={Address}
            speed={Speed}
            type={Type}
            price={price}
          />
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  return (
    <div className={styles.OurStation}>
      <div className={styles.stationContent}>
        <div className={styles.Name}>
          <span
            className={styles.nameDetail}
            onClick={handleLocateClick}
          >
            ({Speed}) {Name}
          </span>
        </div>
      </div>
      <div className={styles.stationContent}>
        <div className={styles.Address}>
          <span className={styles.addressDetail}>
            <HoverATag
              href={`https://map.kakao.com/link/to/${Address},${lat},${lng}`}
              target='_blank'
              rel='noreferrer'
            >
              {Address}
            </HoverATag>
          </span>
        </div>
      </div>
      <div
        className={`${styles.foot} ${styles.stationContent}`}
      >
        <div className={styles.ChargerType}>{Type}</div>
        <div className={styles.Price}>{price}원</div>
        {button()}
      </div>
      {modal && modalOpen()}
    </div>
  );
};

export default PlugAndGoStation;

const HoverATag = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;
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
