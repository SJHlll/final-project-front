import React, { useEffect, useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import '../scss/SearchList.scss';
import { SearchProvider } from '../contexts/SearchContext';
import OpenBtn from './OpenBtn';

const SearchList = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  // 열림, 닫힘
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const toggleSearchBox = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <SearchProvider>
        <div
          className={`search-list-container ${isVisible ? 'visible' : 'hidden'}`}
        >
          <div className='search-list-content'>
            <ChargeStationSearch />
            <ChargeStationList />
          </div>
        </div>
        <OpenBtn
          toggleSearchBox={toggleSearchBox}
          isSearchBoxVisible={isVisible}
        />
      </SearchProvider>
    </>
  );
};

export default SearchList;
