import React from 'react';
import Frame from './Frame';
import MyPageBtn from '../charge/mypage/MyPageBtn';
import { ReserveStationProvider } from '../../../contexts/ReserveStationContext';
import { TestRvProvider } from './adminpage/adminreview/TestRvContext';

const Mypage = () => {
  return (
    <>
      <ReserveStationProvider>
        <TestRvProvider>
          <Frame>
            <div
              style={{
                overflow: 'auto',
              }}
            >
              <MyPageBtn />
            </div>
          </Frame>
        </TestRvProvider>
      </ReserveStationProvider>
    </>
  );
};

export default Mypage;
