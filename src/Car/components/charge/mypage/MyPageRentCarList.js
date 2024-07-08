import React from 'react';
import styles from './MyPageReviewList.module.scss';
import { useNavigate } from 'react-router-dom';
import MyPageRentCarMap from './MyPageRentCarMap';

const MyPageRentCarList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.resSelectedNo}>예약번호</div>
        <div className={styles.resSelectedAd2}>차종</div>
        <div className={styles.resSelectedName2}>가격</div>
        <div className={styles.resSelectedTime}>
          렌트 시작일
        </div>
        <div className={styles.resSelectedTime}>
          렌트 반납일
        </div>
        <div className={styles.resNote}>비고</div>
      </div>
      <MyPageRentCarMap />
      <p
        className={styles.navigateMypage}
        onClick={() => navigate('/mypage')}
      >
        마이페이지로
      </p>
    </>
  );
};

export default MyPageRentCarList;
