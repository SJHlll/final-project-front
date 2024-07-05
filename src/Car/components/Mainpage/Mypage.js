import React from 'react';
import Frame from './Frame';
import MyPageBtn from '../charge/mypage/MyPageBtn';
// import MyPageCharge from '../charge/mypage/MyPageCharge';
// import MyPageInfo from '../charge/mypage/MyPageInfo';
// import MyPageRentCar from '../charge/mypage/MyPageRentCar';
// import MyPageReview from '../charge/mypage/MyPageReview';
import backgroundVideo from '../charge/assets/mp4/myPage.mp4';

const Mypage = () => {
  return (
    <>
      <Frame>
        <div
          style={{
            // width: '100%',
            // height: '100%',
            overflow: 'auto',
          }}
        >
          {/* 비디오 배경 */}
          {/* <video
            className='BackgroundVideo'
            autoPlay
            loop
            muted
          >
            <source
              src={backgroundVideo}
              type='video/mp4'
            />
          </video> */}
          {/* <MyPageInfo />
          <MyPageCharge />
          <MyPageRentCar />
          <MyPageReview /> */}
          <MyPageBtn />
        </div>
      </Frame>
    </>
  );
};

export default Mypage;
