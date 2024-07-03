import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import '../scss/MyPageCharge.scss';
import styled from 'styled-components';
import { Modal, ModalBody } from 'reactstrap';
import DatePicker from 'react-datepicker';
import '../../../../scss/Button.scss';
import { ReserveStationContext } from '../../../../contexts/ReserveStationContext';
import AuthContext from '../../../../util/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPageCharge = () => {
  const navigate = useNavigate();
  const [cancel, setCancel] = useState(false);
  const [
    cancelReservationNumber,
    setCancelReservationNumber,
  ] = useState(null);

  const toggle = () => {
    setCancel(!cancel);
  };

  // 시간 / 분 필터
  const formatTime = (minutes) => {
    // 시간
    const hours = Math.floor(minutes / 60);
    // 분 (나머지)
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${remainingMinutes}분`;
    }
  };

  // 충전 종료 시간
  const calculateEndTime = (startTime, durationMinutes) => {
    const startDate = new Date(startTime);
    startDate.setMinutes(
      startDate.getMinutes() + durationMinutes,
    );
    return startDate;
  };

  const button = (reservations) => (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <button
        className='public-btn'
        onClick={() => toggleCancel(reservations)}
      >
        예약 취소
      </button>
    </div>
  );

  const toggleCancel = (reservations) => {
    console.log('가져온 예약번호 : ' + reservations);
    setCancelReservationNumber(reservations);
    setCancel(!cancel);
  };

  const cancelReservation = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://localhost:8181/mypage?reservationNo=${cancelReservationNumber}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      alert(
        '예약이 취소되었습니다. 환불은 24시간 이내로 이루어집니다.',
      );
      setCancel(!cancel);
      setReserveStation((prev) =>
        prev.filter(
          (r) =>
            r.reservationNo !== cancelReservationNumber,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const CancelCharge = () => (
    <ModalBackground>
      <Modal isOpen={cancel} toggle={toggle}>
        <ModalBody>
          <div style={{ fontFamily: 'font2' }}>
            <div className='my-charge-content'>
              <div>예약을 취소하시겠습니까?</div>
            </div>
            <div className='flex my-charge-modal-button'>
              <button
                className='public-btn cancel-charge-btn'
                onClick={cancelReservation}
              >
                예약 취소
              </button>
              <button
                className='public-btn cancel-charge-btn'
                onClick={toggle}
              >
                뒤로 가기
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  // 예약이 없는 상태 리턴값
  const NoReservation = () => {
    return (
      <>
        {phoneNumber.length > 1 ? (
          // 로그인은 했는지
          <div className='no-reserve'>
            <div>예약하신 충전소가 없습니다.</div>
            <div>
              <span
                onClick={() =>
                  navigate('/charge/reservation')
                }
                style={{
                  cursor: 'pointer',
                  color: '#F18D8A',
                }}
              >
                충전소 예약 페이지로 이동하기
              </span>
            </div>
          </div>
        ) : (
          // 로그인도 안했는지
          <div className='no-reserve'>
            <div>로그인을 안한 상태입니다.</div>
            <div>
              <span
                onClick={() => navigate('/Login')}
                style={{
                  cursor: 'pointer',
                  color: '#F18D8A',
                }}
              >
                로그인 페이지로 이동하기
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  // 예약한 상태 리턴값
  const YesReservation = ({ reservations }) => {
    return (
      <>
        {reservations.map((r) => {
          const endTime = calculateEndTime(
            r.rentTime,
            r.time,
          );

          return (
            <div key={r.id}>
              <div className='flex'>
                <div className='value'>충전소명</div>
                <div>{r.stationName}</div>
              </div>

              <div className='flex'>
                <div className='value'>충전소 주소</div>
                <div>{r.address}</div>
              </div>

              <div className='flex'>
                <div className='value'>가격</div>
                <div>
                  {r.rentChargePrice}원 (
                  {formatTime(r.time)})
                </div>
              </div>

              <div className='flex'>
                <div className='value'>충전 시작 시간</div>
                <DatePicker
                  className='read-only-date'
                  selected={new Date(r.rentTime)}
                  showTimeSelect
                  dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
                  disabled
                />
              </div>

              <div className='flex'>
                <div className='value'>충전 종료 시간</div>
                <DatePicker
                  className='read-only-date'
                  selected={endTime}
                  showTimeSelect
                  dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
                  disabled
                />
              </div>

              <div className='flex'>
                <div className='value'>예약번호</div>
                <div>{r.reservationNo}</div>
              </div>

              {button(r.reservationNo)}
              {cancel && CancelCharge()}
            </div>
          );
        })}
      </>
    );
  };

  // 예약한 충전소와 사용자의 정보
  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  );
  // 로그인한 사용자의 전화번호로 동일한 계정 찾기
  const { phoneNumber } = useContext(AuthContext);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/mypage',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();

        // phoneNumber와 일치하는 예약만 필터링
        const filteredData = data.filter(
          (station) => station.phoneNumber === phoneNumber,
        );
        setReserveStation(filteredData);
        console.log('내 전화번호 : ' + phoneNumber);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [phoneNumber, setReserveStation]);

  return (
    <div className='reservation-list'>
      <h3 style={{ textAlign: 'center' }}>
        전기차 충전소 예약 내역
      </h3>
      {reserveStation.length > 0 ? (
        <YesReservation reservations={reserveStation} />
      ) : (
        <NoReservation />
      )}
    </div>
  );
};

export default MyPageCharge;

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
