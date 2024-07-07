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

  // 기본 이미지 URL
  const defaultImage =
    selectedType === 'rental'
      ? 'https://plugngo.s3.ap-northeast-2.amazonaws.com/2023041259109115.jpg'
      : 'https://plugngo.s3.ap-northeast-2.amazonaws.com/207af597d815193c998b06d41b704937.jpg';

  // 리뷰 작성자 이름 가리기
  const anonymizeName = (name) => {
    if (!name) return ''; // 이름이 없을 경우 빈 문자열을 반환

    const firstChar = name.charAt(0); // 첫 번째 글자 추출
    const remainingChars = name.slice(1); // 첫 글자를 제외한 나머지 부분 추출

    // 나머지 부분을 '*'로 치환
    const anonymized =
      firstChar + remainingChars.replace(/./g, '*');
    return anonymized;
  };

  return (
    <div
      className={styles.reviewItem}
      onClick={() => onMoreClick(review)}
    >
      <div className={styles.imageContainer}>
        <img
          src={review.photo || defaultImage}
          alt='이미지'
        />
      </div>
      <div className={styles.contentContainer}>
        {selectedType === 'rental' ? (
          <div>{review.carName}</div>
        ) : (
          <div>{review.stationName}</div>
        )}
        <div className={styles.nameRating}>
          <div className={styles.rating}>
            <h3>{anonymizeName(review.name)}</h3>
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
