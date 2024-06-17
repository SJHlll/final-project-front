import React, { useContext } from 'react';
import '../../scss/ChargeStationList.scss';
import { MapContext } from '../contexts/MapContext';

const Station = ({
  id,
  lat,
  lng,
  StationName,
  StationAddress,
  AC,
  DC,
  index,
}) => {
  const { setSelectedStation, setSelectedMarkerIndex, setMapLevel } =
    useContext(MapContext);

  // 위치 찾기 버튼 클릭 시 발동하는 함수
  const handleLocateClick = () => {
    setSelectedStation({ lat, lng }); // 선택된 좌표 업데이트
    setSelectedMarkerIndex(index); // 선택된 마커 인덱스 설정
    setMapLevel(4); // 지도 레벨 설정
  };

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
        <div className='SearchBtn' onClick={handleLocateClick}>
          위치 찾기
        </div>
      </div>
    </div>
  );
};

export default Station;
