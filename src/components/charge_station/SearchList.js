import React, { useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import '../../scss/SearchList.scss';

const SearchList = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  // 열림, 닫힘
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <>
      <div
        className={`search-list-container ${isVisible ? 'visible' : 'hidden'}`}
      >
        <div className='search-list-content'>
          <ChargeStationSearch />
          <ChargeStationList />
        </div>
      </div>
    </>
  );
};

export default SearchList;
