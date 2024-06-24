import { setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import '../scss/ReservationModal.scss';

const ReservationModal = () => {
  const today = new Date();

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const filterPassedTime = (time) => {
    const selectedDate = new Date(time);

    return today.getTime() < selectedDate.getTime();
  };

  // submit 이벤트 핸들러
  const reservationHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='form-wrapper'>
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
              minDate={today}
              // maxDate={new Date().getDate() + 3}
              filterTime={filterPassedTime}
              timeIntervals={10} // 10분 단위
              dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
            />
          </div>
          <div className='flex'>
            <div className='column'>충전소 이름</div>
            <div className='data'>OOO 충전소</div>
          </div>
          <div className='flex'>
            <div className='column'>충전소 위치</div>
            <div className='data'>
              서울시 마포구 OOO로 OOOO길
            </div>
          </div>
          <div className='flex'>
            <div className='column'>충전 타입</div>
            <div className='data'>
              DC차데모+AC3상+DC콤보 (급속 / 완속)
            </div>
          </div>
          <div className='flex'>
            <div className='column'>가격</div>
            <div className='data'>20000원</div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationModal;
