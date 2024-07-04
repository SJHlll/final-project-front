import React from 'react';
import styles from './Testhome.module.scss';
import Frame from './Frame';

const Testhome = () => {
  return (
    <div>
      <Frame>
        <video
          className={styles.covervideo}
          muted
          autoPlay
          loop
          src={
            'https://plugngo.s3.ap-northeast-2.amazonaws.com/mainback.mp4'
          }
          type='video/mp4'
        >
          <strong>
            Your browser does not support the video tag.
          </strong>
        </video>

        <div className={styles.coverheader}>
          <h1 className={styles.covercon}>
            나도 여행가고싶다
          </h1>
          <p className={styles.covercontent}>
            I want to go
            <br /> on a trip
          </p>
        </div>
      </Frame>
    </div>
  );
};
export default Testhome;
