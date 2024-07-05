import React from 'react';
import styles from './ReviewPage.module.scss';

const ReviewItem = ({
  review,
  onMoreClick,
  selectedType,
}) => {
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return `${content.slice(0, maxLength)} ...더보기`;
    } else {
      return content;
    }
  };

  return (
    <div
      className={styles.reviewItem}
      onClick={() => onMoreClick(review)}
    >
      <div className={styles.imageContainer}>
        <img src={review.imageUrl} alt='이미지' />
      </div>
      <div className={styles.contentContainer}>
        {selectedType === 'rental' ? (
          <div>{review.carName}</div>
        ) : (
          <div>{review.stationName}</div>
        )}
        <div className={styles.nameRating}>
          <div className={styles.rating}>
            <h3>{review.name}</h3>
            {Array.from(
              Array(Math.floor(review.rating)),
              (_, index) => (
                <span key={index}>&#9733;</span>
              ),
            )}
            {Array.from(
              Array(5 - Math.floor(review.rating)),
              (_, index) => (
                <span key={index}>&#9734;</span>
              ),
            )}
          </div>
        </div>
        <span className={styles.reviewDate}>
          {review.date}
        </span>
        <p>{truncateContent(review.content, 30)}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
