import React from 'react';
import styles from './Frame.module.scss';
const Frame = ({ children }) => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.contentline}>{children}</div>
    </div>
  );
};

export default Frame;
