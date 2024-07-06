import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRvContext } from '../../Mainpage/adminpage/adminreview/TestRvContext';
import styles from './MyPageReviewList.module.scss';
import AuthContext from '../../../../util/AuthContext';
import MyPageReviewModal from './MyPageReviewModal';
import {
  API_BASE_URL,
  REVIEW,
} from '../../../../config/host-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPageReviewMap = () => {
  const { review, setReview } = useContext(TestRvContext);
  const { email } = useContext(AuthContext);
  const [filteredReview, setFilteredReview] = useState([]);
  const [selectedReview, setSelectedReview] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_REVIEW_URL = API_BASE_URL + REVIEW;

  const navigate = useNavigate();
  const [error, setError] = useState('');

  // DB에서 작성된 리뷰 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin/review',
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
  }, [setReview]);

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
      (a, b) =>
        new Date(b.updateDate) - new Date(a.updateDate),
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
            <div className={styles.resSelectedAd}>
              {e.carName && e.carName.length > 0
                ? '(렌트카) ' + truncateText(e.carName, 20)
                : e.stationName && e.stationName.length > 0
                  ? '(충전소) ' +
                    truncateText(e.stationName, 20)
                  : null}
            </div>
            <div className={styles.resSelectedName}>
              {truncateText(e.content, 150)}
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatTime(e.updateDate)}</div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const handleDelete = async (reviewNo) => {
    try {
      const token = localStorage.gettem('ACCESS_TOKEN');
      const res = await axios.delete(
        `http://localhost:8181/review/${reviewNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.staus === 200) {
        alert('리뷰가 삭제되었습니다.');
        setFilteredReview(
          filteredReview.filter(
            (r) => r.reviewNo !== reviewNo,
          ),
        );
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error: ', err.response);
      setError(
        err.response
          ? err.response.data
          : '알 수 없는 오류가 발생했습니다.',
      );
      alert('리뷰 삭제에 실패하였습니다.');
    }
  };

  // 본체
  return (
    <>
      {review.length > 0 ? (
        <>
          <AdminContents reviews={filteredReview} />
          <p className={styles.filteredCount}>
            작성한 리뷰 :{' '}
            <span className={styles.filteredNum}>
              {filteredReview.length}
            </span>
            개
          </p>
          <MyPageReviewModal
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            {selectedReview && (
              <div>
                <h2>리뷰 상세</h2>
                <p>내용: {selectedReview.content}</p>
                <p>사진: {selectedReview.photo}</p>
                <p>별점: {selectedReview.rating}</p>
                <p>
                  차/충전소이름: {selectedReview.carName}
                  {selectedReview.stationName}
                </p>
                <p>
                  작성일:{' '}
                  {formatTime(selectedReview.updateDate)}
                </p>
                <button onClick={() => console.log('수정')}>
                  수정
                </button>
                <button onClick={handleDelete}>삭제</button>
                <button onClick={closeModal}>닫기</button>
              </div>
            )}
          </MyPageReviewModal>
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
    </>
  );
};

export default MyPageReviewMap;
