import { setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import '../scss/MyPageModifyCharge.scss';

const MyPageModifyCharge = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className='form-modify'>
      <div className='flex'>
        <div style={{ padding: '15px' }}>
          날짜 / 시간 변경
        </div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          filterTime={filterPassedTime}
          timeIntervals={10} // 10분 단위
          // dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
          inline
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <DatePicker
          className='read-only-date'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText={(date) => setStartDate(date)}
          dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
          readOnly
        />
      </div>
    </div>
  );
};

export default MyPageModifyCharge;
