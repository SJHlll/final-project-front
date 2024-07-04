import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';

const Error = () => {
  const navigate = useNavigate();

  const mainUrl = () => {
    navigate('/');
  };

  const returnUrl = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className={styles.errorpage}
        style={{
          fontSize: 30,
          color: 'black',
        }}
      >
        잘못된 URL입니다
        <div className={styles.chun}></div>
        <button
          style={{
            width: 300,
            height: 300,
          }}
          onClick={mainUrl}
        >
          메인 페이지로
        </button>
        <button
          style={{
            width: 300,
            height: 300,
          }}
          onClick={returnUrl}
        >
          이전 페이지로
        </button>
      </div>
      ;
    </>
  );
};

export default Error;
