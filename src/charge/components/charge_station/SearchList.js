import React, { useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import '../../scss/SearchList.scss';
import { SearchProvider } from './contexts/SearchContext';

const SearchList = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  // 열림, 닫힘
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

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
      </SearchProvider>
    </>
  );
};

export default SearchList;
