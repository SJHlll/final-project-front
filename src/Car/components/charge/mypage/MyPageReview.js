import React, { useState } from 'react';
import styles from '../scss/MyPageCharge.module.scss';

const MyPageReview = () => {
  // 더미 데이터 5개 생성
  const initialReviews = [
    {
      date: '2024-07-01 10:00',
      station: 'AAA 충전소',
      title: '첫번째 리뷰 제목',
    },
    {
      date: '2024-07-02 11:00',
      station: 'BBB 충전소',
      title: '두번째 리뷰 제목',
    },
    {
      date: '2024-07-03 12:00',
      station: 'CCC 충전소',
      title: '세번째 리뷰 제목',
    },
    {
      date: '2024-07-04 13:00',
      station: 'DDD 충전소',
      title: '네번째 리뷰 제목',
    },
    {
      date: '2024-07-05 14:00',
      station: 'EEE 충전소',
      title: '다섯번째 리뷰 제목',
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (index) => {
    if (
      window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')
    ) {
      const newReviews = reviews.filter(
        (_, i) => i !== index,
      );
      setReviews(newReviews);
    }
  };

  return (
    <div className={styles.userReviewList}>
      <h3 style={{ textAlign: 'center' }}>
        내가 쓴 리뷰:{' '}
      </h3>
      <div
        className={styles.reviewList}
        style={{
          // background: 'red',
          borderTop: '1px solid black',
        }}
      >
        {reviews.map((review, index) => (
          <div
            style={{
              border: '1px solid black',
            }}
            key={index}
            className={styles.reviewItem}
          >
            <div className={styles.flex}>
              <div className='value'>날짜 및 시간: </div>
              <div>{review.date}</div>
            </div>
            <div className={styles.flex}>
              <div className='value'>충전소/전기차: </div>
              <div>{review.station}</div>
            </div>
            <div className={styles.flex}>
              <div className='value'>제목: </div>
              <div>{review.title}</div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(index)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageReview;
