import { Textarea } from '@mui/joy';
import axios from 'axios';
import { addMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './RentCarReservationUpdate.module.scss';

const RentCarReservationUpdate = ({ carNo, onClose }) => {
  const [newRentDate, setNewRentDate] = useState(null);
  const [newRentTime, setNewRentTime] = useState(null);
  const [newTurninDate, setNewTurninDate] = useState(null);
  const [newTurninTime, setNewTurninTime] = useState(null);
  const [extra, setExtra] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태를 관리하는 useState

  const handleStartTimeChange = (time) => {
    console.log('typeof time: ', typeof time);
    console.log(time);
    setNewRentTime(time);
  };

  const handleEndTimeChange = (time) => {
    setNewTurninTime(time);
  };

  useEffect(() => {
    console.log('픽업 날짜: ', newRentDate);
  }, [newRentDate]);

  useEffect(() => {
    console.log('반납날짜: ', newTurninDate);
  }, [newTurninDate]);

  console.log('carNo: ', carNo);

  const formatDateTimeToKST = (dateTime) => {
    if (!dateTime) return null;

    const options = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return new Intl.DateTimeFormat('ko-KR', options)
      .format(dateTime)
      .replace(/\./g, '-');
  };

  const minDate = new Date(); // 최소 날짜는 오늘 날짜로 설정합니다.
  const maxDate = addMonths(new Date(), 12); // 최대 날짜를 12개월 후로 설정합니다.

  const rentcarUpdateHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const requestData = {
      updateRentDate: newRentDate,
      rentTime: newRentTime,
      updateTurninDate: newTurninDate,
      turninTime: newTurninTime,
      extra,
    };
    console.log('requestData: ', requestData);

    try {
      const res = await axios.patch(
        `http://localhost:8181/rentcar/${carNo}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        alert('예약이 변경되었습니다.');
        // onClose(); // 변경 완료 후 부모 컴포넌트에서 제공하는 onClose 함수 호출
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
              <label>렌트 픽업일 :</label>
              <DatePicker
                selected={newRentDate}
                onChange={(date) => setNewRentDate(date)}
                dateFormat='yyyy년 MM월 dd일'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
              />
              <DatePicker
                selected={newRentTime}
                onChange={handleStartTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='aa h:mm'
                className={styles.datePicker}
              />
            </div>
            <div className={styles.field}>
              <label>렌트 반납일 :</label>
              <DatePicker
                selected={newTurninDate}
                onChange={(date) => setNewTurninDate(date)}
                dateFormat='yyyy년 MM월 dd일'
                minDate={minDate}
                maxDate={maxDate}
                className={styles.datePicker}
              />
              <DatePicker
                selected={newTurninTime}
                onChange={handleEndTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='aa h:mm'
                className={styles.datePicker}
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
              className={styles.submitButton}
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
