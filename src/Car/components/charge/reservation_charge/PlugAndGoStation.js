import React, { useContext, useState } from 'react';
import styles from '../scss/PlugAndGoStation.module.scss';
import styled from 'styled-components';
import ReservationModal from './ReservationModal';
import { SecondMapContext } from '../../../../contexts/SecondMapContext';
import AuthContext from '../../../../util/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();

  // 위치 찾기 버튼 클릭 시 발동하는 함수
  const handleLocateClick = () => {
    setSelectedStation({ lat, lng, StationId }); // 선택된 좌표 업데이트, 충전기 아이디 전송
    setMapLevel(5); // 지도 레벨 설정
  };

  // Modal Open 버튼 활성화
  const button = () => (
    <div>
      {!userName ? (
        <button
          className={`${styles.publicBtn} ${styles.reserveButton}`}
          onClick={() => navigate('/Login')}
          style={{ fontSize: '0.8em' }}
        >
          로그인하기
        </button>
      ) : (
        <button
          className={`${styles.publicBtn} ${styles.reserveButton}`}
          onClick={toggle}
        >
          예약하기
        </button>
      )}
    </div>
  );

  const closeBtn = (
    <button
      onClick={toggle}
      style={{
        border: '0px',
        background: '#fff',
        display: 'block',
        // marginLeft: 'auto',
        // marginTop: '10px',
        fontSize: '20px',
      }}
    >
      &times;
    </button>
  );

  // 예약하기 모달창 활성화
  const modalOpen = () => (
    <ModalBackground onClick={toggle}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            padding: '3%',
            paddingBottom: '0px',
          }}
        >
          <div
            style={{
              width: '100%',
              fontSize: '20px',
            }}
          >
            전기차 충전소 예약
          </div>
          {closeBtn}
        </div>
        <hr
          style={{
            marginBottom: '0px',
          }}
        />
        <ReservationModal
          chargeId={StationId}
          stationName={Name}
          address={Address}
          speed={Speed}
          type={Type}
          price={price}
          isOpen={modal}
        />
      </ModalContent>
    </ModalBackground>
  );

  return (
    <div
      className={styles.OurStation}
      style={{
        backgroundColor: 'white',
      }}
    >
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

const ModalContent = styled.div`
  background: white;
  padding: 0 15px 0;
  border-radius: 10px;
  height: 405px;
  overflow-y: auto;
  position: relative;
`;
