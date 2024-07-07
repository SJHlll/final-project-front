import React from 'react';
import styles from './ReviewPage.module.scss';
// Modal 컴포넌트: 리뷰의 세부 사항을 표시하는 모달 창
const Modal = ({ review, onClose, selectedType }) => {
  // 모달 외부를 클릭하면 모달을 닫는 함수
  const handleOutsideClick = (e) => {
    // 클릭한 요소가 모달 클래스를 포함하고 있으면
    if (e.target.classList.contains('modal')) {
      onClose(); // 모달을 닫는 함수 호출
    }
  };

  // 리뷰 평점만큼 꽉 찬 별을 생성하는 배열
  const fullStars = Array.from(
    Array(Math.floor(review.rating)), // 평점의 정수 부분만큼 배열 생성
    (_, index) => <span key={index}>&#9733;</span>, // 꽉 찬 별(★)을 배열 요소로 추가
  );

  // 5에서 리뷰 평점을 뺀 만큼 빈 별을 생성하는 배열
  const emptyStars = Array.from(
    Array(5 - Math.floor(review.rating)), // 5에서 평점의 정수 부분을 뺀 값만큼 배열 생성
    (_, index) => <span key={index}>&#9734;</span>, // 빈 별(☆)을 배열 요소로 추가
  );

  const formatTime = (updateDate, time) => {
    const date = new Date(updateDate);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
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

  // 모달 컴포넌트의 렌더링 부분
  return (
    <div
      className={styles.modal}
      onClick={handleOutsideClick}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.modalImageContainer}>
          <img
            src={review.photo || defaultImage}
            alt='이미지'
          />{' '}
        </div>
        <div style={{ width: '100%', textAlign: 'end' }}>
          <span className={styles.reviewDate}>
            {formatTime(review.updateDate)}
          </span>
        </div>
        <h3>{anonymizeName(review.name)}</h3>
        <div className={styles.rating}>
          {fullStars}
          {emptyStars}
        </div>
        <h2>
          {`${selectedType === 'rental' ? '차량 : ' : '충전소 : '}`}
          {`${selectedType === 'rental' ? `${review.carName}` : `${review.stationName}`}`}
        </h2>{' '}
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default Modal;
