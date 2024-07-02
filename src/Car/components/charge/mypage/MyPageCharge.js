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

const MyPageCharge = () => {
  const [cancel, setCancel] = useState(false);
  // const [isReservation, setIsReservaion] = useState(false); // 예약 존재 여부

  const toggle = () => {
    setCancel(!cancel);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${remainingMinutes}분`;
    }
  };

  const calculateEndTime = (startTime, durationMinutes) => {
    const startDate = new Date(startTime);
    startDate.setMinutes(
      startDate.getMinutes() + durationMinutes,
    );
    return startDate;
  };

  const button = () => (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <button className='public-btn' onClick={toggle}>
        예약 취소
      </button>
    </div>
  );

  const cancelReservation = () => {
    alert('예약이 취소되었습니다.');
    setCancel(!cancel);
  };

  const CancelCharge = () => (
    <ModalBackground>
      <Modal isOpen={cancel} toggle={toggle}>
        <ModalBody>
          <div style={{ fontFamily: 'font2' }}>
            <div className='content'>
              <div>예약을 취소하시겠습니까?</div>
            </div>
            <div className='flex modal-button'>
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

  const NoReservation = () => {
    <div>예약이 없습니다.</div>;
  };

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
                <div className='value'>예약자명</div>
                <div>{r.name}</div>
              </div>

              <div className='flex'>
                <div className='value'>전화번호</div>
                <div>{r.phoneNumber}</div>
              </div>

              <div className='flex'>
                <div className='value'>이메일</div>
                <div>{r.email}</div>
              </div>

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

              {button()}
              {cancel && CancelCharge()}
            </div>
          );
        })}
      </>
    );
  };

  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  );
  const { phoneNumber } = useContext(AuthContext);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/mypage',
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
        console.log(phoneNumber);
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
