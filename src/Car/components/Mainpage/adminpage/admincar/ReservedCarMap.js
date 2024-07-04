import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRcContext } from './TestRcContext';
import AuthContext from '../../../../../util/AuthContext';

const ReservedCarMap = () => {
  const { reserveCar, setReserveCar } =
    useContext(TestRcContext);
  const { role } = useContext(AuthContext); // 관리자 확인용
  const [filterPhoneNumber, setFilterPhoneNumber] =
    useState(''); // 전화번호 필터링
  const [filteredCar, setfilteredCar] = useState([]); // 필터링된 렌트카

  // DB에서 예약한 렌트카 가져오기
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin/car',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setReserveCar(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [setReserveCar]);

  // 날짜 / 시간 시작일
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

  // 날짜 / 시간 종료일
  const formatRentEndTime = (rentTime, time) => {
    const date = new Date(rentTime);
    date.setMinutes(date.getMinutes() + time);
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

  // 전화번호 뒷자리 4개로 필터링
  useEffect(() => {
    if (filterPhoneNumber.length === 4) {
      const filtered = reserveCar.filter((e) =>
        e.phoneNumber.endsWith(filterPhoneNumber),
      );
      setfilteredCar(filtered);
    } else {
      setfilteredCar(reserveCar);
    }
  }, [filterPhoneNumber, reserveCar]);

  // 회원이 예약한 렌트카 목록
  const AdminContents = ({ cars }) => {
    return (
      <>
        {cars.map((e) => (
          <div className='list-body' key={e.carNo}>
            <div className='res-no'>{e.carNo}</div>
            <div className='res-user-name'>
              <div>{e.userName}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className='res-selected-name'>
              {truncateText(e.carName, 20)}
            </div>
            <div className='res-selected-ad'>
              {e.rentCarPrice}원
            </div>
            <div className='res-selected-time'>
              <div>{formatRentTime(e.rentTime)}</div>
              <div>
                ~ {formatRentEndTime(e.rentTime, e.time)}
              </div>
            </div>
            <div className='space-blank'>
              <button
                className='res-cancel-btn'
                // onDoubleClick={() =>
                //   handleCancelReservation(e.reservationNo)
                // }
              >
                취소
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
      {role === 'ADMIN' && reserveCar.length > 0 ? (
        <>
          <AdminContents cars={filteredCar} />
          <input
            className='admin-filter'
            type='text'
            placeholder='전화번호 뒷자리 4개 입력'
            value={filterPhoneNumber}
            onChange={(e) =>
              setFilterPhoneNumber(e.target.value)
            }
            maxLength='4'
          />
          <p className='filtered-count'>
            예약된 렌트카 :{' '}
            <span className='filtered-num'>
              {filteredCar.length}
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
          onClick={() => console.log(filteredCar)}
        >
          예약된 렌트카가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservedCarMap;
