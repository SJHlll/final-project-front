import React from 'react';

const ReservedCarSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`admin-select reserve-car ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      ReservedCar
    </div>
  );
};

export default ReservedCarSelect;
