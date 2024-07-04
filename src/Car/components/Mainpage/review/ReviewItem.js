import React from 'react';

// ReviewItem 컴포넌트: 리뷰 항목을 렌더링하는 컴포넌트
const ReviewItem = ({
  review,
  onMoreClick,
  seletedType,
}) => {
  // 긴 리뷰 내용을 특정 길이로 자르는 함수
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return `${content.slice(0, maxLength)} ...더보기`; // 내용이 길면 자르고 "...더보기" 추가
    } else {
      return content; // 내용이 짧으면 그대로 반환
    }
  };

  return (
    // 리뷰 항목 컨테이너, 클릭 시 onMoreClick 함수 호출
    <div
      className='review-item'
      onClick={() => onMoreClick(review)}
    >
      {/* 이미지 컨테이너 */}
      <div className='image-container'>
        <img src={review.imageUrl} alt='이미지' />
      </div>
      {/* 내용 컨테이너 */}
      <div className='content-container'>
        {/* 이름 및 평점 */}
        {seletedType === 'rental' ? (
          <div>{review.carName}</div>
        ) : (
          <div>{review.stationName}</div>
        )}
        <div className='name-rating'>
          {/* 평점 표시 */}
          <div className='rating'>
            {/* 가득 찬 별 */}
            {Array.from(
              Array(Math.floor(review.rating)),
              (_, index) => (
                <span key={index}>&#9733;</span> // 가득 찬 별 (★)
              ),
            )}
            {/* 빈 별 */}
            {Array.from(
              Array(5 - Math.floor(review.rating)),
              (_, index) => (
                <span key={index}>&#9734;</span> // 빈 별 (☆)
              ),
            )}
          </div>
        </div>
        {/* 리뷰 날짜 */}
        <span className='review-date'>{review.date}</span>
        {/* 리뷰 내용 (길이 제한 적용) */}
        <p>{truncateContent(review.content, 30)}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
