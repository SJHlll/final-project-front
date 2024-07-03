import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { ReserveStationContext } from '../../../../../contexts/ReserveStationContext';
import AuthContext from '../../../../../util/AuthContext';

const ReservedStationMap = () => {
  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  );
  const { role } = useContext(AuthContext);
  const [filterPhoneNumber, setFilterPhoneNumber] =
    useState('');
  const [filteredStations, setFilteredStations] = useState(
    [],
  );

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin',
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

  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        // 마이페이지에 예약번호 기준으로 예약 취소되는거 훔쳐옴.
        `http://localhost:8181/mypage?reservationNo=${reservationNo}`,
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

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  useEffect(() => {
    if (filterPhoneNumber.length === 4) {
      const filtered = reserveStation.filter((e) =>
        e.phoneNumber.endsWith(filterPhoneNumber),
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(reserveStation);
    }
  }, [filterPhoneNumber, reserveStation]);

  const AdminContents = ({ stations }) => {
    return (
      <>
        {stations.map((e) => (
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
              onDoubleClick={() =>
                handleCancelReservation(e.reservationNo)
              }
            >
              취소
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {role === 'ADMIN' && reserveStation.length > 0 ? (
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
          <AdminContents stations={filteredStations} />
        </>
      ) : (
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          예약된 충전소가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservedStationMap;
