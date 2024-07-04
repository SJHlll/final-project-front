import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2'; // Modal2 가져오기
import './ReviewPage.scss';

const ReviewPage = ({ ReviewList }) => {
  const [selectedType, setSelectedType] =
    useState('rental');
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState({
    rental: ReviewList
      ? ReviewList.filter(
          (review) => review.type === 'rental',
        )
      : [],
    charging: ReviewList
      ? ReviewList.filter(
          (review) => review.type === 'charging',
        )
      : [],
  });
  const reviewsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchChargeReviews = async () => {
      try {
        // const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/review/list',
          {
            method: 'GET',
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviewList(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedType !== 'rental') {
      fetchChargeReviews();
    }
  }, [selectedType]);

  useEffect(() => {
    const fetchChargeReviews = async () => {
      try {
        // const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/review/list',
          {
            method: 'GET',
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviewList(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedType === 'rental') {
      fetchChargeReviews();
    }
  }, [selectedType]);

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

  // const currentReviews = reviews[selectedType].slice(
  //   (currentPage - 1) * reviewsPerPage,
  //   currentPage * reviewsPerPage,
  // );

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
      </button>
      <div className='review-list'>
        {reviewList.map((review) => (
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
          selectedType={selectedType}
        />
      )}
    </div>
  );
};

export default ReviewPage;
