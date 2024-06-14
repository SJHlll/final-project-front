import React from 'react';
import '../scss/ChargeStationList.scss';

const Station = ({ id, lat, lng, StationName, StationAddress, AC, DC }) => {
  return (
    <div className='Station' style={{ marginTop: '5px' }}>
      {/* 왼쪽박스 */}
      <div className='Status'>
        <div className='Name'>{StationName}</div>
        <div className='Address'>{StationAddress}</div>
      </div>
      {/* 오른쪽박스 */}
      <div className='Charger'>
        <div className='ChargerNum'>
          급속 : {AC}대 / 완속 : {DC}대
        </div>
        <div className='ChargeAble'>충전 가능</div>
        <div className='SearchBtn'>위치 보기</div>
      </div>
    </div>
  );
};

export default Station;
