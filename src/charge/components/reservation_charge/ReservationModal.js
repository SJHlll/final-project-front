import { addDays, setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import '../scss/ReservationModal.scss';
import SpeedSelect from './SpeedSelect';
// import { Button } from 'reactstrap';
import OpenTossPayments from '../../../components/pay/OpenTossPayments';
import '../../../scss/Button.scss';

const ReservationModal = ({
  name,
  address,
  speed,
  type,
  price,
}) => {
  const today = new Date();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(today, 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // submit 이벤트 핸들러
  const reservationHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className='form-wrapper'
        style={{ fontFamily: 'font2' }}
      >
        <form
          className='reservation-charge'
          onSubmit={reservationHandler}
        >
          <div className='flex'>
            <div className='column'>이름</div>
            <div className='data'>OOO</div>
          </div>
          <div className='flex'>
            <div className='column'>핸드폰 번호</div>
            <div className='data'>010-0000-0000</div>
          </div>
          <div className='flex'>
            <div className='column'>예약 날짜 및 시간</div>
            <DatePicker
              className='date-picker'
              selected={startDate}
              // showIcon
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              shouldCloseOnSelect
              minDate={new Date()}
              maxDate={addDays(today, 2)}
              filterTime={filterPassedTime}
              timeIntervals={10} // 10분 단위
              dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
            />
          </div>
          <SpeedSelect />
          <div className='flex'>
            <div className='column'>충전소 이름</div>
            <div className='data'>{name}</div>
          </div>
          <div className='flex'>
            <div className='column'>충전소 위치</div>
            <div className='data'>{address}</div>
          </div>
          <div className='flex'>
            <div className='column'>충전 타입</div>
            <div className='data'>
              {type} ({speed})
            </div>
          </div>
          <div className='flex'>
            <div className='column'>가격</div>
            <div className='data'>
              {price * 10}원 (##kWh)
            </div>
          </div>
          <div
            style={{ width: '100%', textAlign: 'center' }}
          >
            <button className='public-btn'>
              <OpenTossPayments totalPrice={price * 10} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationModal;
