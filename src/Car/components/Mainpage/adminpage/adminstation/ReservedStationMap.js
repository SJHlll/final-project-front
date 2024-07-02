import React, { useContext, useEffect } from 'react';
import { ReserveStationContext } from '../../../../../contexts/ReserveStationContext';

const ReservedStationMap = () => {
  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
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

  const AdminContents = () => {
    return (
      <>
        {reserveStation.map((e) => (
          <div className='list-body' key={e.reservationNo}>
            <div className='res-no'>{e.reservationNo}</div>
            <div className='res-user-name'>
              <div>{e.name}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className='res-user-no'></div>
            <div className='res-station-name'>
              {e.stationName}
            </div>
            <div className='res-station-time'>
              <div>{formatRentTime(e.rentTime)}</div>
              <div>
                ~ {formatRentEndTime(e.rentTime, e.time)}
              </div>
            </div>
            <button className='res-cancel-btn'>취소</button>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {reserveStation.length > 0 ? (
        <AdminContents />
      ) : (
        <div>예약된 충전소가 없어요</div>
      )}
    </>
  );
};

export default ReservedStationMap;
