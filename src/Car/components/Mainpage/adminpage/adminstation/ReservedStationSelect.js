import React from 'react';

const ReservedStationSelect = ({ onClick, isSelected }) => {
  return (
    <div
      className='admin-select reserve-station'
      onClick={onClick}
    >
      예약된 충전소
    </div>
  );
};

export default ReservedStationSelect;
