import React from 'react';
import './Mypage.scss';

import Frame from './Frame';
import MyPageCharge from '../charge/mypage/MyPageCharge';
import MyPageInfo from '../charge/mypage/MyPageInfo';

const Mypage = () => {
  return (
    <>
      <Frame>
        <MyPageInfo />
        <MyPageCharge />
      </Frame>
    </>
  );
};

export default Mypage;
