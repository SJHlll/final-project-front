import React, { useContext } from 'react';
import styles from './Testhome.module.scss';
import Frame from './Frame';
import coverImage from '../../assets/pexels-bertellifotografia-799443.jpg'; // 이미지 import

import { useNavigate } from 'react-router-dom';
import { TabContext } from './TabContext';
const Testhome = () => {
  const navigate = useNavigate();
  const { updateActiveTab } = useContext(TabContext);

  const goreservation = () => {
    updateActiveTab(2); // 'state' 값을 2로 설정 (전기차 렌트 탭)
    navigate('/car/res');
  };

  return (
    <div className={styles.testhomeContainer}>
      <Frame>
        <img
          className={styles.covervideo}
          src={coverImage} // import한 이미지 사용
          alt='Cover Image'
        />
        <div className={styles.hometext}>Plug & </div>
        <div
          className={`${styles.hometext} ${styles.hometext2}`}
        >
          Go
        </div>
        <button
          className={styles.marquee}
          onClick={goreservation}
        >
          <span data-text='예약하러가기'>예약하러가기</span>
        </button>
      </Frame>
    </div>
  );
};

export default Testhome;
