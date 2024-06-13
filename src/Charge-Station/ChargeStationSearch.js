import React from 'react';
import Area from '../util/Area';
import '../scss/ChargeStationSearch.scss';

const ChargeStationSearch = () => {
  return (
    <>
      <div className='SearchContainer' style={{ position: 'relative' }}>
        <div className='One' style={{ position: 'absolute' }}>
          충전소 검색
        </div>
        <Area />
      </div>
    </>
  );
};

export default ChargeStationSearch;
