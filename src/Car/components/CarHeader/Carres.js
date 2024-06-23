import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { StationProvider } from '../../../charge/components/contexts/StationContext';
import CarCalendar from '../car/CarCalendar';
import CarResInfo from './CarResInfo';
import { setHours, setMinutes } from 'date-fns';

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

const Carres = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(
    setHours(setMinutes(new Date(), 0), 9),
  );
  const [endTime, setEndTime] = useState(
    setHours(setMinutes(new Date(), 0), 9),
  );

  const saveReservation = async (reservationData) => {
    try {
      const response = await fetch('/api/saveReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Reservation saved:', result);
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  const reservationHandler = () => {
    if (!startDate) {
      alert('픽업 날짜를 선택하세요.');
      return;
    }
    if (!endDate) {
      alert('반납 날짜를 선택하세요.');
      return;
    }
    if (!startTime) {
      alert('픽업 시간을 선택하세요.');
      return;
    }
    if (!endTime) {
      alert('반납 시간을 선택하세요.');
      return;
    }

    alert('예약이 완료되어 결제창으로 넘어갑니다.');
    setModal(!modal);

    const reservationData = {
      startDate,
      endDate,
      startTime,
      endTime,
    };

    // 예약 데이터를 저장합니다.
    saveReservation(reservationData);
  };

  const button = (
    <div>
      <Button
        variant='outline'
        color='success'
        size='small'
        style={{ width: '20%' }}
        onClick={toggle}
      >
        예약 하기
      </Button>
    </div>
  );

  const closeBtn = (
    <Button color='success' size='large' onClick={toggle}>
      &times;
    </Button>
  );

  const modalOpen = (
    <ModalBackground>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          예약확인
        </ModalHeader>
        <ModalBody>
          <CarResInfo
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
          />
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
            결제 하기
          </Button>
        </ModalFooter>
      </Modal>
    </ModalBackground>
  );

  return (
    <>
      <CarCalendar
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
        startTime={startTime}
        endTime={endTime}
        onChangeStartTime={setStartTime}
        onChangeEndTime={setEndTime}
      />
      {modal ? modalOpen : button}
      <StationProvider />
    </>
  );
};

export default Carres;
