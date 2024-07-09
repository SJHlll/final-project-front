import { Textarea } from '@mui/joy';
import axios from 'axios';
import { addMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './RentCarReservationUpdate.module.scss';

const RentCarReservationUpdate = ({ carNo, onClose }) => {
  const [newRentDate, setNewRentDate] = useState(null);
  const [newRentTime, setNewRentTime] = useState(
    new Date(),
  );
  const [newTurninDate, setNewTurninDate] = useState(null);
  const [newTurninTime, setNewTurninTime] = useState(
    new Date(),
  );
  const [extra, setExtra] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태를 관리하는 useState

  const handleStartTimeChange = (time) => {
    if (newRentDate) {
      const newRentTime = new Date(newRentDate);
      newRentTime.setHours(time.getHours());
      newRentTime.setMinutes(time.getMinutes());
      setNewRentTime(newRentTime);
    }
    console.log('rentDate: ', newRentDate);
    console.log('rentTime: ', newRentTime);
  };

  const handleEndTimeChange = (time) => {
    if (newTurninDate) {
      const newTurninTime = new Date(newTurninDate);
      newTurninTime.setHours(time.getHours());
      newTurninTime.setMinutes(time.getMinutes());
      setNewTurninTime(newTurninTime);
    }
    console.log('turninDate: ', newTurninDate);
    console.log('turninTime: ', newTurninTime);
  };

  useEffect(() => {
    console.log(
      '픽업 날짜: ',
      newRentDate,
      '픽업시간: ',
      newRentTime,
    );
  }, [newRentDate, newRentTime]);

  useEffect(() => {
    console.log(
      '반납날짜: ',
      newTurninDate,
      '반납시간: ',
      newTurninTime,
    );
  }, [newTurninDate, newTurninTime]);

  console.log('carNo: ', carNo);

  const minDate = new Date(); // 최소 날짜는 오늘 날짜로 설정합니다.
  const maxDate = addMonths(new Date(), 12); // 최대 날짜를 12개월 후로 설정합니다.

  const rentcarUpdateHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const requestData = {
      updateRentDate: newRentDate,
      rentTime: newRentTime,
      updateTurninDate: newTurninDate,
      turninTume: newTurninTime,
      extra,
    };

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
                onChange={(time) =>
                  handleStartTimeChange(time)
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
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
                onChange={(time) =>
                  handleEndTimeChange(time)
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
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
