import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { ModalBody, ModalFooter } from 'reactstrap';
import CarCalendar from './CarCalendar';
import CarResInfo from './CarResInfo';
import { setHours, setMinutes } from 'date-fns';
import '../../../../scss/Button.scss';
import { StationProvider } from '../../../../contexts/StationContext';
import styles from './reservation_css/Carres.modul.scss';
import CarInfo from './CarInfo';
import CarSwiper from './CarSwiper';
import { CarContext } from '../../../../contexts/CarContext';
import axios from 'axios';
import CarSwiperReal from './CarSwiperReal';

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
  width: 35%;
  max-height: 90%;
  overflow-y: auto;
`;

const Carres = () => {
  const [modal, setModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // 선택된 차의 정보를 저장할 상태
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
    <button className='resBtn public-btn' onClick={toggle}>
      예약 하기
    </button>
  );

  const closeBtn = (
    <button
      className='public-btn closeBtn'
      onClick={toggle}
    >
      &times;
    </button>
  );

  const modalOpen = (
    <ModalBackground>
      <ModalContent>
        <div className='reservation-container'>
          <div className={styles.myComponent} id='big'>
            <h1 className='resTitle'>예약 확인</h1>
            <span className='close-Btn' onClick={toggle}>
              X
            </span>
          </div>

          <ModalBody>
            <div className='resinfo-container'>
              <hr />
              <div className='resinfo-body'>
                <CarResInfo
                  pickup={pickup}
                  returning={returning}
                />
              </div>
            </div>
          </ModalBody>
          <hr />
          <ModalFooter>
            <button
              className='public-btn payBtn'
              onClick={reservationHandler}
            >
              결제 하기
            </button>
          </ModalFooter>
        </div>
      </ModalContent>
    </ModalBackground>
  );

  return (
    <>
      {/* <div>
        <CarInfo rentCar={rentCar} />
      </div> */}
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
      <CarSwiperReal />
      {/* {selectedCar && <CarInfo rentCar={[selectedCar]} />} */}
    </>
  );
};

export default Carres;
