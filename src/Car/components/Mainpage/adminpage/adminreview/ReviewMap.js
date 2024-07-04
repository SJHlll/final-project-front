import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRvContext } from './TestRvContext';
import AuthContext from '../../../../../util/AuthContext';
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
        setReview(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [setReview]);

  // 날짜 / 시간 작성일
  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: true,
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

    setFilteredReview(filtered);
  }, [
    review,
    filterEmailDomain,
    isBadWordFilter,
    isStation,
    isCar,
  ]);

  // 회원이 작성한 리뷰 목록
  const AdminContents = ({ reviews }) => {
    return (
      <>
        {reviews.map((e) => (
          <div className='list-body' key={e.reviewNo}>
            <div className='res-no'>{e.reviewNo}</div>
            <div className='res-user-name'>
              <div>{e.name}</div>
              <div>{truncateText(e.email, 20)}</div>
            </div>
            <div className='res-selected-ad'>
              {e.carName && e.carName.length > 1
                ? truncateText(e.carName, 14)
                : e.stationName && e.stationName.length > 1
                  ? truncateText(e.stationName, 14)
                  : null}
            </div>
            <div className='res-selected-name'>
              {truncateText(e.content, 50)}
            </div>
            <div className='res-selected-time'>
              <div>{formatRentTime(e.updateDate)}</div>
            </div>
            <div className='space-blank'>
              <button
                className='res-cancel-btn'
                // onDoubleClick={() =>
                //   handleCancelReservation(e.reservationNo)
                // }
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
      {role === 'ADMIN' && review.length > 0 ? (
        <>
          <AdminContents reviews={filteredReview} />
          <input
            className='admin-filter'
            type='text'
            placeholder='이메일 도메인 입력'
            value={filterEmailDomain}
            onChange={(e) =>
              setFilterEmailDomain(e.target.value)
            }
          />
          <label className='admin-filter2'>
            <input
              type='checkbox'
              checked={isBadWordFilter}
              onChange={(e) =>
                setIsBadWordFilter(e.target.checked)
              }
              style={{ marginRight: '5px' }}
            />
            <span>
              비속어가 포함된 리뷰 보기 (&apos;?&apos;도
              필터링에 추가)
            </span>
          </label>
          <label className='admin-filter3'>
            <input
              type='checkbox'
              checked={isStation}
              onChange={(e) => {
                setIsStation(e.target.checked);
                if (e.target.checked) {
                  setIsCar(false);
                }
              }}
              style={{ marginRight: '5px' }}
            />
            <span>충전소만 보기</span>
          </label>
          <label className='admin-filter4'>
            <input
              type='checkbox'
              checked={isCar}
              onChange={(e) => {
                setIsCar(e.target.checked);
                if (e.target.checked) {
                  setIsStation(false);
                }
              }}
              style={{ marginRight: '5px' }}
            />
            <span>렌트카만 보기</span>
          </label>
          <p className='filtered-count'>
            작성된 리뷰 :{' '}
            <span className='filtered-num'>
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
    </>
  );
};

export default ReviewMap;
