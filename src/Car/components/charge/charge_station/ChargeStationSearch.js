import React from 'react';
import Area from './area/Area';
import styles from '../scss/ChargeStationSearch.module.scss';

const ChargeStationSearch = () => {
  return (
    <div className={styles.SearchContainer}>
      <div className={styles.One}>
        <span>충전소 위치 찾기</span>
      </div>
      <Area />
    </div>
  );
};

export default ChargeStationSearch;
