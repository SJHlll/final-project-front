import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRcContext } from './TestRcContext';
import AuthContext from '../../../../../util/AuthContext';
import styles from '../AdminPage.module.scss';

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

  // 예약한 충전소 DB에 지우기 (예약번호를 기준으로)
  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://localhost:8181/admin/car?reservationNo=${reservationNo}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      // 예약 취소가 성공하면 UI에서 해당 예약을 제거
      setReserveCar((prevCar) =>
        prevCar.filter(
          (car) => car.reservationNo !== reservationNo,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 날짜 / 시간
  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
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

  // 전화번호 뒷자리 4개로 필터링
  useEffect(() => {
    let filtered;

    if (filterPhoneNumber.length === 4) {
      filtered = reserveCar.filter((e) =>
        e.phoneNumber.endsWith(filterPhoneNumber),
      );
    } else {
      filtered = [...reserveCar];
    }

    filtered.sort(
      (a, b) => new Date(a.rentDate) - new Date(b.rentDate),
    );
    setfilteredCar(filtered);
  }, [filterPhoneNumber, reserveCar]);

  // 회원이 예약한 렌트카 목록
  const AdminContents = ({ cars }) => {
    return (
      <>
        {cars.map((e) => (
          <div
            className={styles.listBody}
            key={e.reservationNo}
          >
            <div className={styles.resNo}>
              {e.reservationNo}
            </div>
            <div className={styles.resUserName}>
              <div>{e.userName}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className={styles.resSelectedName}>
              {truncateText(e.carName, 20)}
            </div>
            <div className={styles.resSelectedAd}>
              {e.totalPrice}원
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.rentDate)}</div>
              <div>~ {formatRentTime(e.turninDate)}</div>
            </div>
            <div className={styles.spaceBlank}>
              <button
                className={styles.resCancelBtn}
                onDoubleClick={() => {
                  if (
                    window.confirm(
                      '정말 예약을 취소하시겠습니까?',
                    )
                  ) {
                    handleCancelReservation(
                      e.reservationNo,
                    );
                    alert(
                      `${e.name} 회원님의 ${e.carName} 렌트카 예약을 취소했습니다.\n충전금액 : ${e.totalPrice}원`,
                    );
                  }
                }}
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
            className={styles.adminFilter}
            type='text'
            placeholder='전화번호 뒷자리 4개 입력'
            value={filterPhoneNumber}
            onChange={(e) =>
              setFilterPhoneNumber(e.target.value)
            }
            maxLength='4'
          />
          <p className={styles.filteredCount}>
            예약된 렌트카 :{' '}
            <span className={styles.filteredNum}>
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
