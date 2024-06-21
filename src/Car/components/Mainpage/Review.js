import React from 'react';
import Tabline from './Tabline';
import './Review.scss';
const Review = () => {
  return (
    <div className='maincontainer'>
      <div
        className='contentline'
        style={{
          fontSize: '100px',
        }}
      >
        이용후기
      </div>

      <Tabline />
    </div>
  );
};

export default Review;
