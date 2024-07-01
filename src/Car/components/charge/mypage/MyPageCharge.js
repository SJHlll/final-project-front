import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import '../scss/MyPageCharge.scss';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import DatePicker from 'react-datepicker';
import '../../../../scss/Button.scss';
import { ReserveStationContext } from '../../../../contexts/ReserveStationContext';

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

const MyPageCharge = () => {
  const [cancel, setCancel] = useState(false);
  // const [isReservation, setIsReservaion] = useState(false); // 예약 존재 여부

  const toggle = () => {
    setCancel(!cancel);
  };

  const button = () => (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <button className='public-btn' onClick={toggle}>
        예약 취소
      </button>
    </div>
  );

  const cancelReservation = () => {
    alert('예약이 취소되었습니다.');
    setCancel(!cancel);
  };

  const CancelCharge = () => (
    <ModalBackground>
      <Modal isOpen={cancel} toggle={toggle}>
        <ModalBody>
          <div style={{ fontFamily: 'font2' }}>
            <div className='content'>
              <div>예약을 취소하시겠습니까?</div>
            </div>
            <div className='flex modal-button'>
              <button
                className='public-btn cancel-charge-btn'
                onClick={cancelReservation}
              >
                예약 취소
              </button>
              <button
                className='public-btn cancel-charge-btn'
                onClick={toggle}
              >
                뒤로 가기
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  const NoReservation = () => {
    <div>예약이 없습니다.</div>;
  };

  const YesReservation = ({ r }) => {
    return (
      <>
        <div className='flex'>
          <div className='value'>날짜 및 시간</div>
          <DatePicker
            className='read-only-date'
            selected={new Date()}
            showTimeSelect
            dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
            readOnly
          />
        </div>
        <div className='flex'>
          <div className='value'>충전소명</div>
          <div>{r.stationName}</div>
        </div>
        <div className='flex'>
          <div className='value'>예약번호</div>
          <div>123456</div>
        </div>
        {button()}
        {cancel && CancelCharge()}
      </>
    );
  };

  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  );

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/mypage',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setReserveStation(data.ReservedStationList || []);
        console.log(reserveStation);
        console.log('===========================');
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className='reservation-list'>
      <h3 style={{ textAlign: 'center' }}>
        전기차 충전소 예약 내역
      </h3>
      <YesReservation r={reserveStation} />
    </div>
  );
};

export default MyPageCharge;
