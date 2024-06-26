import React, { useEffect, useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import '../scss/SearchList.scss';
import OpenBtn from './OpenBtn';
import SmallScreen from './SmallScreen';

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
      <div
        className={`search-list-container ${isVisible ? 'hidden' : 'visible'}`}
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
      <SmallScreen isSearchBoxVisible={isVisible} />
    </>
  );
};

export default SearchList;
