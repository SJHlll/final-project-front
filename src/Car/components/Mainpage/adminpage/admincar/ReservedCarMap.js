import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthContext from '../../../../../util/AuthContext';

const ReservedCarMap = () => {
  const { role } = useContext(AuthContext); // 관리자 확인용
  const [filterPhoneNumber, setFilterPhoneNumber] =
    useState(''); // 전화번호 필터링
  const [filteredCar, setfilteredCar] = useState([]); // 필터링된 렌트카

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
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  // 전화번호 뒷자리 4개로 필터링
  // useEffect(() => {
  //   if (filterPhoneNumber.length === 4) {
  //     const filtered = reserveStation.filter((e) =>
  //       e.phoneNumber.endsWith(filterPhoneNumber),
  //     );
  //     setfilteredCar(filtered);
  //   } else {
  //     setfilteredCar(reserveStation);
  //   }
  // }, [filterPhoneNumber, reserveStation]);

  // 회원이 예약한 렌트카 목록
  const AdminContents = ({ cars }) => {
    return (
      <>
        {cars.map((e) => (
          <div className='list-body' key={e.reservationNo}>
            <div className='res-no'>{e.reservationNo}</div>
            <div className='res-user-name'>
              <div>{e.name}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className='res-user-no'></div>
            <div className='res-station-name'>
              {truncateText(e.stationName, 20)}
            </div>
            <div className='res-station-time'>
              <div>{formatRentTime(e.rentTime)}</div>
              <div>
                ~ {formatRentEndTime(e.rentTime, e.time)}
              </div>
            </div>
            <button
              className='res-cancel-btn'
              // onDoubleClick={() =>
              //   handleCancelReservation(e.reservationNo)
              // }
            >
              취소
            </button>
          </div>
        ))}
      </>
    );
  };

  // 본체
  return (
    <>
      {role === 'ADMIN' ? ( // && reserveStation.length > 0
        <>
          <input
            className='phone-last-four'
            type='text'
            placeholder='전화번호 뒷자리 4개 입력'
            value={filterPhoneNumber}
            onChange={(e) =>
              setFilterPhoneNumber(e.target.value)
            }
            maxLength='4'
          />
          <AdminContents cars={filteredCar} />
        </>
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '1.5rem',
          }}
        >
          예약된 렌트카가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservedCarMap;
