import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import DatePicker, {
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './reservation_css/CarCalendar.module.scss';
import { ko } from 'date-fns/locale';
import {
  addMonths,
  setHours,
  setMinutes,
  parse,
  isValid,
  addDays,
  addHours,
} from 'date-fns';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import { CarContext } from '../../../../contexts/CarContext';
import AuthContext from '../../../../util/AuthContext';

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
  const { selectedCar } = useContext(CarContext);
  const { isLoggedIn, token } = useContext(AuthContext);
  const [reservedDates, setReservedDates] = useState([]);
  const [rentCarList, setRentCarList] = useState([]);

  const fetchRentCarList = useCallback(async () => {
    const accToken = localStorage.getItem('ACCESS_TOKEN');
    try {
      const response = await axios.get(
        'http://localhost:8181/rentcar/reslist',
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        },
      );

      // 여기에서 HTTP 상태 코드를 검사합니다
      if (response.status !== 200) {
        throw new Error(
          `Network response was not ok: ${response.statusText}`,
        );
      }

      console.log(
        'API response:',
        JSON.stringify(response.data, null, 2),
      );
      setRentCarList(response.data.rentList);
    } catch (err) {
      console.error('Error fetching rent car list:', err);
    }
  }, []);

  useEffect(() => {
    console.log(
      'Component mounted, fetching rent car list',
    );
    fetchRentCarList();
  }, [fetchRentCarList]);
  useEffect(() => {
    const filterDates = () => {
      console.log(
        'rentCarList:',
        JSON.stringify(rentCarList, null, 2),
      );
      console.log(
        'selectedCar:',
        JSON.stringify(selectedCar, null, 2),
      );

      if (selectedCar && rentCarList.length > 0) {
        const filteredDates = rentCarList
          .filter((item) => {
            console.log(
              'Comparing:',
              item.carName,
              selectedCar.carName,
            );
            return (
              item.carName &&
              selectedCar.carName &&
              item.carName.toLowerCase() ===
                selectedCar.carName.toLowerCase()
            );
          })
          .flatMap((item) => {
            console.log(
              'Processing item:',
              JSON.stringify(item, null, 2),
            );
            if (!item.rentTime || !item.turninTime) {
              console.error(
                'rentTime or turninTime is missing for item:',
                item,
              );
              return [];
            }
            try {
              const rentDate = new Date(item.rentTime);
              const turninDate = new Date(item.turninTime);

              if (
                !isValid(rentDate) ||
                !isValid(turninDate)
              ) {
                throw new Error('Invalid date');
              }

              // 대여 시작일부터 반납일까지의 모든 날짜 포함
              const dates = [];
              let currentDate = rentDate;
              while (currentDate <= turninDate) {
                dates.push(new Date(currentDate));
                currentDate = addDays(currentDate, 1);
              }

              console.log('Generated dates:', dates);
              return dates;
            } catch (error) {
              console.error(
                'Error processing dates:',
                error,
              );
              return [];
            }
          });

        console.log('filteredDates:', filteredDates);
        setReservedDates(filteredDates);
      } else {
        console.log('No car selected or empty rentCarList');
        setReservedDates([]);
      }
    };

    filterDates();
  }, [rentCarList, selectedCar]);

  useEffect(() => {
    console.log('Reserved dates updated:', reservedDates);
  }, [reservedDates]);

  const isRangeAvailable = useCallback(
    (start, end) => {
      if (!start || !end) return true;

      const startTime = new Date(start).setHours(
        0,
        0,
        0,
        0,
      );
      const endTime = new Date(end).setHours(0, 0, 0, 0);

      return !reservedDates.some((reserved) => {
        const reservedTime = new Date(reserved).setHours(
          0,
          0,
          0,
          0,
        );
        return (
          reservedTime >= startTime &&
          reservedTime <= endTime
        );
      });
    },
    [reservedDates],
  );

  const handleDateChange = useCallback(
    (dates) => {
      const [start, end] = dates;

      if (start && end && !isRangeAvailable(start, end)) {
        alert(
          '선택한 기간 중 이미 예약된 날짜가 포함되어 있습니다. 다시 선택해 주세요.',
        );
        return;
      }

      onChangeStartDate(start);
      onChangeEndDate(end);

      if (start) {
        const newStartTime = new Date(start);
        newStartTime.setHours(
          startTime ? startTime.getHours() : 0,
        );
        newStartTime.setMinutes(
          startTime ? startTime.getMinutes() : 0,
        );
        onChangeStartTime(newStartTime);
      }

      if (end) {
        const newEndTime = new Date(end);
        newEndTime.setHours(
          endTime ? endTime.getHours() : 0,
        );
        newEndTime.setMinutes(
          endTime ? endTime.getMinutes() : 0,
        );
        onChangeEndTime(newEndTime);

        if (start) {
          const daysBetween =
            Math.ceil(
              (end - start) / (1000 * 60 * 60 * 24),
            ) + 1;
          setDaysBetween(daysBetween);
        }
      }
    },
    [
      isRangeAvailable,
      onChangeStartDate,
      onChangeEndDate,
      onChangeStartTime,
      onChangeEndTime,
      setDaysBetween,
      startTime,
      endTime,
    ],
  );

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
    const newEndTime = addHours(time, 4);
    onChangeEndTime(newEndTime);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterTime = (time) => {
    const selectedTime = new Date(time);
    const oneHourAfterRentTime = new Date(
      startTime.getTime() + 4 * 60 * 60 * 1000, // 픽업시간보다 4시간 이후로만 클릭 가능하게
    );

    return (
      selectedTime.getTime() >=
      oneHourAfterRentTime.getTime()
    );
  };

  const minDate = new Date();
  const maxDate = addMonths(new Date(), 12);

  useEffect(() => {
    if (startTime) {
      const newEndTime = addHours(startTime, 4);
      onChangeEndTime(newEndTime);
    }
  }, [startTime, onChangeEndTime]);

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
          onChangeRaw={(event) => event.preventDefault()}
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
        <div
          style={{
            display: 'flex',
            height: '100%',
          }}
        >
          <div>
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
                filterTime={filterPassedTime}
              />
            </div>

            <div className={styles.timeBlock}>
              <div className={styles.returnTitle}>
                반납 :
              </div>
              <DatePicker
                id={styles.returnTime}
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
                filterTime={filterTime}
              />
            </div>
          </div>
          <button
            className={style.publicBtn}
            style={{
              position: 'relative',
              width: '90px',
              left: '12px',
              top: '-14px',
            }}
            onClick={fetchRentCarList}
          >
            차량조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCalendar;
