import React from 'react';
import git from '../../../assets/git-logo.png';
import notion from '../../../assets/notion-logo.png';
import erd from '../../../assets/erdcloud-logo.png';
import kakao from '../../../assets/kakao-logo.png';
import instagram from '../../../assets/instagram-logo.png';
// import { useNavigate } from 'react-router-dom';
import styles from './ChargeFooter.module.scss';

const footer = () => {
  return (
    <div className='charge_footer'>
      <a
        className={styles.git}
        href='https://github.com/mipi1256/final-project-front'
      >
        <img className={styles.git} src={git} />
      </a>
      <a
        className={styles.notion}
        href='https://www.notion.so/5a30e9eb160742deb993c4b2348cec56'
      >
        <img className={styles.notion} src={notion} />
      </a>
      <a
        className={styles.erd}
        href='https://www.erdcloud.com/d/4jamFmW9qknkKssh5'
      >
        <img className={styles.erd} src={erd} />
      </a>
      <a
        className={styles.instagram}
        href='https://www.instagram.com/plug._.o2/'
      >
        <img className={styles.instagram} src={instagram} />
      </a>
      <a
        className={styles.kakao}
        href='https://pf.kakao.com/_xbIPcG'
      >
        <img className={styles.kakao} src={kakao} />
      </a>
    </div>
  );
};

export default footer;
