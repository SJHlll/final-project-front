import React, { useState } from 'react';
import '../scss/MyPageCharge.scss';
import { Button } from '@mui/material';
import styled from 'styled-components';
import {
  Modal,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import MyPageModifyCharge from './MyPageModifyCharge';

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
  const [modifyModal, setModifyModal] = useState(false);
  const toggle = () => setModifyModal(!modifyModal);

  const modifyReservation = () => {
    alert('예약 변경 완료!');
    setModifyModal(!modifyModal);
  };

  const closeBtn = (
    <Button color='success' size='small' onClick={toggle}>
      &times;
    </Button>
  );

  const modifyOpen = () => {
    return (
      <ModalBackground>
        <Modal isOpen={modifyModal}>
          <ModalHeader toggle={toggle} close={closeBtn} />
          <MyPageModifyCharge />
          <ModalFooter>
            <Button
              className='modify-btn'
              variant='outlined'
              color='success'
              onClick={modifyReservation}
            >
              변경하기
            </Button>
          </ModalFooter>
        </Modal>
      </ModalBackground>
    );
  };

  return (
    <>
      <div className='reservation-list'>
        <h3>전기차 충전소 예약 내역</h3>
        <div className='flex'>
          <div className='value'>날짜</div>
          <div>2024년 06월 22일 PM 04:40</div>
        </div>
        <div className='flex'>
          <div className='value'>충전소명</div>
          <div>OOO 충전소</div>
        </div>
        <div className='flex'>
          <div className='value'>예약번호</div>
          <div>123456</div>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button
            variant='outlined'
            color='success'
            onClick={toggle}
          >
            예약 변경
          </Button>
        </div>
      </div>
      {modifyModal && modifyOpen()}
    </>
  );
};

export default MyPageCharge;
