import React, { useContext } from 'react';
import styles from '../scss/ChargeStationList.module.scss';
import { MapContext } from '../../../../contexts/MapContext';

const Station = ({
  Id,
  lat,
  lng,
  StationId,
  Name,
  Address,
  Speed,
  Type,
  Management,
  areaIn,
  Available,
}) => {
  const { setSelectedStation, setMapLevel } =
    useContext(MapContext);

  // 위치 찾기 버튼 클릭 시 발동하는 함수
  const handleLocateClick = () => {
    setSelectedStation({ lat, lng }); // 선택된 좌표 업데이트
    setMapLevel(2); // 지도 레벨 설정
  };

  return (
    <div
      className={styles.Station}
      style={{ marginTop: '5px' }}
    >
      {/* 왼쪽박스 */}
      <div className={styles.Status}>
        <div
          className={styles.Name}
          onClick={handleLocateClick}
        >
          <span>
            ({Speed}) {Name}
          </span>
        </div>
        <div className={styles.Address}>
          <a
            href={`https://map.kakao.com/link/to/${Address},${lat},${lng}`}
            target='_blank'
            rel='noreferrer'
          >
            {Address}
          </a>
        </div>
      </div>
      {/* 오른쪽박스 */}
      <div className={styles.Charger}>
        <div className={styles.ChargerType}>{Type}</div>
        <div
          className={
            Available === '이용가능'
              ? styles.able
              : styles.disable
          }
        >
          {Available}
        </div>
        <div>{StationId}</div>
      </div>
    </div>
  );
};

export default Station;
