import React from 'react';
import './Mypage.scss';
import MyPageCharge from '../../../charge/components/mypage/MyPageCharge';
import Frame from './Frame';

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
