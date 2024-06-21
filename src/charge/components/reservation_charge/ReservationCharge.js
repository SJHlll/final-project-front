import React, { useState } from 'react';
import { Button } from '@mui/material';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import ReservationModal from './ReservationModal';
import '../scss/ReservationCharge.scss';
import styled from 'styled-components';
import ReservationList from './ReservationList';
import Header from '../../Header/Chargeheader';
import { StationProvider } from '../contexts/StationContext';

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

const ReservationCharge = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    console.log('버튼 클릭중!');
    setModal(!modal);
  };

  // Modal Open 버튼 활성화
  const button = (
    <Button
      variant='outlined'
      color='success'
      size='small'
      style={{ width: '30%', justifySelf: 'center' }}
      onClick={toggle}
    >
      Modal Open!
    </Button>
  );

  const reservationHandler = () => {
    alert('예약이 완료되었습니다.');
    setModal(!modal);
  };

  // 예약하기 모달창 활성화
  const modalOpen = (
    <ModalBackground>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
          <Button
            color='success'
            variant='outlined'
            onClick={toggle}
            style={{
              width: 'fit-content',
              height: '30px',
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <ReservationModal />
        </ModalBody>
        <ModalFooter>
          <Button
            className='reservation'
            variant='outlined'
            color='success'
            size='small'
            style={{ width: '30%', height: '30px' }}
            onClick={reservationHandler}
          >
            예약하기
          </Button>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );

  return (
    <>
      <Header />
      {modal ? modalOpen : button}
      <StationProvider>
        <ReservationList />
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
