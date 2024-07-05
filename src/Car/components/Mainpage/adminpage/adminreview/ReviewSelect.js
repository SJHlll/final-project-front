import React from 'react';
import styles from '../AdminPage.module.scss';

const ReviewSelect = ({ onClick }) => {
  return (
    <div
      className={`${styles.adminSelect} ${styles.review}`}
      onClick={onClick}
    >
      작성된 리뷰
    </div>
  );
};

export default ReviewSelect;
