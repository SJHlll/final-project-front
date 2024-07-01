import React from 'react';
import './Mypage.scss';

import Frame from './Frame';
import MyPageCharge from '../charge/mypage/MyPageCharge';
import { ReserveStationProvider } from '../../../contexts/ReserveStationContext';

const Mypage = () => {
  return (
    <>
      <ReserveStationProvider>
        <Frame>
          <MyPageCharge />
        </Frame>
      </ReserveStationProvider>
    </>
  );
};

export default Mypage;
