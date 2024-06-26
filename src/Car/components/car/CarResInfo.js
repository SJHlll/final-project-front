import React from 'react';
import './reservation_css/CarResInfo.scss';

const CarResInfo = ({
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const formatDate = (date) => {
    if (!date) return '선택되지 않음';
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const formatTime = (time) => {
    if (!time) return '선택되지 않음';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(time);
  };

  return (
    <>
      <div className='resInfo'>
        <div className='resName'>이름: ooo</div>
        <div className='phonNumber'>
          전화번호: 010-0000-0000
        </div>
        <div>자동차 정보</div>
        <div>볼보 뭐시깽이</div>
        <div className='date'>
          픽업 날짜: {formatDate(startDate)}
        </div>
        <div className='date'>
          반납 날짜: {formatDate(endDate)}
        </div>
        <div className='time'>
          픽업 시간: {formatTime(startTime)}
        </div>
        <div className='time'>
          반납 시간: {formatTime(endTime)}
        </div>
        <input type='text' />
        비고
      </div>
    </>
  );
};

export default CarResInfo;
