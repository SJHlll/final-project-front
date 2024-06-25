import React, { useState } from 'react';
import '../scss/MyPageCharge.scss';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import DatePicker from 'react-datepicker';
import CancelChargeModal from './CancelChargeModal';
import '../../../scss/Button.scss';

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
  const toggle = () => {
    setCancel(!cancel);
  };

  const button = () => (
    <div>
      <button className='public-btn' onClick={toggle}>
        예약 취소
      </button>
    </div>
  );

  const CancelCharge = () => (
    <ModalBackground>
      <Modal isOpen={cancel} toggle={toggle}>
        <ModalBody>
          <CancelChargeModal />
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  return (
    <div className='reservation-list'>
      <h3 style={{ textAlign: 'center' }}>
        전기차 충전소 예약 내역
      </h3>
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
        <div>OOO 충전소</div>
      </div>
      <div className='flex'>
        <div className='value'>예약번호</div>
        <div>123456</div>
      </div>
      {button()}
      {cancel && CancelCharge()}
    </div>
  );
};

export default MyPageCharge;
