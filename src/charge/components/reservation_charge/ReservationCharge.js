import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import ReservationModal from './ReservationModal';
import '../scss/ReservationCharge.scss';

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
    <Modal isOpen={modal} toggle={toggle}>
      <Button
        color='success'
        variant='outlined'
        onClick={toggle}
        style={{ marginBottom: '10px' }}
      >
        뒤로가기
      </Button>
      <ModalBody>
        <ReservationModal />
      </ModalBody>
      <ModalFooter>
        <Button
          className='reservation'
          variant='outlined'
          color='success'
          size='small'
          style={{ width: '30%' }}
          onClick={reservationHandler}
        >
          예약하기
        </Button>
      </ModalFooter>
    </Modal>
  );

  return <>{modal ? modalOpen : button}</>;
};

export default ReservationCharge;
