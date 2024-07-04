import React from 'react';

// Modal 컴포넌트: 리뷰의 세부 사항을 표시하는 모달 창
const Modal = ({ review, onClose }) => {
  // 모달 외부를 클릭하면 모달을 닫는 함수
  const handleOutsideClick = (e) => {
    // 클릭한 요소가 모달 클래스를 포함하고 있는 경우
    if (e.target.classList.contains('modal')) {
      onClose(); // 모달을 닫는 함수 호출
    }
  };

  // 리뷰 평점만큼 꽉 찬 별을 생성하는 배열
  const fullStars = Array.from(
    Array(Math.floor(review.rating)), // 평점의 정수 부분만큼 배열 생성 (e.g., 평점이 4.5면 4개의 꽉 찬 별)
    (_, index) => <span key={index}>&#9733;</span>, // 꽉 찬 별(★)을 배열 요소로 추가
  );

  // 5에서 리뷰 평점을 뺀 만큼 빈 별을 생성하는 배열
  const emptyStars = Array.from(
    Array(5 - Math.floor(review.rating)), // 5에서 평점의 정수 부분을 뺀 값만큼 배열 생성 (e.g., 평점이 4.5면 1개의 빈 별)
    (_, index) => <span key={index}>&#9734;</span>, // 빈 별(☆)을 배열 요소로 추가
  );

  const formatTime = (updateDate, time) => {
    const date = new Date(updateDate);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: 'numeric',
      // hour12: true,
    });
  };

  // 모달 컴포넌트의 렌더링 부분
  return (
    <div className='modal' onClick={handleOutsideClick}>
      {/* 모달 외부 클릭 시 handleOutsideClick 함수 호출 */}
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          {/* 모달 닫기 버튼 클릭 시 onClose 함수 호출 */}
          &times; {/* '×' 문자, 모달 닫기 아이콘 */}
        </span>
        <div className='modal-image-container'>
          <img src={review.imageUrl} alt='이미지' />{' '}
          {/* 리뷰에 대한 이미지 */}
          <span className='review-date'>
            {/* {review.updateDate} */}
            {formatTime(review.updateDate)}
            {/* {'2024.07.04'} */}
          </span>
          {/* 리뷰 작성 날짜 */}
        </div>
        <div style={{ display: 'flex' }}>
          <h3>{review.name}</h3> {/* 리뷰 작성자 이름 */}
          <div className='rating'>
            {fullStars} {/* 꽉 찬 별들 */}
            {emptyStars} {/* 빈 별들 */}
          </div>
        </div>
        <h2>충전소: {review.stationName}</h2>{' '}
        {/* 리뷰의 이름 */}
        <p>{review.content}</p> {/* 리뷰 내용 */}
      </div>
    </div>
  );
};

export default Modal;
