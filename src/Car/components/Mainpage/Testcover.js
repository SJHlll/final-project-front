import React from 'react';
import styles from './Testcover.module.scss';
import mainback from './mainback.mp4';
const Testcover = () => {
  return (
    <>
      <div className={styles.covertest}>
        <video
          className={styles.covervideo}
          muted
          autoPlay
          loop
        >
          <source src={mainback} type='video/mp4' />
          <strong>
            Your browser does not support the video tag.
          </strong>
        </video>
        <div>
          <h1 className={styles.coverheader}>Discovery</h1>
          <p className={styles.covercontent}>
            The warm heart <br />
            of Nordic beauty
          </p>
        </div>
      </div>
    </>
  );
};

export default Testcover;
