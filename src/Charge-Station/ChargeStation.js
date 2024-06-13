import React, { useState } from 'react';
import KakaoMap from '../KakaoMap/KakaoMap';
import Btn from './Btn';
import SearchList from './SearchList';

const ChargeStation = () => {
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);

  // 검색창, 목록 열고 닫기 함수
  const toggleSearchBox = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <KakaoMap /* 카카오지도 */ />
        <Btn
          toggleSearchBox={toggleSearchBox}
          isSearchBoxVisible={isSearchBoxVisible} /* 버튼 */
        />
        <SearchList visible={isSearchBoxVisible} /* 검색, 리스트 */ />
      </div>
    </>
  );
};

export default ChargeStation;
