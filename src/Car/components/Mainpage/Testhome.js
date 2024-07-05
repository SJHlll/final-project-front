import React from 'react';
import styles from './Testhome.module.scss';
import Frame from './Frame';
import coverImage from '../../assets/175944.png'; // 이미지 import

const Testhome = () => {
  return (
    <div
      style={{
        overFlow: 'hidden',
      }}
    >
      <Frame>
        <img
          className={styles.covervideo}
          src={coverImage} // import한 이미지 사용
          alt='Cover Image'
        />
        <div className={styles.coverheader}>
          <h1 className={styles.covercon}></h1>
        </div>
      </Frame>
    </div>
  );
};

export default Testhome;
