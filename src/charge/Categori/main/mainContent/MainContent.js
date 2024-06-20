import React from 'react';
import './MainContent.scss';
import backgroundVideo from '../../../assets/mp4/mainpage2.mp4'; // MP4 파일 경로
import Header from '../../../Header/Header';

const MainContent = () => {
  return (
    <div className='main'>
      <div className='video-container'>
        <video
          autoPlay
          loop
          muted
          className='background-video'
        >
          <source src={backgroundVideo} type='video/mp4' />
        </video>
      </div>
      <div className='content'>
        <Header />
        <div className='title'>
          <span className='title1'>Powering Mobility</span>
          <span className='title2'>
            Effortless charging wherever your journey takes
            you.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
