import React from 'react';

const ReservedCarSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`admin-select reserve-car ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      예약된 렌트카
    </div>
  );
};

export default ReservedCarSelect;
