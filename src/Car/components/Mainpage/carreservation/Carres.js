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
import moment from 'moment';

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
  width: 25%;
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
    date: null,
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

  const saveReservation = async (reservationData) => {
    const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 토큰
    console.log('token: ', token);
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

  // 예약 완료 알림창
  const reservationHandler = () => {
    const reservationData = {
      carId: selectedCar.id,
      carName: selectedCar.carName,
      rentTime: pickup.time
        ? moment(pickup.time).toString()
        : null,
      turninTime: returning.time
        ? moment(returning.time).toString()
        : null,
      totalPrice: totalPrice.replace(/,/g, ''),
      extra,
    };

    if (!pickup.date || !returning.date) {
      alert('픽업 날짜와 반납 날짜를 선택하세요.');
      return;
    }

    if (!reservationData) {
      alert('예약이 불가능합니다.');
    }

    alert('예약이 완료되어 결제창으로 넘어갑니다.');
    setModal(!modal);

    saveReservation(reservationData);

    // totalPrice를 정수로 변환
    const intPrice = parseInt(totalPrice.replace(/,/g, ''));

    const width = 700;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `/pay?totalPrice=${intPrice}`,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  };

  // 비회원 예약 방지 및 차량, 날짜 선택 핸들러
  const confirmReservationHandler = () => {
    if (!isLoggedIn) {
      alert('로그인 회원만 예약 가능 합니다.');
      navigate('/Login');
    } else if (!selectedCar) {
      alert('차를 선택해 주세요.');
    } else if (!pickup.date) {
      alert('대여 시작 날짜를 선택 해 주세요.');
    } else if (!returning.date) {
      alert('반납 날짜를 선택해 주세요.');
    } else {
      toggle();
    }
  };

  const button = (
    <button
      className={`${styles.resBtn} ${style.publicBtn}`}
      onClick={confirmReservationHandler}
      type='button'
    >
      예약하기
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
          <hr
            style={{
              marginBottom: '0px',
            }}
          />
          <ModalFooter>
            <div className={styles.payBtnParent}>
              <button
                className={`${style.publicBtn} ${styles.payBtn}`}
                onClick={reservationHandler}
              >
                결제하기
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
            1일 렌트 금액
            <div className={styles.caltotalbox2}>
              {selectedCar
                ? `${selectedCar.carPrice.toLocaleString('ko-KR')}원`
                : '0원'}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              position: 'relative',
              top: '48%',
              paddingLeft: '3%',
              alignContent: 'center',
            }}
          >
            <div
              style={{
                width: '60%',
              }}
            >
              <ul
                style={{
                  fontSize: '23px',
                  marginBottom: '0px',
                  top: '46%',
                }}
              >
                총 렌트가격
              </ul>
              <ul
                style={{
                  fontSize: '20px',
                  marginBottom: '0px',
                }}
              >
                {totalPrice} 원
              </ul>
            </div>
            <div className={styles.reservationBtn}>
              {modal ? modalOpen : button}
            </div>
          </div>
        </div>
      </div>
      {/* {selectedCar && <CarInfo rentCar={[selectedCar]} />} */}
      {/* 선택된 차가 있을 때만 CarInfo 컴포넌트 렌더링 */}

      <StationProvider />
      <CarSwiperReal setSelectedCar={setSelectedCar} />
      {/* CarSwiperReal 컴포넌트에 setSelectedCar 함수 전달 */}
    </>
  );
};

export default Carres;
