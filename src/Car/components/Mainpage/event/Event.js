import React from 'react';
import styles from './Event.module.scss';
import Eventlist from './Eventlist';
import Frame from '../Frame';
import style from '../../../../scss/Button.module.scss';
const Event = () => {
  return (
    <Frame>
      <div className={styles.eventbody}>
        <Eventlist />
      </div>
      <button
        className={`${style.publicBtn} ${style.eventButton}`}
      >
        추가
      </button>
    </Frame>
  );
};

export default Event;
