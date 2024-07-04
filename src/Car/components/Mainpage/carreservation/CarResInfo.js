import React from 'react';
import styles from './reservation_css/CarResInfo.module.scss';

const CarResInfo = ({ pickup, returning }) => {
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
        <div className={styles.resName}>이름: ooo</div>
        <div className={styles.phonNumber}>
          전화번호: 010-0000-0000
        </div>
        <div>자동차 정보</div>
        <div>볼보 뭐시깽이</div>
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
        비고:
        <input type='text' />
      </div>
    </>
  );
};

export default CarResInfo;
