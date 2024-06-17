import React from 'react';
import Area from './area/Area';
import '../../scss/ChargeStationSearch.scss';

const ChargeStationSearch = () => {
  return (
    <div className='SearchContainer'>
      <div className='One'>충전소 검색</div>
      <Area />
    </div>
  );
};

export default ChargeStationSearch;
