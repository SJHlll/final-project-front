import React from 'react';
import './Header.scss';
import image from '../../assets/Logo.png';
import talklogo from '../../assets/talklogo.png';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const click = (text) => {
    navigate(text);
  };

  return (
    <div className='Header'>
      <div className='topline'>
        <img
          className='mypage'
          src={avatar}
          onClick={() => click('/mypage')}
        ></img>
        <a
          className='talklogo'
          href='https://pf.kakao.com/_xbIPcG'
        >
          <img className='kakaologo' src={talklogo}></img>
        </a>
      </div>
      <div className='bottomline'>
        <img
          className='Logo'
          src={image}
          onClick={() => click('/car/home/')}
        />
        <div
          className='button'
          onClick={() => click('/car/res')}
        >
          예약하기
        </div>
        <div
          className='button'
          onClick={() => click('/car/noti')}
        >
          이용방법
        </div>
        <div
          className='button'
          onClick={() => click('/car/event')}
        >
          이벤트
        </div>
        <div
          className='button'
          onClick={() => click('/car/review')}
        >
          이용후기
        </div>
      </div>
    </div>
  );
};

export default Header;
