import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2'; // Modal2 가져오기
import './ReviewPage.scss';

// ReviewPage 컴포넌트 정의
const ReviewPage = ({ ReviewList }) => {
  // 현재 선택된 리뷰 유형 (렌트카 or 충전소)
  const [selectedType, setSelectedType] =
    useState('rental');
  // 선택된 리뷰 (모달에서 상세보기용)
  const [selectedReview, setSelectedReview] =
    useState(null);
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 리뷰 수
  const reviewsPerPage = 12;
  // 모달 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 전체 리뷰 목록
  const [reviewList, setReviewList] = useState([]);
  // 렌트카 리뷰 목록
  const [rentalReviews, setRentalReviews] = useState([]);
  // 충전소 리뷰 목록
  const [chargingReviews, setChargingReviews] = useState(
    [],
  );

  // 컴포넌트 마운트 시 리뷰 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/review/list', // 리뷰 리스트를 가져오는 API 엔드포인트
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviewList(data);

        // 데이터 필터링
        const rental = data.filter(
          (review) => review.carName !== null, // carName이 있는 경우 렌트카 리뷰로 분류
        );
        const charging = data.filter(
          (review) => review.stationName !== null, // stationName이 있는 경우 충전소 리뷰로 분류
        );
        setRentalReviews(rental);
        setChargingReviews(charging);
      } catch (err) {
        console.log('Error fetching reviews : ', err);
      }
    };

    fetchReviews(); // 리뷰 데이터 가져오기 호출
  }, []); // 빈 의존성 배열로 컴포넌트가 처음 마운트 될 때만 실행

  // 리뷰 유형 변경 핸들러
  const handleTypeChange = (type) => {
    setSelectedType(type); // 선택된 유형을 변경
    setCurrentPage(1); // 페이지를 첫 페이지로 초기화
  };

  // 리뷰 더보기 버튼 클릭 핸들러
  const handleMoreClick = (review) => {
    setSelectedReview(review); // 선택된 리뷰 상태 설정
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedReview(null); // 선택된 리뷰 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // 리뷰 저장 핸들러
  const handleSaveReview = (
    content,
    selectedItem,
    rating,
    photo,
    stationId,
    stationName,
  ) => {
    // 기본 이미지 URL
    const baseImageUrl =
      selectedType === 'rental'
        ? 'https://www.economicpost.co.kr/imgdata/economicpost_co_kr/202304/2023041259109115.jpg'
        : 'https://image.zdnet.co.kr/2021/03/23/207af597d815193c998b06d41b704937.jpg';

    // 업로드된 이미지가 있는 경우, 그 이미지를 사용
    const imageUrl = photo
      ? URL.createObjectURL(photo)
      : baseImageUrl;

    // 새 리뷰 객체 생성
    const newReview = {
      id:
        (selectedType === 'rental'
          ? rentalReviews.length
          : chargingReviews.length) + 1,
      imageUrl,
      name: `${selectedType === 'rental' ? '렌트카' : '충전소'} ${
        (selectedType === 'rental'
          ? rentalReviews.length
          : chargingReviews.length) + 1
      }`,
      rating,
      content,
      date: new Date().toLocaleDateString(),
      item: selectedItem,
      stationId,
    };

    // 선택된 유형에 따라 리뷰 목록 업데이트
    if (selectedType === 'rental') {
      setRentalReviews([newReview, ...rentalReviews]);
    } else if (selectedType === 'charging') {
      setChargingReviews([newReview, ...chargingReviews]);
    }

    setIsModalOpen(false); // 모달 닫기
  };

  // 현재 페이지의 리뷰 목록 계산
  const currentReviews =
    selectedType === 'rental'
      ? rentalReviews.slice(
          (currentPage - 1) * reviewsPerPage,
          currentPage * reviewsPerPage,
        )
      : chargingReviews.slice(
          (currentPage - 1) * reviewsPerPage,
          currentPage * reviewsPerPage,
        );

  return (
    <div className='review-page'>
      <div className='type-switch'>
        {/* 렌트카 리뷰 버튼 */}
        <button
          onClick={() => handleTypeChange('rental')}
          className={
            selectedType === 'rental' ? 'active' : ''
          }
        >
          렌트카 리뷰
        </button>
        {/* 충전소 리뷰 버튼 */}
        <button
          onClick={() => handleTypeChange('charging')}
          className={
            selectedType === 'charging' ? 'active' : ''
          }
        >
          충전소 리뷰
        </button>
      </div>
      {/* 후기 작성 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className='write-review-button'
      >
        후기 작성
      </button>
      <div className='review-list'>
        {/* 현재 페이지의 리뷰 아이템 렌더링 */}
        {currentReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onMoreClick={handleMoreClick}
          />
        ))}
      </div>
      <div className='pagination'>
        {/* 페이지 네비게이션 버튼 렌더링 */}
        {Array.from(
          {
            length: Math.ceil(
              (selectedType === 'rental'
                ? rentalReviews.length
                : chargingReviews.length) / reviewsPerPage,
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
      {/* 선택된 리뷰가 있을 경우, 모달 렌더링 */}
      {selectedReview && (
        <Modal
          review={selectedReview}
          onClose={handleCloseModal}
        />
      )}
      {/* 모달 열림 상태일 경우, 후기 작성 모달 렌더링 */}
      {isModalOpen && (
        <Modal2
          onClose={handleCloseModal}
          onSave={handleSaveReview}
          selectedType={selectedType}
        />
      )}
    </div>
  );
};

export default ReviewPage;
