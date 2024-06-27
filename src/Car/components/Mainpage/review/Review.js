import React from 'react';
import './Review.scss';
import ReviewPage from './ReviewPage';
const Review = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='reviewbody'>
          <ReviewPage />
        </div>
      </div>
    </div>
  );
};

export default Review;
