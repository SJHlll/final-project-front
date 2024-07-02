import React from 'react';
import './Mypage.scss';

import Frame from './Frame';
import MyPageCharge from '../charge/mypage/MyPageCharge';
import { ReserveStationProvider } from '../../../contexts/ReserveStationContext';
import MyPageInfo from '../charge/mypage/MyPageInfo';
import MyPageRentCar from '../charge/mypage/MyPageRentCar';
import MyPageReview from '../charge/mypage/MyPageReview';

const Mypage = () => {
  return (
    <>
      <ReserveStationProvider>
        <Frame>
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <MyPageInfo />
            <MyPageCharge />
            <MyPageRentCar />
            <MyPageReview />
          </div>
        </Frame>
      </ReserveStationProvider>
    </>
  );
};

export default Mypage;
