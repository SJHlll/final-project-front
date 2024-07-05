import React from 'react';
import styles from '../AdminPage.module.scss';

const ReservedStationSelect = ({ onClick }) => {
  return (
    <div
      className={`${styles.adminSelect} ${styles.reserveStation}`}
      onClick={onClick}
    >
      예약된 충전소
    </div>
  );
};

export default ReservedStationSelect;
