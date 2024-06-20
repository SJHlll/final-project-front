import React from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import SearchList from './SearchList';
import Header from '../../../Car/components/Header/Header';
import { MapProvider } from '../contexts/MapContext';
import { StationProvider } from '../contexts/StationContext';
import { SearchProvider } from '../contexts/SearchContext';

const ChargeStation = () => {
  return (
    <>
      <Header />
      <StationProvider>
        <SearchProvider>
          <MapProvider>
            <div style={{ position: 'relative' }}>
              <KakaoMap /* 카카오지도 */ />
              <SearchList />
            </div>
          </MapProvider>
        </SearchProvider>
      </StationProvider>
      {/* <Footer /> 굳이 푸터를 안넣어도 될듯 */}
    </>
  );
};

export default ChargeStation;
