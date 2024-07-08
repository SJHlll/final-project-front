import React from 'react';
import git from '../../../assets/git-logo.png';
import notion from '../../../assets/notion-logo.png';
import erd from '../../../assets/erdcloud-logo.png';
import kakao from '../../../assets/kakao-logo.png';
import instagram from '../../../assets/instagram-logo.png';
import styles from './ChargeFooter.module.scss';
import Logo from '../../../assets/nlogo.png';

const ChargeFooter = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.chargeFooter}>
        <div className={styles.footerBtn}>
          <a
            className={styles.iconLink}
            href='https://github.com/mipi1256/final-project-front'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className={styles.icon}
              src={git}
              alt='GitHub'
            />
          </a>
          <a
            className={styles.iconLink}
            href='https://www.notion.so/5a30e9eb160742deb993c4b2348cec56'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className={styles.icon}
              src={notion}
              alt='Notion'
            />
          </a>
          <a
            className={styles.iconLink}
            href='https://www.erdcloud.com/d/4jamFmW9qknkKssh5'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className={styles.icon}
              src={erd}
              alt='ERD Cloud'
            />
          </a>
          <a
            className={styles.iconLink}
            href='https://www.instagram.com/plug._.o2/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className={styles.icon}
              src={instagram}
              alt='Instagram'
            />
          </a>
          <a
            className={styles.iconLink}
            href='https://pf.kakao.com/_xbIPcG'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className={styles.icon}
              src={kakao}
              alt='Kakao'
            />
          </a>
        </div>
      </div>

      <div className={styles.logoSimb}>
        <a
          className={styles.iconLink}
          href='https://www.plugngo.co.kr'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className={styles.iconLogo}
            src={Logo}
            alt='Logo'
          />
        </a>
        <p
          style={{
            marginLeft: '28%',
            color: '#fff',
            // border: '1px solid black',
            width: '50%',
          }}
        >
          Privacy policyㆍCookie policy
        </p>
        <p
          style={{
            marginLeft: '18%',
          }}
        >
          Copyright(c) Plug&go 4DPLEX. All rights reserved
        </p>
      </div>

      <div className={styles.dummy}>
        <a href='www.naver.com'>
          <span
            style={{
              color: 'black',
              // textDecorationLine: 'none',
            }}
          >
            Family site
          </span>
        </a>
      </div>
    </div>
  );
};

export default ChargeFooter;
