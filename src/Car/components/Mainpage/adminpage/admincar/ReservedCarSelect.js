import React from 'react';
import styles from '../AdminPage.module.scss';
const ReservedCarSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`${styles.adminSelect} ${styles.reserveCar}`}
      onClick={onClick}
    >
      예약된 렌트카
    </div>
  );
};

export default ReservedCarSelect;
