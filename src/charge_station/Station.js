import React from 'react';
import '../scss/ChargeStationList.scss';

const Station = ({ name, address, ac, dc }) => {
  return (
    <div className='Station'>
      {/* 왼쪽박스 */}
      <div className='Status'>
        <div className='Name'>{name}</div>
        <div className='Address'>{address}</div>
      </div>
      {/* 오른쪽박스 */}
      <div className='Charger'>
        <div className='ChargerNum'>
          급속 : {ac}대 / 완속 : {dc}대
        </div>
        <div className='ChargeAble'>충전 가능</div>
        <div className='SearchBtn'>위치 보기</div>
      </div>
    </div>
  );
};

export default Station;
