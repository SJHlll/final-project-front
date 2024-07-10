import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRvContext } from '../../Mainpage/adminpage/adminreview/TestRvContext';
import styles from './MyPageReviewList.module.scss';
import AuthContext from '../../../../util/AuthContext';
import MyPageModal from './MyPageModal';
import Modal2 from '../../Mainpage/review/Modal2';

const MyPageReviewMap = () => {
  const { review, setReview } = useContext(TestRvContext);
  const { email } = useContext(AuthContext);
  const [filteredReview, setFilteredReview] = useState([]);
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] =
    useState(false);

  // DB에서 작성된 리뷰 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://plugngo.site/mypage/review',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();

        const filteredData = data.filter(
          (review) => review.email === email,
        );
        setReview(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [email, setReview]);

  const handleDeleteReview = async (reviewNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://plugngo.site/mypage/review?reviewNo=${reviewNo}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // 리뷰 삭제가 성공하면 UI에서 해당 리뷰 제거
      setReview((prevReview) => {
        const updatedReview = prevReview.filter(
          (review) => review.reviewNo !== reviewNo,
        );
        return updatedReview;
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // 날짜 / 시간
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: false,
    });
  };

  // ?글자 이상 시 ... 처리
  const truncateText = (text, length) => {
    if (!text) {
      return '';
    }
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  // 필터링 함수
  useEffect(() => {
    let filtered = review;

    // 작성일자 기준 내림차순 정렬
    filtered.sort(
      (a, b) => new Date(b.reviewNo) - new Date(a.reviewNo),
    );

    setFilteredReview(filtered);
  }, [review]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const updateReviewHandler = (review) => {
    setIsModalOpen(false);
    setUpdateModalOpen(true);
  };

  const updateCloseModal = () => setUpdateModalOpen(false);

  const ReviewStars = ({ rating }) => {
    // 꽉 찬 별의 개수
    const fullStars = Math.floor(rating);
    // 빈 별의 개수
    const emptyStars = 5 - fullStars;

    // 꽉 찬 별 배열 생성
    const fullStarsArray = Array.from(
      { length: fullStars },
      (_, index) => (
        <span key={index}>&#9733;</span> // ★
      ),
    );

    // 빈 별 배열 생성
    const emptyStarsArray = Array.from(
      { length: emptyStars },
      (_, index) => (
        <span key={index + fullStars}>&#9734;</span> // ☆
      ),
    );

    return (
      <span style={{ color: '#FFC107' }}>
        {fullStarsArray}
        {emptyStarsArray}
      </span>
    );
  };

  // 회원이 작성한 리뷰 목록
  const AdminContents = ({ reviews }) => {
    return (
      <>
        {reviews.map((e) => (
          <div
            className={styles.listBody}
            key={e.reviewNo}
            onClick={() => handleReviewClick(e)}
          >
            <div className={styles.resSelectedNo}>
              {e.reviewNo}
            </div>
            <div className={styles.resSelectedAd3}>
              {e.carName && e.carName.length > 0
                ? '(렌트카) ' + truncateText(e.carName, 20)
                : e.stationName && e.stationName.length > 0
                  ? '(충전소) ' +
                    truncateText(e.stationName, 20)
                  : null}
            </div>
            <div className={styles.resSelectedName3}>
              <ReviewStars rating={e.rating} />
              {' / '}
              {truncateText(e.content, 150)}
            </div>
            <div className={styles.resSelectedTime}>
              <div>
                작성일 : {formatTime(e.regDate)}
                <div>
                  {formatTime(e.regDate) !==
                  formatTime(e.updateDate)
                    ? `수정일 : ${formatTime(e.updateDate)} (수정됨)`
                    : ''}
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  // 본체
  return (
    <>
      {review.length > 0 ? (
        <>
          <AdminContents reviews={filteredReview} />
          <MyPageModal
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            {selectedReview && (
              <div>
                <h2>리뷰 상세</h2>
                <p>
                  <ReviewStars
                    rating={selectedReview.rating}
                  />
                </p>
                <p>리뷰: {selectedReview.content}</p>
                {/* <p>사진: {selectedReview.photo}</p> */}

                <p>
                  {selectedReview.carName
                    ? `차종 : ${selectedReview.carName}`
                    : selectedReview.stationName
                      ? `충전소명 : ${selectedReview.stationName}`
                      : null}
                </p>
                <p>
                  작성일:{' '}
                  {formatTime(selectedReview.updateDate)}
                </p>
                <button
                  className={styles.buttonbutton}
                  onClick={() => {
                    if (
                      window.confirm(
                        '정말 리뷰를 삭제하시겠습니까?',
                      )
                    ) {
                      handleDeleteReview(
                        selectedReview.reviewNo,
                      );
                    }
                  }}
                >
                  삭제
                </button>
                <button
                  className={styles.buttonbutton}
                  onClick={updateReviewHandler}
                >
                  수정
                </button>
              </div>
            )}
          </MyPageModal>
          <p className={styles.filteredCount}>
            작성한 리뷰 :{' '}
            <span className={styles.filteredNum}>
              {filteredReview.length}
            </span>
            개
          </p>
        </>
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '1.5rem',
          }}
          onClick={() => console.log(filteredReview)}
        >
          작성된 리뷰가 없습니다.
        </div>
      )}
      {updateModalOpen && (
        <Modal2
          isOpen={updateModalOpen}
          onClose={updateCloseModal}
          reviewNo={selectedReview.reviewNo}
          reviewContent={selectedReview.content}
          reviewRating={selectedReview.rating}
          reviewPhotoPreview={selectedReview.photo}
          reviewItem={
            selectedReview.carName !== null
              ? selectedReview.carName
              : selectedReview.stationName
          }
          isEditMode={true}
        />
      )}
    </>
  );
};

export default MyPageReviewMap;
