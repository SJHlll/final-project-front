import React, { useContext } from 'react';
import styles from './Testheader.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../util/AuthContext';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';
import AdminPage from '../../assets/admin_page.png';
import kakaologo from '../../assets/kakao-logo.png'; // 고정된 이미지 import
import instalogo from '../../assets/instagram-logo.png'; // 기본 유저 이미지 import
import { TabContext } from '../../../contexts/TabContext';

const Testheader = () => {
  const navigate = useNavigate();
  const { activeTab, updateActiveTab } =
    useContext(TabContext);

  // Context에서 인증 정보 가져오기
  const { isLoggedIn, userName, onLogout, role } =
    useContext(AuthContext);

  const handleTabClick = (index, path) => {
    navigate(path === '' ? '/' : path);
    updateActiveTab(index);
  };

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    try {
      await fetch(`${API_BASE_URL}${USER}/logout`, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer ' +
            localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      onLogout();
      navigate('/');
      updateActiveTab(1); // 로그아웃 후 홈 탭으로 설정
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.Testheader}>
      <div
        className={styles.logo}
        onClick={() => handleTabClick(1, '/')}
      />

      <div className={styles.tabline}>
        <button
          className={
            activeTab === 1
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(1, '/')}
        >
          Home
        </button>
        <button
          className={
            activeTab === 2
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(2, '/car/res')}
        >
          전기차 렌트
        </button>
        <button
          className={
            activeTab === 3
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(3, '/charge/list')}
        >
          충전소 보기
        </button>
        <button
          className={
            activeTab === 4
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() =>
            handleTabClick(4, '/charge/reservation')
          }
        >
          충전소 예약
        </button>
        <button
          className={
            activeTab === 5
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(5, '/noti')}
        >
          이용방법
        </button>
        <button
          className={
            activeTab === 6
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(6, '/events')}
        >
          이벤트
        </button>
        <button
          className={
            activeTab === 7
              ? styles.tabliactive
              : styles.tabli
          }
          onClick={() => handleTabClick(7, '/review')}
        >
          이용후기
        </button>
        {isLoggedIn && (
          <button
            className={
              activeTab === 8
                ? styles.tabliactive
                : styles.tabli
            }
            onClick={() => handleTabClick(8, '/mypage')}
          >
            마이페이지
          </button>
        )}
        {!isLoggedIn ? (
          <img
            className={styles.loginbtn}
            onClick={() => {
              handleTabClick(9, '/Login');
            }}
            src='https://plugngo.s3.ap-northeast-2.amazonaws.com/login.png'
          />
        ) : (
          // <button
          //   className={styles.loginbtn}
          //   onClick={logoutHandler}
          // >
          <img
            className={styles.loginbtn}
            onClick={logoutHandler}
            src='https://plugngo.s3.ap-northeast-2.amazonaws.com/logoutDoor.png'
          />
          // </button>
        )}
      </div>
      {isLoggedIn && role === 'ADMIN' ? (
        <img
          src={AdminPage}
          alt='관리자 페이지'
          className={styles.isAdmin}
          onClick={() => handleTabClick(9, '/admin')}
        />
      ) : isLoggedIn ? (
        <div className={styles.userInfoContainer}>
          <span className={styles.isUser}>
            {userName}님, 환영합니다!
          </span>
        </div>
      ) : (
        ''
      )}

      <div
        style={{
          paddingRight: '150px',
          display: 'flex',
        }}
      >
        <div
          className={styles.kakaologo}
          style={{
            marginLeft: '30px',
          }}
        >
          <a
            href='https://pf.kakao.com/_xbIPcG'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={kakaologo} alt='kakaologo' />
          </a>
        </div>
        <div className={styles.instalogo}>
          <a
            href='https://www.instagram.com/plug._.o2/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={instalogo} alt='instalogo' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testheader;
