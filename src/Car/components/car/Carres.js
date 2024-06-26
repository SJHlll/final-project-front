import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { StationProvider } from '../../../contexts/StationContext';
import CarCalendar from './CarCalendar';
import CarResInfo from './CarResInfo';
import { setHours, setMinutes } from 'date-fns';
import CarInfo from './CarInfo';
import './reservation_css/Carres.scss';

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

  const [pickup, setPickup] = useState({
    date: new Date(),
    time: setHours(setMinutes(new Date(), 0), 9),
  });
  const [returning, setReturning] = useState({
    date: null,
    time: setHours(setMinutes(new Date(), 0), 9),
  });

  // useEffect 훅을 사용하여 상태 값이 변경될 때마다 로그 출력
  useEffect(() => {
    console.log('픽업 날짜:', pickup.date);
    console.log('픽업 시간:', pickup.time);
  }, [pickup]);

  useEffect(() => {
    console.log('반납 날짜:', returning.date);
    console.log('반납 시간:', returning.time);
  }, [returning]);

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
    if (!pickup.date) {
      alert('픽업 날짜를 선택하세요.');
      return;
    }
    if (!returning.date) {
      alert('반납 날짜를 선택하세요.');
      return;
    }
    if (!pickup.time) {
      alert('픽업 시간을 선택하세요.');
      return;
    }
    if (!returning.time) {
      alert('반납 시간을 선택하세요.');
      return;
    }

    alert('예약이 완료되어 결제창으로 넘어갑니다.');
    setModal(!modal);

    const reservationData = {
      pickup,
      returning,
    };

    saveReservation(reservationData);
  };

  const button = (
    <div className='resBtn'>
      <Button
        variant='outline'
        color='success'
        size='small'
        style={{ width: '54%' }}
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
            pickup={pickup}
            returning={returning}
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
        startDate={pickup.date}
        endDate={returning.date}
        onChangeStartDate={(date) =>
          setPickup((prev) => ({ ...prev, date }))
        }
        onChangeEndDate={(date) =>
          setReturning((prev) => ({ ...prev, date }))
        }
        startTime={pickup.time}
        endTime={returning.time}
        onChangeStartTime={(time) =>
          setPickup((prev) => ({ ...prev, time }))
        }
        onChangeEndTime={(time) =>
          setReturning((prev) => ({ ...prev, time }))
        }
      />
      {modal ? modalOpen : button}
      <StationProvider />
    </>
  );
};

export default Carres;
