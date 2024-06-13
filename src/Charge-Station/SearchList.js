import React from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';

const SearchList = ({ visible }) => {
  return (
    <>
      <div
        style={{
          height: '800px',
          backgroundColor: 'white',
          zIndex: '1',
          display: visible ? 'block' : 'none',
          position: 'absolute',
          top: '0',
          opacity: '0.92',
        }}
      >
        <ChargeStationSearch /* 충전소찾기 */ />
        <ChargeStationList /* 충전소목록 */ />
      </div>
    </>
  );
};

export default SearchList;
