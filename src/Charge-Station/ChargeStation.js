import React from 'react';
import KakaoMap from '../KakaoMap/KakaoMap';
import ChargeStationList from './ChargeStationList';
import ReservationBtn from './ReservationBtn';
import ChargeStationSearch from './ChargeStationSearch';

const ChargeStation = () => {
  return (
    <>
      <KakaoMap /* 카카오지도 */ />
      <ReservationBtn /* 예약버튼 */ />
      <ChargeStationSearch /* 충전소찾기 */ />
      <ChargeStationList /* 충전소목록 */ />
    </>
  );
};

export default ChargeStation;
