import { Textarea } from '@mui/joy';
import axios from 'axios';
import { addMonths } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './RentCarReservationUpdate.module.scss';
import style from '../../../../scss/Button.module.scss';
import moment from 'moment';
import zIndex from '@mui/material/styles/zIndex';
import { Height } from '@mui/icons-material';

const RentCarReservationUpdate = ({
  carNo,
  carId,
  onClose,
  rentDate,
  turninDate,
}) => {
  const [newRentTime, setNewRentTime] = useState(rentDate);
  const [newTurninTime, setNewTurninTime] =
    useState(turninDate);
  const [extra, setExtra] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태를 관리하는 useState

  const [reservedDates, setReservedDates] = useState([]);

  const handleStartTimeChange = (time) => {
    setNewRentTime(time);
  };

  const handleEndTimeChange = (time) => {
    setNewTurninTime(time);
  };

  // const API_RENT_URL = API_BASE_URL + '/rentcar';

  const fetchReservedDates = useCallback(async () => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    try {
      const response = await axios.get(
        `http://localhost:8181/rentcar/${carNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        // const rentCarList = response.data.rentList;
        // const reservedDates = rentCarList.flatMap(
        //   (item) => {
        //     const dates = [];
        //     const rentDate = new Date(item.rentTime);
        //     const turninDate = new Date(item.turninTime);
        //     let currentDate = rentDate;
        //     while (currentDate <= turninDate) {
        //       dates.push(new Date(currentDate));
        //       currentDate = addDays(currentDate, 1);
        //     }
        //     return dates;
        //   },
        // );
        const reservedDates = response.data.map(
          (dateString) => new Date(dateString),
        );
        setReservedDates(reservedDates);
      } else {
        console.error(
          'Error fetching reserved dates: ',
          response.statusText,
        );
      }
    } catch (err) {
      console.error('Error fetching reserved dates: ', err);
    }
  }, [carId]);

  useEffect(() => {
    fetchReservedDates();
  }, [fetchReservedDates]);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterTime = (time) => {
    const selectedTime = new Date(time);
    const oneHourAfterRentTime = new Date(
      newRentTime.getTime() + 4 * 60 * 60 * 1000, // 픽업시간보다 4시간 이후로만 클릭 가능하게
    );

    return (
      selectedTime.getTime() >=
      oneHourAfterRentTime.getTime()
    );
  };

  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const minDate = new Date(); // 최소 날짜는 오늘 날짜로 설정합니다.
  const maxDate = addMonths(new Date(), 12); // 최대 날짜를 12개월 후로 설정합니다.

  const rentcarUpdateHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const requestData = {
      rentTime: moment(newRentTime).toString(),
      turninTime: moment(newTurninTime).toString(),
      extra,
    };
    console.log('requestData: ', requestData);

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/rentcar/${carNo}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        alert('예약이 변경되었습니다.');
        onClose(); // 변경 완료 후 부모 컴포넌트에서 제공하는 onClose 함수 호출
      } else {
        console.log('Error: ', res.data);
        alert('예약 변경에 실패하였습니다.');
      }
    } catch (err) {
      console.error('Error: ', err.response);
      alert('예약 변경에 실패하였습니다.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    onClose(); // 부모 컴포넌트에서 제공하는 onClose 함수 호출
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>예약 변경</h1>
            <button
              onClick={handleCloseModal}
              className={styles.closeButton}
              style={{ fontSize: '2rem' }}
            >
              &times;
            </button>
          </div>
          <form
            onSubmit={rentcarUpdateHandler}
            className={styles.form}
          >
            <div className={styles.field}>
              <label>렌트 픽업일</label>
              <div>{formatRentTime(rentDate)}</div>
              <DatePicker
                selected={newRentTime}
                onChange={handleStartTimeChange}
                dateFormat='aa hh:mm'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
                showTimeSelectOnly
                filterTime={filterPassedTime}
                defaultValue={rentDate}
                timeIntervals={15}
                timeCaption='Time'
              />
            </div>
            <div className={styles.field}>
              <label>렌트 반납일</label>
              <div>{formatRentTime(turninDate)}</div>
              <DatePicker
                selected={newTurninTime}
                onChange={handleEndTimeChange}
                dateFormat='aa hh:mm'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
                showTimeSelectOnly
                filterTime={filterTime}
                defaultValue={turninDate}
              />
            </div>
            <div className={styles.field}>
              <label>비고</label>
              <Textarea
                minRows={3}
                color='primary'
                variant='outlined'
                size='large'
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                className={styles.textarea}
              />
            </div>
            <button
              type='submit'
              className={`${styles.submitButton}
                ${style.publicBtn}
              `}
            >
              예약 변경
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RentCarReservationUpdate;
