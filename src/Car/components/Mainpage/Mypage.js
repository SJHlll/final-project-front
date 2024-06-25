import React from 'react';
import Tabline from './Tabline';
import './Mypage.scss';
import MyPageCharge from '../../../charge/components/mypage/MyPageCharge';

const Mypage = () => {
  return (
    <>
      <div className='maincontainer'>
        <div
          className='contentline'
          style={{
            fontSize: '100px',
          }}
        >
          마이페이지
        </div>

        <Tabline />
      </div>
      <MyPageCharge />
    </>
  );
};

export default Mypage;
