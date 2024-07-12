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
import { API_BASE_URL } from '../../../../config/host-config';

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
  const [isModalOpen, setIsModalOpen] = useState(true);

  // const [reservedDates, setReservedDates] = useState([]);

  const handleStartTimeChange = (time) => {
    setNewRentTime(time);
  };

  const handleEndTimeChange = (time) => {
    setNewTurninTime(time);
  };

  // const fetchReservedDates = useCallback(async () => {
  //   const token = localStorage.getItem('ACCESS_TOKEN');

  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/rentcar/${carNo}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     if (response.status === 200) {
  //       const reservedDates = response.data.map(
  //         (dateString) => new Date(dateString),
  //       );
  //       setReservedDates(reservedDates);
  //     } else {
  //       console.error(
  //         'Error fetching reserved dates: ',
  //         response.statusText,
  //       );
  //     }
  //   } catch (err) {
  //     console.error('Error fetching reserved dates: ', err);
  //   }
  // }, [carNo]);

  // useEffect(() => {
  //   fetchReservedDates();
  // }, [fetchReservedDates]);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterTime = (time) => {
    const selectedTime = new Date(time);
    const oneHourAfterRentTime = new Date(
      newRentTime.getTime() + 4 * 60 * 60 * 1000,
    );

    return (
      selectedTime.getTime() >=
      oneHourAfterRentTime.getTime()
    );
  };

  // const formatRentTime = (rentTime) => {
  //   const date = new Date(rentTime);
  //   return date.toLocaleString('ko-KR', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   });
  // };

  const minDate = new Date();
  const maxDate = addMonths(new Date(), 12);

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
        onClose();
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
    setIsModalOpen(false);
    onClose();
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
              <DatePicker selectedDate={newRentTime} />
              <DatePicker
                selected={newRentTime}
                onChange={handleStartTimeChange}
                dateFormat='yyyy년 MM월 dd일 aa hh:mm'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
                showTimeSelect
                showTimeSelectOnly
                filterTime={filterPassedTime}
                defaultValue={rentDate}
                timeIntervals={15}
                timeCaption='Time'
              />
            </div>
            <div className={styles.field}>
              <label>렌트 반납일</label>
              <DatePicker
                selected={newTurninTime}
                onChange={handleEndTimeChange}
                dateFormat='yyyy년 MM월 dd일 aa hh:mm'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
                showTimeSelect
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
