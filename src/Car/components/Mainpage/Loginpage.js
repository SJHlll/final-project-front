import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.scss';

const Loginpage = () => {
  const navigate = useNavigate();

  const click = () => {
    // 특정 경로로 네비게이션
    navigate('/choose');
  };
  return (
    <>
      <div className='loginpage'>
        <div className='loginbtn'>
          <button className='lgbtn'>Kakao로그인</button>
          <button className='lgbtn'> Naver로그인</button>
          <button className='lgbtn'>Google로그인</button>
          <button className='lgbtn' onClick={click}>
            우선비회원로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
