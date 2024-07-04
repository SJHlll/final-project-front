import React, { useEffect, useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import styles from '../scss/SearchList.module.scss';
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

  // // ESC 닫기 (작동됨, 주석처리)
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Escape') {
  //       setIsVisible(false);
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener(
  //       'keydown',
  //       handleKeyDown,
  //     );
  //   };
  // }, []);

  return (
    <>
      <div
        className={`${styles.searchListContainer} ${isVisible ? styles.hidden : styles.visible}`}
      >
        <div className={styles.searchListContent}>
          <ChargeStationSearch />
          <ChargeStationList />
        </div>
      </div>
      <OpenBtn
        toggleSearchBox={toggleSearchBox}
        isSearchBoxVisible={isVisible}
      />
    </>
  );
};

export default SearchList;
