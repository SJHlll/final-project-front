import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import ReviewItem from './ReviewItem';
import Modal from './Modal';
import Modal2 from './Modal2';
import styles from './ReviewPage.module.scss';

const ReviewPage = () => {
  const [selectedType, setSelectedType] =
    useState('rental');
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [reviewList, setReviewList] = useState([]); // 수정: 올바른 useState 사용
  const [rentalReviews, setRentalReviews] = useState([]);
  const [chargingReviews, setChargingReviews] = useState(
    [],
  );
  const [error, setError] = useState(null); // 추가: 에러 상태

  const reviewsPerPage = 10;

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/review/list`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviewList(data);

      const rental = data
        .filter((review) => review.carName !== null)
        .map((review) => ({ ...review }))
        .reverse();
      const charging = data
        .filter((review) => review.stationName !== null)
        .map((review) => ({ ...review }))
        .reverse();
      setRentalReviews(rental);
      setChargingReviews(charging);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(
        '리뷰를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.',
      );
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleMoreClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleWriteReviewClick = () => {
    console.log('click event 발생!');
    setIsModalOpen2(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleAddReview = (review) => {
    if (selectedType === 'rental') {
      setRentalReviews((prevReviews) => [
        review,
        ...prevReviews,
      ]);
    } else {
      setChargingReviews((prevReviews) => [
        review,
        ...prevReviews,
      ]);
    }
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

  const totalPages = Math.ceil(
    (selectedType === 'rental'
      ? rentalReviews.length
      : chargingReviews.length) / reviewsPerPage,
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
        onClick={handleWriteReviewClick}
        className={styles.writeReviewButton}
      >
        후기 작성
      </button>
      {error && <div className={styles.error}>{error}</div>}
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
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={
              currentPage === index + 1 ? styles.active : ''
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          review={selectedReview}
          selectedType={selectedType}
          onClose={handleCloseModal}
        />
      )}
      {isModalOpen2 && (
        <Modal2
          onClose={handleCloseModal2}
          selectedType={selectedType}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};

export default ReviewPage;
