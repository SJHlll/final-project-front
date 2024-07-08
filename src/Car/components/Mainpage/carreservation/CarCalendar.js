import React, { useContext, useEffect } from 'react';
import DatePicker, {
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './reservation_css/CarCalendar.module.scss';
import { ko } from 'date-fns/locale';
import { addMonths, setHours, setMinutes } from 'date-fns';
import AuthContext from '../../../../util/AuthContext';
import { CarContext } from '../../../../contexts/CarContext';

registerLocale('ko', ko);

const CarCalendar = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  startTime,
  endTime,
  onChangeStartTime,
  onChangeEndTime,
  setDaysBetween,
}) => {
  const { selectedCar, reservedDates } =
    useContext(CarContext);
  const { isLoggedIn, token } = useContext(AuthContext);
  useEffect(() => {
    console.log('selected Car:', selectedCar);
    console.log('reserved dates:', reservedDates);
  }, [selectedCar, reservedDates]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onChangeStartDate(start);
    onChangeEndDate(end);

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

    if (end) {
      onChangeEndTime(
        setHours(
          setMinutes(new Date(end), endTime.getMinutes()),
          endTime.getHours(),
        ),
      );
      const daysBetween = Math.ceil(
        (new Date(end) - new Date(start)) /
          (1000 * 60 * 60 * 24) +
          1,
      );
      setDaysBetween(daysBetween);
    }
  };

  const handleStartTimeChange = (time) => {
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
    if (endDate) {
      const newEndTime = new Date(endDate);
      newEndTime.setHours(time.getHours());
      newEndTime.setMinutes(time.getMinutes());
      onChangeEndTime(newEndTime);
    } else {
      onChangeEndTime(time);
    }
  };

  const minDate = new Date();
  const maxDate = addMonths(new Date(), 12);

  return (
    <div className={styles.carCalendarContent}>
      <div>
        <DatePicker
          id={styles.calendar}
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
          monthsShown={2}
          excludeDates={reservedDates}
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
          className={styles.timeHeader}
        >
          시간선택
        </header>
        <div className={styles.timeBlock}>
          <div className={styles.pickupTitle}>픽업 :</div>
          <DatePicker
            id={styles.pickupTime}
            selected={startTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat='h:mm aa'
            timeCaption='픽업 시간'
          />
        </div>

        <div className={styles.timeBlock}>
          <div className={styles.returnTitle}>반납 :</div>
          <DatePicker
            id={styles.returnTime}
            selected={endTime}
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat='h:mm aa'
            timeCaption='반납 시간'
          />
        </div>
      </div>
    </div>
  );
};

export default CarCalendar;
