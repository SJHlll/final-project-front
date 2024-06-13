import React from 'react';
import '../scss/ChargeStationList.scss';

const ChargeStationList = () => {
  let StationName = '한국ICT인재개발원 신촌센터'; // 충전소 이름
  let Address = '서울 마포구 백범로 23 케이터틀'; // 주소
  let AC = 2; // 완속 충전기 개수
  let DC = 3; // 급속 충전기 개수

  return (
    // 컨테이너
    <div className='ListContainer'>
      <div className='Station'>
        {/* 왼쪽박스 */}
        <div className='Status'>
          <div className='Name'>{StationName}</div>
          <div className='Address'>{Address}</div>
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
    </div>
  );
};

export default ChargeStationList;
