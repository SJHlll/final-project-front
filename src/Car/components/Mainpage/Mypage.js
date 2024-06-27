import React from 'react';
import './Mypage.scss';
import MyPageCharge from '../charge/mypage/MyPageCharge';

const Mypage = () => {
  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <MyPageCharge />
        </div>
      </div>
    </>
  );
};

export default Mypage;
