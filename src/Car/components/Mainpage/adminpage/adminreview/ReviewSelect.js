import React from 'react';

const ReviewSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`admin-select review ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      Review
    </div>
  );
};

export default ReviewSelect;
