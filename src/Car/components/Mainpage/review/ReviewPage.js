import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2'; // Modal2 가져오기
import styles from './ReviewPage.module.scss';

// ReviewPage 컴포넌트 정의
const ReviewPage = ({ ReviewList }) => {
  const [selectedType, setSelectedType] =
    useState('rental');
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [rentalReviews, setRentalReviews] = useState([]);
  const [chargingReviews, setChargingReviews] = useState(
    [],
  );

  const reviewsPerPage = 12;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/review/list',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviewList(data);

        const rental = data
          .filter(
            (review) => review.carName !== null, // carName이 있는 경우 렌트카 리뷰로 분류
          )
          .reverse();
        const charging = data
          .filter(
            (review) => review.stationName !== null, // stationName이 있는 경우 충전소 리뷰로 분류
          )
          .reverse();
        setRentalReviews(rental);
        setChargingReviews(charging);
      } catch (err) {
        console.log('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleMoreClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const handleSaveReview = (
    content,
    selectedItem,
    rating,
    photo,
    stationId,
    stationName,
  ) => {
    const baseImageUrl =
      selectedType === 'rental'
        ? 'https://www.economicpost.co.kr/imgdata/economicpost_co_kr/202304/2023041259109115.jpg'
        : 'https://image.zdnet.co.kr/2021/03/23/207af597d815193c998b06d41b704937.jpg';

    const imageUrl = photo
      ? URL.createObjectURL(photo)
      : baseImageUrl;

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
      stationName,
    };

    if (selectedType === 'rental') {
      setRentalReviews([newReview, ...rentalReviews]);
    } else if (selectedType === 'charging') {
      setChargingReviews([newReview, ...chargingReviews]);
    }

    setIsModalOpen(false);
  };

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
    <div className={styles.reviewPage}>
      <div className={styles.typeSwitch}>
        <button
          onClick={() => handleTypeChange('rental')}
          className={
            selectedType === 'rental' ? styles.active : ''
          }
        >
          렌트카 리뷰
        </button>
        <button
          onClick={() => handleTypeChange('charging')}
          className={
            selectedType === 'charging' ? styles.active : ''
          }
        >
          충전소 리뷰
        </button>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.writeReviewButton}
      >
        후기 작성
      </button>
      <div className={styles.reviewList}>
        {currentReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            selectedType={selectedType}
            onMoreClick={handleMoreClick}
          />
        ))}
      </div>
      <div className={styles.pagination}>
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
                currentPage === index + 1
                  ? styles.active
                  : ''
              }
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
      {isModalOpen && selectedReview && (
        <Modal
          review={selectedReview}
          onClose={handleCloseModal}
        />
      )}
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
