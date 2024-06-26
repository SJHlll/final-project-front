import React from 'react';
import './Review.scss';
import ReviewPage from './ReviewPage';
const Review = () => {
  return (
    <div className='maincontainer'>
      <div
        className='contentline'
        style={{
          fontSize: '100px',
        }}
      >
        <ReviewPage />
      </div>
    </div>
  );
};

export default Review;
