import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { ReserveStationContext } from '../../../../../contexts/ReserveStationContext';
import AuthContext from '../../../../../util/AuthContext';
import styles from '../AdminPage.module.scss';

const ReservedStationMap = () => {
  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  ); // 예약한 충전소 가져오기
  const { role } = useContext(AuthContext); // 관리자 확인용
  const [filterPhoneNumber, setFilterPhoneNumber] =
    useState(''); // 전화번호 필터링
  const [filteredStations, setFilteredStations] = useState(
    [],
  ); // 필터링된 충전소

  // DB에서 예약한 충전소 가져오기
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/station`,
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
        setReserveStation(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [setReserveStation]);

  // 예약한 충전소 DB에 지우기 (예약번호를 기준으로)
  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/mypage?reservationNo=${reservationNo}`,
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
      setReserveStation((prevStations) =>
        prevStations.filter(
          (station) =>
            station.reservationNo !== reservationNo,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 날짜 / 시간 시작일
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

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };

  // 전화번호 뒷자리 4개로 필터링
  useEffect(() => {
    let filtered;

    if (filterPhoneNumber.length === 4) {
      filtered = reserveStation.filter((e) =>
        e.phoneNumber.endsWith(filterPhoneNumber),
      );
    } else {
      filtered = [...reserveStation];
    }

    filtered.sort(
      (a, b) => new Date(b.chargeNo) - new Date(a.chargeNo),
    );
    setFilteredStations(filtered);
  }, [filterPhoneNumber, reserveStation]);

  // 회원이 예약한 충전소 목록
  const AdminContents = ({ stations }) => {
    return (
      <>
        {stations.map((e) => (
          <div
            className={styles.listBody}
            key={e.reservationNo}
          >
            <div className={styles.resNo}>{e.chargeNo}</div>
            <div className={styles.resUserName}>
              <div>{e.name}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className={styles.resSelectedName}>
              <div>{truncateText(e.stationName, 20)}</div>
              <div style={{ fontSize: '0.8em' }}>
                {truncateText(e.address, 35)}
              </div>
            </div>
            <div className={styles.resSelectedAd}>
              {formatPrice(e.rentChargePrice)}원
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.rentTime)}</div>
              <div>
                ~ {formatRentEndTime(e.rentTime, e.time)}
              </div>
            </div>
            <div className={styles.spaceBlank}>
              <button
                className={styles.resCancelBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      '정말 예약을 취소하시겠습니까?',
                    )
                  ) {
                    handleCancelReservation(
                      e.reservationNo,
                    );
                    alert(
                      `${e.name} 회원님의 ${e.stationName} 충전소 예약을 취소했습니다.\n충전금액 : ${e.rentChargePrice}원`,
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
      {role === 'ADMIN' && reserveStation.length > 0 ? (
        <>
          <AdminContents stations={filteredStations} />
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
            예약된 충전소 :{' '}
            <span className={styles.filteredNum}>
              {filteredStations.length}
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
          onClick={() => console.log(filteredStations)}
        >
          예약된 충전소가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservedStationMap;
