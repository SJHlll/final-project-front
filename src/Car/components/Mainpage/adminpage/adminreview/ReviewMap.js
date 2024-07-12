import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRvContext } from './TestRvContext';
import AuthContext from '../../../../../util/AuthContext';
import styles from '../AdminPage.module.scss';
import { badwords } from './badwords';

const ReviewMap = () => {
  const { review, setReview } = useContext(TestRvContext);
  const { role } = useContext(AuthContext); // 관리자 확인용
  const [filterEmailDomain, setFilterEmailDomain] =
    useState(''); // 이메일 필터링
  const [isBadWordFilter, setIsBadWordFilter] =
    useState(false); // 비속어 필터링 체크박스
  const [isStation, setIsStation] = useState(false); // 충전소리뷰?
  const [isCar, setIsCar] = useState(false); // 렌트카리뷰?
  const [filteredReview, setFilteredReview] = useState([]); // 필터링된 리뷰

  // DB에서 작성된 리뷰 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/review`,
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
        setReview(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [setReview]);

  // 작성된 리뷰 DB에 지우기 (리뷰번호를 기준으로)
  const handleDeleteReview = async (reviewNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/review?reviewNo=${reviewNo}`,
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

    // 이메일 검색
    if (filterEmailDomain) {
      filtered = filtered.filter((e) =>
        e.email.includes(filterEmailDomain),
      );
    }

    // 비속어 체크박스
    if (isBadWordFilter) {
      filtered = filtered.filter((e) =>
        badwords[0].word.some((bad) =>
          e.content.includes(bad),
        ),
      );
    }

    // 충전소 리뷰인지 체크
    if (isStation) {
      filtered = filtered.filter(
        (e) => e.stationName && e.stationName.length >= 1,
      );
    }

    // 렌트카 리뷰인지 체크
    if (isCar) {
      filtered = filtered.filter(
        (e) => e.carName && e.carName.length >= 1,
      );
    }

    // 작성일자 기준 내림차순 정렬
    filtered.sort(
      (a, b) => new Date(b.reviewNo) - new Date(a.reviewNo),
    );

    setFilteredReview(filtered);
  }, [
    review,
    filterEmailDomain,
    isBadWordFilter,
    isStation,
    isCar,
  ]);

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
          <div className={styles.listBody} key={e.reviewNo}>
            <div className={styles.resNo}>{e.reviewNo}</div>
            <div className={styles.resUserName}>
              <div>{e.name}</div>
              <div
                style={{
                  fontSize: '0.9em',
                }}
              >
                {truncateText(e.email, 20)}
              </div>
            </div>
            <div className={styles.resSelectedAd}>
              {e.carName && e.carName.length > 0
                ? '(렌트카) ' + truncateText(e.carName, 14)
                : e.stationName && e.stationName.length > 0
                  ? '(충전소) ' +
                    truncateText(e.stationName, 14)
                  : null}
            </div>
            <div className={styles.resSelectedName}>
              <ReviewStars rating={e.rating} />
              {' / '}
              {truncateText(e.content, 50)}
            </div>
            <div className={styles.resSelectedTime}>
              <div>작성일 : {formatTime(e.regDate)}</div>
              <div>
                {formatTime(e.regDate) !==
                formatTime(e.updateDate)
                  ? `수정일 : ${formatTime(e.updateDate)} (수정됨)`
                  : ''}
              </div>
            </div>
            <div className={styles.spaceBlank}>
              <button
                className={styles.resCancelBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      '정말 리뷰를 삭제하시겠습니까?',
                    )
                  ) {
                    handleDeleteReview(e.reviewNo);
                    alert(
                      `${e.name} 회원님의 리뷰를 삭제했습니다.`,
                    );
                  }
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  // 본체
  return (
    <>
      <div>
        {role === 'ADMIN' && review.length > 0 ? (
          <>
            <AdminContents reviews={filteredReview} />
            <input
              className={styles.adminFilter}
              type='text'
              placeholder='이메일 도메인 입력'
              value={filterEmailDomain}
              onChange={(e) =>
                setFilterEmailDomain(e.target.value)
              }
            />
            <label className={styles.adminFilter2}>
              <input
                type='checkbox'
                checked={isBadWordFilter}
                onChange={(e) =>
                  setIsBadWordFilter(e.target.checked)
                }
                style={{
                  marginRight: '5px',
                  position: 'relative',
                  top: '2px',
                }}
              />
              <span>
                비속어가 포함된 리뷰 보기 (&apos;?&apos;도
                필터링에 추가)
              </span>
            </label>
            <label className={styles.adminFilter3}>
              <input
                type='checkbox'
                checked={isStation}
                onChange={(e) => {
                  setIsStation(e.target.checked);
                  if (e.target.checked) {
                    setIsCar(false);
                  }
                }}
                style={{
                  marginRight: '5px',
                  position: 'relative',
                  top: '2px',
                }}
              />
              <span>충전소만 보기</span>
            </label>
            <label className={styles.adminFilter4}>
              <input
                type='checkbox'
                checked={isCar}
                onChange={(e) => {
                  setIsCar(e.target.checked);
                  if (e.target.checked) {
                    setIsStation(false);
                  }
                }}
                style={{
                  marginRight: '5px',
                  position: 'relative',
                  top: '2px',
                }}
              />
              <span>렌트카만 보기</span>
            </label>
            <p className={styles.filteredCount}>
              작성된 리뷰 :{' '}
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
      </div>
    </>
  );
};

export default ReviewMap;
