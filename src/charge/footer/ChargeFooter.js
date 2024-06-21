import React from 'react';
import git from '../assets/img/git-logo.png';
import notion from '../assets/img/notion-logo.png';
import erd from '../assets/img/erdcloud-logo.png';
import kakao from '../assets/img/talklogo.png';
import { useNavigate } from 'react-router-dom';
import './ChargeFooter.scss';

const footer = () => {
  const navigate = useNavigate();

  const click = (text) => {
    navigate(text);
  };
  return (
    <div className='charge_footer'>
      <a
        className='git'
        href='https://github.com/mipi1256/final-project-front'
      >
        <img
          className='git'
          src={git}
          onClick={() => click('/charge/git/')}
        />
      </a>
      <a
        className='notion'
        href='https://www.notion.so/5a30e9eb160742deb993c4b2348cec56'
      >
        <img
          className='notion'
          src={notion}
          onClick={() => click('/charge/git/')}
        />
      </a>
      <a
        className='erd'
        href='https://www.erdcloud.com/d/4jamFmW9qknkKssh5'
      >
        <img
          className='erd'
          src={erd}
          onClick={() => click('/charge/git/')}
        />
      </a>
      <a
        className='kakao'
        href='https://pf.kakao.com/_xbIPcG'
      >
        <img
          className='kakao'
          src={kakao}
          onClick={() => click('/charge/git/')}
        />
      </a>
    </div>
  );
};

export default footer;
