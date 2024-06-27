import React from 'react';
import './Testhome.scss';

const Testhome = () => {
  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <video
            className='covervideo'
            muted
            autoPlay
            loop
            src={
              'https://plugngo.s3.ap-northeast-2.amazonaws.com/mainback.mp4'
            }
            type='video/mp4'
          >
            <strong>
              Your browser does not support the video tag.
            </strong>
          </video>
        </div>
        <div className='coverheader'>
          <h1 className='covercon'>나도 여행가고싶다</h1>
          <p className='covercontent'>
            I want to go
            <br /> on a trip
          </p>
        </div>
      </div>
    </>
  );
};
export default Testhome;
