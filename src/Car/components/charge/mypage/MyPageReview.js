import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from '../scss/MyPageCharge.module.scss';
import { TestRvContext } from '../../Mainpage/adminpage/adminreview/TestRvContext';
import AuthContext from '../../../../util/AuthContext';
import { Modal } from 'reactstrap';
import Modal2 from '../../Mainpage/review/Modal2';
import React, { useContext, useEffect } from 'react';
import styles from '../scss/MyPageCharge.module.scss';
import { TestRvContext } from '../../Mainpage/adminpage/adminreview/TestRvContext';
import AuthContext from '../../../../util/AuthContext';

const MyPageReview = () => {
  const { review, setReview } = useContext(TestRvContext);
  const { email } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState(false);

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
  }, [email, setReview]);

  const handleDeleteReview = async (reviewNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://localhost:8181/admin/review?reviewNo=${reviewNo}`,
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
    } catch (error) {
      console.error(error);
    }
  };

  const updateReview = () => setUpdateModal(true);

  return (
    <div className={styles.userReviewList}>
      {review.length > 0 ? (
        <>
          <h3 style={{ textAlign: 'center' }}>
            내가 쓴 리뷰:{' '}
          </h3>
          <div
            className={styles.reviewList}
            style={{
              // background: 'red',
              borderTop: '1px solid black',
            }}
          >
            {review.map((review) => (
              <div
                style={{
                  border: '1px solid black',
                }}
                key={review.reviewNo}
                className={styles.reviewItem}
              >
                <div className={styles.flex}>
                  <div className='value'>
                    날짜 및 시간:{' '}
                  </div>
                  <div>{formatTime(review.updateDate)}</div>
                </div>
                <div className={styles.flex}>
                  <div className='value'>
                    충전소/전기차:{' '}
                  </div>
                  <div>
                    {review.carName &&
                    review.carName.length > 0
                      ? review.carName
                      : review.stationName &&
                          review.stationName.length > 0
                        ? review.stationName
                        : null}
                  </div>
                </div>
                <div className={styles.flex}>
                  <div className='value'>내용 : </div>
                  <div>{review.content}</div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    if (
                      window.confirm(
                        '정말 리뷰를 삭제하시겠습니까?',
                      )
                    ) {
                      handleDeleteReview(review.reviewNo);
                    }
                  }}
                >
                  삭제
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={updateReview}
                >
                  수정
                </button>
              </div>
            ))}
            {updateModal && (
              <Modal
                isOpen={updateModal}
                toggle={() => setUpdateModal(false)}
              >
                <Modal2
                  isOpen={updateModal}
                  toggle={() => setUpdateModal(false)}
                  reviewNo={review.reviewNo}
                  content={review.content}
                />
              </Modal>
            )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3
          style={{ textAlign: 'center', marginTop: '50px' }}
        >
          작성한 리뷰가 없습니다.
        </h3>
      )}
    </div>
  );
};

export default MyPageReview;
