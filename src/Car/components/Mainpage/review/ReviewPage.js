import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2'; // Modal2 가져오기
import './ReviewPage.scss';

const ReviewPage = () => {
  // 더미 리뷰 데이터를 생성하는 함수
  const generateDummyReviews = (type, count) => {
    const reviews = [];
    const baseImageUrl =
      type === 'rental'
        ? 'https://www.economicpost.co.kr/imgdata/economicpost_co_kr/202304/2023041259109115.jpg'
        : 'https://image.zdnet.co.kr/2021/03/23/207af597d815193c998b06d41b704937.jpg';

    for (let i = 1; i <= count; i++) {
      reviews.push({
        id: i,
        imageUrl: baseImageUrl,
        name: `${type === 'rental' ? '렌트카' : '충전소'} ${i}`,
        rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1, // 1부터 5까지의 랜덤 평점
        content: `후기 내용 ${type === 'rental' ? '렌트카' : '충전소'} ${i}`,
        date: new Date().toLocaleDateString(), // 현재 날짜
        item: `${type === 'rental' ? '차량' : '충전소'} ${i}`, // 차량 또는 충전소 정보
      });
    }

    return reviews;
  };

  // useState 훅을 사용하여 상태를 정의
  const [selectedType, setSelectedType] =
    useState('rental'); // 선택된 리뷰 타입 (렌트카 또는 충전소)
  const [selectedReview, setSelectedReview] =
    useState(null); // 선택된 리뷰
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [reviews, setReviews] = useState({
    rental: generateDummyReviews('rental', 50),
    charging: generateDummyReviews('charging', 50),
  }); // 리뷰 데이터
  const reviewsPerPage = 12; // 페이지당 리뷰 수
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 리뷰 타입 변경 핸들러
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // "더보기" 클릭 핸들러
  const handleMoreClick = (review) => {
    setSelectedReview(review);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false); // 모달 닫기
  };

  // 리뷰 저장 핸들러
  const handleSaveReview = (
    content,
    selectedItem,
    rating,
  ) => {
    const newReview = {
      id: reviews[selectedType].length + 1,
      imageUrl:
        selectedType === 'rental'
          ? 'https://www.economicpost.co.kr/imgdata/economicpost_co_kr/202304/2023041259109115.jpg'
          : 'https://image.zdnet.co.kr/2021/03/23/207af597d815193c998b06d41b704937.jpg',
      name: `${selectedType === 'rental' ? '렌트카' : '충전소'} ${reviews[selectedType].length + 1}`,
      rating,
      content,
      date: new Date().toLocaleDateString(), // 현재 날짜
      item: selectedItem, // 선택된 차량 또는 충전소 정보
    };

    // 새로운 리뷰를 기존 리뷰 목록에 추가
    setReviews((prevReviews) => ({
      ...prevReviews,
      [selectedType]: [
        newReview,
        ...prevReviews[selectedType],
      ], // 이전 후기들을 그 뒤에 추가
    }));

    setIsModalOpen(false); // 모달 닫기
  };

  // 현재 페이지에 표시할 리뷰를 계산
  const currentReviews = reviews[selectedType].slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  return (
    <div className='review-page'>
      <div className='type-switch'>
        <button
          onClick={() => handleTypeChange('rental')}
          className={
            selectedType === 'rental' ? 'active' : ''
          }
        >
          렌트카 리뷰
        </button>
        <button
          onClick={() => handleTypeChange('charging')}
          className={
            selectedType === 'charging' ? 'active' : ''
          }
        >
          충전소 리뷰
        </button>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className='write-review-button'
      >
        후기 작성
      </button>{' '}
      {/* 후기 작성 버튼 */}
      <div className='review-list'>
        {currentReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onMoreClick={handleMoreClick}
          />
        ))}
      </div>
      <div className='pagination'>
        {Array.from(
          {
            length: Math.ceil(
              reviews[selectedType].length / reviewsPerPage,
            ),
          },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1 ? 'active' : ''
              }
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
      {selectedReview && (
        <Modal
          review={selectedReview}
          onClose={handleCloseModal}
        />
      )}
      {isModalOpen && (
        <Modal2
          onClose={handleCloseModal}
          onSave={handleSaveReview}
          selectedType={selectedType} // 현재 선택된 타입을 전달
        />
      )}
    </div>
  );
};

export default ReviewPage;
