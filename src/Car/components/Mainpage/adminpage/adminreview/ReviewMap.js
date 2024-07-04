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
  const [filteredReview, setFilteredReview] = useState([]); // 필터링된 리뷰
  const [isBadWordFilter, setIsBadWordFilter] =
    useState(false); // 특정 단어 필터링 체크박스 상태

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

  // 이메일 도메인과 특정 단어로 필터링
  useEffect(() => {
    let filtered = review;

    if (filterEmailDomain) {
      filtered = filtered.filter((e) =>
        e.email.includes(filterEmailDomain),
      );
    }

    if (isBadWordFilter) {
      filtered = filtered.filter((e) =>
        badwords[0].word.some((bad) =>
          e.content.includes(bad),
        ),
      );
    }

    setFilteredReview(filtered);
  }, [filterEmailDomain, isBadWordFilter, review]);

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
        <AdminContents reviews={filteredReview} />
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '1.5rem',
          }}
        >
          작성된 리뷰가 없습니다.
        </div>
      )}
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
        비속어가 포함된 리뷰 보기 (&apos;?&apos;도 필터링에
        추가)
      </label>
    </>
  );
};

export default ReviewMap;
