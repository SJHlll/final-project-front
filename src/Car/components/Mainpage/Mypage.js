import React from 'react';
import './Mypage.scss';

import Frame from './Frame';
import MyPageCharge from '../charge/mypage/MyPageCharge';

const Mypage = () => {
  return (
    <>
      <Frame>
        <MyPageCharge />
      </Frame>
    </>
  );
};

export default Mypage;
