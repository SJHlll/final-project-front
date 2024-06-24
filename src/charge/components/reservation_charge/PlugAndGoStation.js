import React, { useState } from 'react';
import '../scss/PlugAndGoStation.scss';
import { Button } from '@mui/material';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import styled from 'styled-components';
import ReservationModal from './ReservationModal';
import OpenTossPayments from '../../../components/pay/OpenTossPayments';

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

const PlugAndGoStation = ({
  lat,
  lng,
  Name,
  Address,
  Speed,
  Type,
  price,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Modal Open 버튼 활성화
  const button = () => (
    <div>
      <Button
        className='reserve-button'
        variant='outlined'
        color='success'
        size='small'
        onClick={toggle}
      >
        예약하기
      </Button>
    </div>
  );

  const closeBtn = (
    <Button color='success' size='large' onClick={toggle}>
      &times;
    </Button>
  );

  // 예약하기 모달창 활성화
  const modalOpen = () => (
    <ModalBackground>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn} />
        <ModalBody>
          <ReservationModal
            name={Name}
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
    <div className='OurStation'>
      {/* 왼쪽박스 */}
      <div className='Status'>
        <div className='Name'>
          <span>
            ({Speed}) {Name}
          </span>
        </div>
        <div className='Address'>
          <a
            href={`https://map.kakao.com/link/to/${Address},${lat},${lng}`}
            target='_blank'
            rel='noreferrer'
          >
            {Address}
          </a>
        </div>
      </div>
      {/* 오른쪽박스 */}
      <div className='Charger'>
        <div className='ChargerType'>{Type}</div>

        {button()}
        {modal && modalOpen()}
      </div>
    </div>
  );
};

export default PlugAndGoStation;
