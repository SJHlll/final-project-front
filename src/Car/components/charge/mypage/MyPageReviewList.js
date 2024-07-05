import React from 'react';
import styles from './MyPageReviewList.module.scss';
import MyPageReviewMap from './MyPageReviewMap';

const MyPageReviewList = () => {
  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.resSelectedAd}>
          충전소/렌트카
        </div>
        <div className={styles.resSelectedName}>
          리뷰내용
        </div>
        <div className={styles.resSelectedTime}>
          작성날짜
        </div>
      </div>
      <MyPageReviewMap />
    </>
  );
};

export default MyPageReviewList;
