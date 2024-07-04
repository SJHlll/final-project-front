import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2'; // Modal2 가져오기
import styles from './ReviewPage.module.scss';

const ReviewPage = () => {
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
        rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        content: `후기 내용 ${type === 'rental' ? '렌트카' : '충전소'} ${i}`,
        date: new Date().toLocaleDateString(),
        item: `${type === 'rental' ? '차량' : '충전소'} ${i}`,
      });
    }

    return reviews;
  };

  const [selectedType, setSelectedType] =
    useState('rental');
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState({
    rental: generateDummyReviews('rental', 50),
    charging: generateDummyReviews('charging', 50),
  });
  const reviewsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleMoreClick = (review) => {
    setSelectedReview(review);
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
  ) => {
    const baseImageUrl =
      selectedType === 'rental'
        ? 'https://www.economicpost.co.kr/imgdata/economicpost_co_kr/202304/2023041259109115.jpg'
        : 'https://image.zdnet.co.kr/2021/03/23/207af597d815193c998b06d41b704937.jpg';

    const imageUrl = photo
      ? URL.createObjectURL(photo)
      : baseImageUrl;

    const newReview = {
      id: reviews[selectedType].length + 1,
      imageUrl,
      name: `${selectedType === 'rental' ? '렌트카' : '충전소'} ${
        reviews[selectedType].length + 1
      }`,
      rating,
      content,
      date: new Date().toLocaleDateString(),
      item: selectedItem,
    };

    setReviews((prevReviews) => ({
      ...prevReviews,
      [selectedType]: [
        newReview,
        ...prevReviews[selectedType],
      ],
    }));

    setIsModalOpen(false);
  };

  const currentReviews = reviews[selectedType].slice(
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
            onMoreClick={handleMoreClick}
          />
        ))}
      </div>
      <div className={styles.pagination}>
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
          selectedType={selectedType}
        />
      )}
    </div>
  );
};

export default ReviewPage;
