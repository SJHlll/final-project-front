import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import styles from './Testheader.module.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../util/AuthContext';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';

const Testheader = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(1);

  // Context에서 인증 정보 가져오기
  const { isLoggedIn, name, onLogout, role } =
    useContext(AuthContext);

  // 컴포넌트가 마운트될 때 저장된 탭 상태를 로드
  useEffect(() => {
    const savedState = localStorage.getItem('activeTab');
    if (savedState) {
      setState(Number(savedState));
    }
  }, []);

  // 탭 클릭 시 로컬 저장소에 상태 저장하고 페이지 이동
  const handleTabClick = (index, path) => {
    navigate(path === '' ? '/' : path);
    setState(index);
    localStorage.setItem('activeTab', index);
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
      // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트
      onLogout();
      navigate('/'); // 로그아웃 후 홈으로 이동
      setState(1);
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
            state === 1 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(1, '/')}
        >
          Home
        </button>
        <button
          className={
            state === 2 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(2, '/car/res')}
        >
          전기차 렌트
        </button>
        <button
          className={
            state === 3 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(3, '/charge/list')}
        >
          충전소 보기
        </button>
        <button
          className={
            state === 4 ? styles.tabliactive : styles.tabli
          }
          onClick={() =>
            handleTabClick(4, '/charge/reservation')
          }
        >
          충전소 예약
        </button>
        <button
          className={
            state === 5 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(5, '/noti')}
        >
          이용방법
        </button>
        <button
          className={
            state === 6 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(6, '/events')}
        >
          이벤트
        </button>
        <button
          className={
            state === 7 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(7, '/review')}
        >
          이용후기
        </button>
        <button
          className={
            state === 8 ? styles.tabliactive : styles.tabli
          }
          onClick={() => handleTabClick(8, '/mypage')}
        >
          마이페이지 {name}
        </button>
        {!isLoggedIn ? (
          <button
            className={
              state === 9
                ? styles.loginbtn
                : styles.loginbtn
            }
            onClick={() => {
              handleTabClick(9, '/Login');
              setState(9); // 로그인 시 state를 로그인(9)으로 설정
              localStorage.setItem('activeTab', 9); // 로컬 저장소에도 로그인(9) 저장
            }}
          >
            로그인
          </button>
        ) : (
          <button
            className={styles.loginbtn}
            onClick={logoutHandler}
          >
            <p style={{ marginTop: '10px' }}>로그아웃</p>
          </button>
        )}
        {isLoggedIn && role === 'ADMIN' && (
          <button
            className={
              state === 9
                ? styles.tabliactive
                : styles.tabli
            }
            onClick={() => {
              handleTabClick(9, '/admin');
              setState(9); // 관리자 페이지로 이동 시 state를 설정
              localStorage.setItem('activeTab', 9); // 로컬 저장소에도 설정
            }}
          >
            예약 및 리뷰 목록 & 관리
          </button>
        )}
      </div>
    </div>
  );
};

export default Testheader;
