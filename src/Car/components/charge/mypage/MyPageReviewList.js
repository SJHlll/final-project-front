import React from 'react';
import styles from './MyPageReviewList.module.scss';
import MyPageReviewMap from './MyPageReviewMap';
import { useNavigate } from 'react-router-dom';

const MyPageReviewList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.resSelectedNo}>글번호</div>
        <div className={styles.resSelectedAd}>
          충전소/렌트카
        </div>
        <div className={styles.resSelectedName3}>
          리뷰내용
        </div>
        <div className={styles.resSelectedTime}>
          작성날짜/수정날짜
        </div>
      </div>
      <MyPageReviewMap />
      <p
        className={styles.navigateMypage}
        onClick={() => navigate('/mypage')}
      >
        마이페이지로
      </p>
    </>
  );
};

export default MyPageReviewList;
