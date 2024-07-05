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
import style from '../../../../scss/Button.module.scss';
import { StationProvider } from '../../../../contexts/StationContext';
import styles from './reservation_css/Carres.module.scss';
import CarSwiperReal from './CarSwiperReal';
import CarInfo from './CarInfo';
import { CarContext } from '../../../../contexts/CarContext';
import AuthContext from '../../../../util/AuthContext';

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
  //const [selectedCar, setSelectedCar] = useState(null); // 선택된 차의 정보를 저장할 상태
  const [daysBetween, setDaysBetween] = useState(0); // 렌트 기간 상태 추가
  const toggle = () => setModal(!modal);

  const { carId, rentCar } = useContext(CarContext); // 자동차 정보

  const { selectedCar, setSelectedCar } =
    useContext(CarContext);

  const { isLoggedIn } = useContext(AuthContext); // 유저 정보

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

  useEffect(() => {
    console.log('렌트 기간 (일):', daysBetween); // 픽업날짜 ~ 반납날짜 개수

    if (selectedCar) {
      console.log(
        '총 렌트 금액: ',
        daysBetween * selectedCar.carPrice,
      );
    }
  }, [daysBetween, selectedCar]);

  const onSelectCar = (car) => {
    setSelectedCar(car);
  };

  const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 토큰

  const saveReservation = async (reservationData) => {
    try {
      const response = await fetch('/rentcar/reservation', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      console.log('reservation Data: ', reservationData);

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
    <button
      className={`${style.resBtn} ${style.publicBtn}`}
      onClick={toggle}
    >
      예약 하기
    </button>
  );

  const closeBtn = (
    <button
      className={`${styles.publicBtn} ${styles.closeBtn}`}
      onClick={toggle}
    >
      &times;
    </button>
  );

  const modalOpen = (
    <ModalBackground>
      <ModalContent>
        <div className={styles.reservationContainer}>
          <div
            className={styles.myComponent}
            id={styles.big}
          >
            <h1 className={styles.resTitle}>예약 확인</h1>
            <span
              className={style.closeBtn}
              onClick={toggle}
            >
              X
            </span>
          </div>

          <ModalBody>
            <div className={styles.resinfoContainer}>
              <hr />
              <div className={styles.resinfoBody}>
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
              className={`${style.publicBtn} ${style.payBtn}`}
              onClick={reservationHandler}
            >
              예약 확정 하기
            </button>
          </ModalFooter>
        </div>
      </ModalContent>
    </ModalBackground>
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          paddingTop: '1%',
        }}
      >
        <div className={styles.selectCar}>
          <CarInfo selectedCar={selectedCar} />
        </div>
        <div className={styles.calendarbtn}>
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
            setDaysBetween={setDaysBetween} // setDaysBetween 전달
          />
          <div className={styles.reservationBtn}>
            {modal ? modalOpen : button}
          </div>
          <div
            style={{
              display: 'flex',
              border: '1px solid black',
              width: '70%',
              margin: '0 auto',
            }}
          >
            <div className={styles.caltotalbox1}>
              렌트기간
            </div>
            <div className={styles.caltotalbox2}>
              {daysBetween} 일
            </div>
            <div className={styles.caltotalbox3}>금액</div>
            <div className={styles.caltotalbox4}>
              {selectedCar
                ? (
                    parseInt(daysBetween, 10) *
                    selectedCar.carPrice
                  ).toLocaleString('ko-KR')
                : 0}
              원
            </div>
          </div>
        </div>
      </div>
      {selectedCar && <CarInfo rentCar={[selectedCar]} />}
      {/* 선택된 차가 있을 때만 CarInfo 컴포넌트 렌더링 */}

      <StationProvider />
      <CarSwiperReal setSelectedCar={setSelectedCar} />
      {/* CarSwiperReal 컴포넌트에 setSelectedCar 함수 전달 */}
    </>
  );
};

export default Carres;
