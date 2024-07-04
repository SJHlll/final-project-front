import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReservedCarMap from './ReservedCarMap';
import ReservedStationSelect from '../adminstation/ReservedStationSelect';
import ReviewSelect from '../adminreview/ReviewSelect';
import ReviewList from '../adminreview/ReviewList';
import ReservedStationList from '../adminstation/ReservedStationList';
import { TestRcProvider } from './TestRcContext';
import styles from '../AdminPage.module.scss';
const ReservedCarList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };
  return (
    <TestRcProvider>
      <Frame>
        <div className={styles.adminPageSelect}>
          <ReservedStationSelect
            isSelected={selected === 'station'}
            onClick={() =>
              handleSelect('station', '/admin/station')
            }
          />
          <div
            className={`${styles.adminSelect} ${styles.reserveCar} ${styles.selected}`}
          >
            예약된 렌트카
          </div>
          <ReviewSelect
            isSelected={selected === 'review'}
            onClick={() =>
              handleSelect('review', '/admin/review')
            }
          />
        </div>
        <div className={styles.listHeader}>>
          <div className={styles.resNo}>번호</div>
          <div className={styles.resUserName}>회원명</div>
          <div className={styles.resSelectedName}>차종</div>
          <div className={styles.resSelectedAd}>렌트비용</div>
          <div className={styles.resSelectedTime}>렌트기간</div>
          <div className={styles.hiddenText}></div>
        </div>
        <div className={styles.adminPageList}>
          <div className={`${styles.adminList} ${styles.reserveCar}`}>
            <ReservedCarMap />
          </div>
          {selected === 'station' && (
            <ReservedStationList />
          )}
          {selected === 'review' && <ReviewList />}
        </div>
      </Frame>
    </TestRcProvider>
  );
};

export default ReservedCarList;
