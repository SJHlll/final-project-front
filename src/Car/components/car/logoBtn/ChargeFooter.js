import React from 'react';
import git from '../../../assets/git-logo.png';
import notion from '../../../assets/notion-logo.png';
import erd from '../../../assets/erdcloud-logo.png';
import kakao from '../../../assets/kakao-logo.png';
import instagram from '../../../assets/instagram-logo.png';
// import { useNavigate } from 'react-router-dom';
import './ChargeFooter.scss';

const footer = () => {
  return (
    <div className='charge_footer'>
      <a
        className='git'
        href='https://github.com/mipi1256/final-project-front'
      >
        <img className='git' src={git} />
      </a>
      <a
        className='notion'
        href='https://www.notion.so/5a30e9eb160742deb993c4b2348cec56'
      >
        <img className='notion' src={notion} />
      </a>
      <a
        className='erd'
        href='https://www.erdcloud.com/d/4jamFmW9qknkKssh5'
      >
        <img className='erd' src={erd} />
      </a>
      <a
        className='instagram'
        href='https://www.instagram.com/plug._.o2/'
      >
        <img className='instagram' src={instagram} />
      </a>
      <a
        className='kakao'
        href='https://pf.kakao.com/_xbIPcG'
      >
        <img className='kakao' src={kakao} />
      </a>
    </div>
  );
};

export default footer;
