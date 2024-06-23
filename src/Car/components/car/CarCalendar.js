import React, { useEffect, useState } from 'react';
import DatePicker, {
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../car/reservation_css/CarCalendar.scss';
import { ko } from 'date-fns/locale';
import {
  addMonths,
  endOfMonth,
  setHours,
  setMinutes,
} from 'date-fns';

registerLocale('ko', ko); // 한국어 등록

const CarCalendar = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  startTime,
  endTime,
  onChangeStartTime,
  onChangeEndTime,
}) => {
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onChangeStartDate(start);
    onChangeEndDate(end);
  };

  const handleStartTimeChange = (time) => {
    onChangeStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    onChangeEndTime(time);
  };

  const minDate = new Date();
  const maxDate = endOfMonth(addMonths(new Date(), 1));

  return (
    <div className='content'>
      <div>
        <DatePicker
          id='calendar'
          locale={ko}
          renderCustomHeader={({
            monthDate,
            customHeaderCount,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div>
              <button
                aria-label='Previous Month'
                className='react-datepicker__navigation react-datepicker__navigation--previous'
                style={
                  customHeaderCount === 1
                    ? { visibility: 'hidden' }
                    : null
                }
                onClick={decreaseMonth}
              >
                <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'></span>
              </button>
              <span className='react-datepicker__current-month'>
                {monthDate.toLocaleString('ko', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                aria-label='Next Month'
                className='react-datepicker__navigation react-datepicker__navigation--next'
                style={
                  customHeaderCount === 0
                    ? { visibility: 'hidden' }
                    : null
                }
                onClick={increaseMonth}
              >
                <span className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'></span>
              </button>
            </div>
          )}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          selectsRange
          inline
          showDisabledMonthNavigation
          monthsShown={2} // 화면에 보여주는 월 갯수
        />
      </div>
      <div>
        <DatePicker
          id='pickupTime'
          selected={startTime}
          onChange={handleStartTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          excludeTimes={[
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 30), 19),
            setHours(setMinutes(new Date(), 30), 17),
          ]}
          dateFormat='h:mm aa'
          timeCaption='픽업 시간'
        />
      </div>
      <div>
        <DatePicker
          id='returnTime'
          selected={endTime}
          onChange={handleEndTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          excludeTimes={[
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 30), 19),
            setHours(setMinutes(new Date(), 30), 17),
          ]}
          dateFormat='h:mm aa'
          timeCaption='반납 시간'
        />
      </div>
    </div>
  );
};

export default CarCalendar;
