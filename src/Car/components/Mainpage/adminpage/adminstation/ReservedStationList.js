import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReservedStationMap from './ReservedStationMap';
import ReservedCarSelect from '../admincar/ReservedCarSelect';
import ReviewSelect from '../adminreview/ReviewSelect';
import ReservedCarList from '../admincar/ReservedCarList';
import ReviewList from '../adminreview/ReviewList';
import { ReserveStationProvider } from '../../../../../contexts/ReserveStationContext';
import styles from '../AdminPage.module.scss';

const ReservedStationList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };

  return (
    <ReserveStationProvider>
      <Frame>
        <div className={styles.adminPageSelect}>
          <div
            className={`${styles.adminSelect} ${styles.reserveStation} ${styles.selected}`}
          >
            예약된 충전소
          </div>
          <ReservedCarSelect
            isSelected={selected === 'car'}
            onClick={() =>
              handleSelect('car', '/admin/car')
            }
          />
          <ReviewSelect
            isSelected={selected === 'review'}
            onClick={() =>
              handleSelect('review', '/admin/review')
            }
          />
        </div>
        <div className={styles.listHeader}>
          <div className={styles.resNo}>번호</div>
          <div className={styles.resUserName}>회원명</div>
          <div className={styles.resSelectedName}>
            충전소
          </div>
          <div className={styles.resSelectedAd}>
            충전비용
          </div>
          <div className={styles.resSelectedTime}>
            충전기간
          </div>
          <div className={styles.hiddenText}></div>
        </div>
        <div className={styles.adminPageList}>
          <div
            className={`${styles.adminList} ${styles.reserveStation}`}
          >
            <ReservedStationMap />
          </div>
          {selected === 'car' && <ReservedCarList />}
          {selected === 'review' && <ReviewList />}
        </div>
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            borderBottom: '2px solid black',
          }}
        ></div>
      </Frame>
    </ReserveStationProvider>
  );
};

export default ReservedStationList;
