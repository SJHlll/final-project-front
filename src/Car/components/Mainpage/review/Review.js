import React from 'react';
import './Review.scss';
import ReviewPage from './ReviewPage';
import Frame from '../Frame';
const Review = () => {
  return (
    <Frame>
      <div className='reviewbody'>
        <ReviewPage />
      </div>
    </Frame>
  );
};

export default Review;
