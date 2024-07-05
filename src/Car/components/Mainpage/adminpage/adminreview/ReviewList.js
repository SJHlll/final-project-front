import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../Frame';
import ReviewMap from './ReviewMap';
import ReservedStationSelect from '../adminstation/ReservedStationSelect';
import ReservedCarSelect from '../admincar/ReservedCarSelect';
import ReservedStationList from '../adminstation/ReservedStationList';
import ReservedCarList from '../admincar/ReservedCarList';
import { TestRvProvider } from './TestRvContext';
import styles from '../AdminPage.module.scss';

const ReviewList = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };

  return (
    <TestRvProvider>
      <Frame>
        <div className={styles.adminPageSelect}>
          <ReservedStationSelect
            isSelected={selected === 'station'}
            onClick={() =>
              handleSelect('station', '/admin/station')
            }
          />
          <ReservedCarSelect
            isSelected={selected === 'car'}
            onClick={() =>
              handleSelect('car', '/admin/car')
            }
          />
          <div
            className={`${styles.adminSelect} ${styles.review} ${styles.selected}`}
          >
            작성된 리뷰
          </div>
        </div>
        <div className={styles.listHeader}>
          <div className={styles.resNo}>번호</div>
          <div className={styles.resUserName}>회원명</div>
          <div
            className={styles.resSelectedAd}
            style={{
              fontSize: '0.83em',
              lineHeight: '31px',
            }}
          >
            충전소/렌트카
          </div>
          <div className={styles.resSelectedName}>
            리뷰내용
          </div>
          <div className={styles.resSelectedTime}>
            작성날짜
          </div>
          <div className={styles.hiddenText}></div>
        </div>
        <div className={styles.adminPageList}>
          <div
            className={`${styles.adminList} ${styles.review}`}
          >
            <ReviewMap />
          </div>
          {selected === 'station' && (
            <ReservedStationList />
          )}
          {selected === 'car' && <ReservedCarList />}
        </div>
      </Frame>
    </TestRvProvider>
  );
};

export default ReviewList;
