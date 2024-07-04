import React from 'react';
import styles from './Review.module.scss';
import ReviewPage from './ReviewPage';
import Frame from '../Frame';
const Review = () => {
  return (
    <Frame>
      <div className={styles.reviewbody}>
        <ReviewPage />
      </div>
    </Frame>
  );
};

export default Review;
