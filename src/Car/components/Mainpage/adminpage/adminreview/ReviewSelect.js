import React from 'react';

const ReviewSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`admin-select review ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      작성된 리뷰
    </div>
  );
};

export default ReviewSelect;
