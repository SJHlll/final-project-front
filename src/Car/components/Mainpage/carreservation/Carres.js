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
import styles from './reservation_css/Carres.modul.scss';
import CarInfo from './CarInfo';
import Rent from '../Rent/Rent.js';
import { CarContext } from './../../../../contexts/CarContext';


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

  // DB에서 전기차 목록 불러오기
  // rentCar = 전기차 목록 배열
  const { rentCar, setRentCar } = useContext(CarContext);
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/car/res',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        console.log(data); // 데이터 형식 확인
        // setRentCar = 백엔드에서 불러온 전기차들 rentCar에 집어넣음
        setRentCar(data.carList || []); // CarListResponseDTO -> private List<CarDetailResponseDTO> carList;
      } catch (error) {
        console.error(error);
      }
    };
    fetchStations();
  }, []);

  return (
    <>
      <CarInfo rentCar={rentCar} />{' '}
      {/* 백엔드에 불러온 rentCar를 CarInfo로 보냄 */}
      <RightContent>
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
        <Rent />
      </RightContent>
    <StationProvider />
    </>
  );
};

export default Carres;

const RightContent = styled.div`
  margin-top: 20px;
`;
