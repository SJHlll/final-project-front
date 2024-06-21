import React from 'react';
import './Testheader.scss';
import { useNavigate } from 'react-router-dom';

const Testheader = () => {
  const navigate = useNavigate();
  const onclick = () => {
    navigate('/');
  };
  const click = () => {
    navigate('/Login');
  };
  return (
    <div className='Testheader'>
      <div className='logo' onClick={onclick} />
      {/* 탭형식의 메뉴 구성으로 로고에 홈 url이 안먹음 */}
      <button
        className='loginbtn'
        onClick={click}
        style={{ width: 100, height: 100 }}
      >
        로그인
      </button>
    </div>
  );
};

export default Testheader;
