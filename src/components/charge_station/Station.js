import React, { useContext } from 'react';
import '../../scss/ChargeStationList.scss';
import { MapContext } from '../../context/MapContext';

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
  const { setSelectedStation, setSelectedMarkerIndex } = useContext(MapContext);

  const handleLocateClick = () => {
    setSelectedStation({ lat, lng }); // 선택된 좌표 업데이트
    setSelectedMarkerIndex(index); // 선택된 마커 인덱스 설정
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
