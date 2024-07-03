import React from 'react';

const ReviewSelect = ({ onClick }) => {
  return (
    <div className='admin-select review' onClick={onClick}>
      작성된 리뷰
    </div>
  );
};

export default ReviewSelect;
