import React, { useEffect } from 'react';
import DatePicker, {
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './reservation_css/CarCalendar.module.scss';
import { ko } from 'date-fns/locale';
import { addMonths, setHours, setMinutes } from 'date-fns';
import { Height } from '@mui/icons-material';

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
  // 날짜 변경 핸들러
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    console.log('Selected Dates:', { start, end }); // 디버깅용 콘솔 출력
    onChangeStartDate(start);
    onChangeEndDate(end);

    // 픽업 날짜 변경 시 픽업 시간을 해당 날짜로 설정
    if (start) {
      onChangeStartTime(
        setHours(
          setMinutes(
            new Date(start),
            startTime.getMinutes(),
          ),
          startTime.getHours(),
        ),
      );
    }

    // 반납 날짜 변경 시 반납 시간을 해당 날짜로 설정
    if (end) {
      onChangeEndTime(
        setHours(
          setMinutes(new Date(end), endTime.getMinutes()),
          endTime.getHours(),
        ),
      );
    }
  };

  const handleStartTimeChange = (time) => {
    console.log('Selected Start Time:', time); // 디버깅용 콘솔 출력
    if (startDate) {
      const newStartTime = new Date(startDate);
      newStartTime.setHours(time.getHours());
      newStartTime.setMinutes(time.getMinutes());
      onChangeStartTime(newStartTime);
    } else {
      onChangeStartTime(time);
    }
  };

  const handleEndTimeChange = (time) => {
    console.log('Selected End Time:', time); // 디버깅용 콘솔 출력
    if (endDate) {
      const newEndTime = new Date(endDate);
      newEndTime.setHours(time.getHours());
      newEndTime.setMinutes(time.getMinutes());
      onChangeEndTime(newEndTime);
    } else {
      onChangeEndTime(time);
    }
  };

  useEffect(() => {
    console.log(
      '픽업 날짜: ',
      startDate,
      '픽업시간: ',
      startTime,
    ); // startDate 상태 변경 추적
  }, [startDate, startTime]);

  useEffect(() => {
    console.log(
      '반납날짜: ',
      endDate,
      '반납시간: ',
      endTime,
    ); // endDate 상태 변경 추적
  }, [endDate, endTime]);

  const minDate = new Date(); // 최소 날짜는 오늘 날짜로 설정합니다.
  const maxDate = addMonths(new Date(), 12); // 최대 날짜를 12개월 후로 설정합니다.

  return (
    <div className={styles.carCalendarContent}>
      <div>
        <DatePicker
          id={styles.calendar}
          locale={ko}
          style={{
            Height: '400px',
          }}
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
          onChange={handleDateChange} // 날짜 변경 핸들러 연결
          startDate={startDate} // 시작 날짜
          endDate={endDate} // 종료 날짜
          minDate={minDate} // 최소 날짜 설정
          maxDate={maxDate} // 최대 날짜 설정
          selectsRange
          inline
          showDisabledMonthNavigation
          monthsShown={2} // 화면에 보여주는 월 갯수
        />
      </div>

      <div
        style={{
          border: '1px solid lightgray',
          position: 'relative',
          width: '482px',
          left: '0%',
          bottom: '80%',
          marginTop: '167px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
        }}
        className={styles.timeContainer}
      >
        <header
          style={{
            fontSize: '20px',
            width: '70%',
            margin: '0 auto',
            padding: '1.5%',
            borderBottom: '1px solid black',
          }}
        >
          시간선택
        </header>
        <div className={styles.timeBlock}>
          <div
            style={{
              display: 'flex',
            }}
            className={styles.pickupTitle}
          >
            픽업 :
          </div>
          <DatePicker
            id={styles.pickupTime}
            selected={startTime}
            onChange={handleStartTimeChange} // 시작 시간 변경 핸들러 연결
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

        <div className={styles.timeBlock}>
          <div className={styles.returnTitle}>반납 :</div>
          <DatePicker
            id={styles.returnTime}
            selected={endTime}
            onChange={handleEndTimeChange} // 종료 시간 변경 핸들러 연결
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
    </div>
  );
};

export default CarCalendar;
