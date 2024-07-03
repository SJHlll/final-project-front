import React from 'react';

const ReservedStationSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className={`admin-select reserve-station ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      ReservedStation
    </div>
  );
};

export default ReservedStationSelect;
