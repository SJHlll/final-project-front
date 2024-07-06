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
import { useNavigate } from 'react-router-dom';

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
  const [daysBetween, setDaysBetween] = useState(0); // 렌트 기간 상태 추가

  const { selectedCar, setSelectedCar } =
    useContext(CarContext); // 자동차 정보

  const { isLoggedIn } = useContext(AuthContext); // 유저 정보

  const [extra, setExtra] = useState(''); // 비고

  const navigate = useNavigate(); // 비회원 로그인 화면으로 이동용

  const toggle = () => setModal(!modal);

  const handleExtraChange = (newExtra) => {
    setExtra(newExtra);
  };

  const totalPrice = selectedCar
    ? (
        parseInt(daysBetween, 10) * selectedCar.carPrice
      ).toLocaleString('ko-KR')
    : 0;

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

  const saveReservation = async (reservationData) => {
    const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 토큰
    try {
      const res = await fetch('/rentcar/reservation', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      console.log('reservation Data: ', reservationData);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // JSON으로 구문 분석하기 전에 응답 본문이 비어 있지 않은지 확인합니다.
      const result = await res.text();
      if (result) {
        const jsonResponse = JSON.parse(result);
        console.log('Reservation saved:', jsonResponse);
      } else {
        console.log(
          '예약이 저장되었지만 JSON 응답이 수신되지 않았습니다',
        );
      }
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  // 회원일 시 알림 창
  const reservationHandler = () => {
    if (!pickup.date) {
      alert('픽업 날짜를 선택하세요.');
      return;
    }

    if (!returning.date) {
      alert('반납 날짜를 선택하세요.');
      return;
    }

    if (!selectedCar) {
      alert('차량을 선택하세요.');
      return;
    }

    const reservationData = {
      carId: selectedCar.id,
      rentDate: `${pickup.date.toISOString().split('T')[0]}T${pickup.time.toTimeString().split(' ')[0]}`,
      turninDate: `${returning.date.toISOString().split('T')[0]}T${returning.time.toTimeString().split(' ')[0]}`,
      rentTime: pickup.time.toTimeString().split(' ')[0],
      turninTime: returning.time
        .toTimeString()
        .split(' ')[0],
      totalPrice: totalPrice.replace(/,/g, ''),
      extra,
    };

    alert('예약이 완료되어 결제창으로 넘어갑니다.');
    setModal(!modal);

    saveReservation(reservationData);
  };

  // 비회원 예약 방지 핸들러
  const confirmReservationHandler = () => {
    if (!isLoggedIn) {
      alert('로그인 후 예약이 가능합니다.');
      navigate('/Login');
    } else {
      toggle();
    }
  };

  // const reservationHandler = () => {
  //   if (!pickup.date) {
  //     alert('픽업 날짜를 선택하세요.');
  //     return;
  //   }
  //   if (!returning.date) {
  //     alert('반납 날짜를 선택하세요.');
  //     return;
  //   }
  //   if (!pickup.time) {
  //     alert('픽업 시간을 선택하세요.');
  //     return;
  //   }
  //   if (!returning.time) {
  //     alert('반납 시간을 선택하세요.');
  //     return;
  //   }
  //   if (!selectedCar) {
  //     alert('차량을 선택하세요.');
  //     return;
  //   }

  //   alert('예약이 완료되어 결제창으로 넘어갑니다.');
  //   setModal(!modal);

  //   const reservationData = {
  //     carId: selectedCar.id,
  //     rentDate: `${pickup.date.toISOString().split('T')[0]}T${pickup.time.toTimeString().split(' ')[0]}`,
  //     turninDate: `${returning.date.toISOString().split('T')[0]}T${returning.time.toTimeString().split(' ')[0]}`,
  //     rentTime: pickup.time.toTimeString().split(' ')[0],
  //     turninTime: returning.time
  //       .toTimeString()
  //       .split(' ')[0],
  //     totalPrice: totalPrice.replace(/,/g, ''),
  //     extra: `${extra}`,
  //   };

  //   saveReservation(reservationData);
  // };

  const button = (
    <button
      className={`${style.resBtn} ${style.publicBtn}`}
      onClick={confirmReservationHandler}
      type='button'
    >
      예약하기
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
              className={`${styles.publicBtn} ${styles.closeBtn}`}
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
                  totalPrice={totalPrice} // 프롭스 전달!!
                  onExtraChange={handleExtraChange} // 비고
                />
              </div>
            </div>
          </ModalBody>
          <hr />
          <ModalFooter>
            <div className={styles.payBtnParent}>
              <button
                className={`${style.publicBtn} ${style.payBtn}`}
                onClick={reservationHandler}
              >
                예약 확정 하기
              </button>
            </div>
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
          marginLeft: '3%',
          marginTop: '1%',
        }}
      >
        <div className={styles.selectCar}>
          <div className={styles.pickCarTitle}>
            선택된 차량
          </div>
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
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid lightgrey',
            width: '403px',
            height: '400px',
            top: '10px',
            // alignContent: 'center',
            // lineHeight: '2.5',
            backgroundColor: 'white',
            position: 'relative',
            left: '0px',
            borderRadius: '15px',
          }}
        >
          <header
            style={{
              fontSize: '20px',
              width: '70%',
              margin: '0 auto',
              padding: '1.5%',
              borderBottom: '1px solid black',
              marginTop: '5px',
            }}
          >
            요금상세정보
          </header>
          <div className={styles.caltotalbox1}>
            렌트기간
            <div className={styles.caltotalbox2}>
              {daysBetween} 일
            </div>
          </div>
          <div className={styles.caltotalbox1}>
            1일 렌트금액
            <div className={styles.caltotalbox2}>
              {(selectedCar
                ? selectedCar.carPrice
                : 0
              ).toLocaleString('ko-KR')}{' '}
              원
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            <div className={styles.caltotalbox3}>
              총 렌트금액
              <div className={styles.caltotalbox4}>
                {totalPrice} 원
              </div>
            </div>
            <div className={styles.reservationBtn}>
              {modal ? modalOpen : button}
            </div>
            <div className={styles.caltotalbox2}>
              {daysBetween} 일
            </div>
            <div className={styles.caltotalbox3}>금액</div>
            <div className={styles.caltotalbox4}>
              {totalPrice} 원
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
