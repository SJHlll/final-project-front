import React from 'react';
import Frame from './Frame';
import MyPageBtn from '../charge/mypage/MyPageBtn';
import { ReserveStationProvider } from '../../../contexts/ReserveStationContext';
import { TestRvProvider } from './adminpage/adminreview/TestRvContext';
import styles from './Mypage.module.scss';
const Mypage = () => {
  return (
    <>
      <ReserveStationProvider>
        <TestRvProvider>
          <Frame>
            <div className={styles.videoContainer}>
              <video
                src='https://plugngo.s3.ap-northeast-2.amazonaws.com/myPage+(1).mp4'
                autoPlay
                loop
                muted
                style={{
                  opacity: '0.8',
                }}
              />
              <MyPageBtn />
            </div>
          </Frame>
        </TestRvProvider>
      </ReserveStationProvider>
    </>
  );
};

export default Mypage;
