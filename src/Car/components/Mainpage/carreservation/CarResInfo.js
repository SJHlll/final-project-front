import styles from './reservation_css/CarResInfo.module.scss';
import React, { useContext } from 'react';
import { CarContext } from '../../../../contexts/CarContext';
import AuthContext from '../../../../util/AuthContext';

const CarResInfo = ({ pickup, returning }) => {
  const { selectedCar } = useContext(CarContext); // db에서 자동차 정보 가져온 것.

  const { isLoggedIn } = useContext(AuthContext);

  const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 토큰

  const formatDate = (date) => {
    if (!date) return '선택되지 않음';
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);

    // 마지막 마침표 제거
    return formattedDate.replace(/\.$/, '');
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
      <div className={styles.resInfo}>
        <div className={styles.resName}>이름: {}</div>
        <div className={styles.phonNumber}>
          전화번호: {}
        </div>
        <div>예약하실 자동차: {selectedCar.carName}</div>
        <div className={styles.date}>
          픽업 날짜: {formatDate(pickup.date)}
        </div>
        <div className={styles.date}>
          반납 날짜: {formatDate(returning.date)}
        </div>
        <div className={styles.time}>
          픽업 시간: {formatTime(pickup.time)}
        </div>
        <div className={styles.time}>
          반납 시간: {formatTime(returning.time)}
        </div>
        <div>결제 금액: {}</div>
        비고:
        <input type='text' />
      </div>
    </>
  );
};

export default CarResInfo;
