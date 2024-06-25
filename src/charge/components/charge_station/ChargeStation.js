import React from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import SearchList from './SearchList';

import { MapProvider } from '../contexts/MapContext';
import { StationProvider } from '../contexts/StationContext';
import { SearchProvider } from '../contexts/SearchContext';

const ChargeStation = () => {
  return (
    <>
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
    </>
  );
};

export default ChargeStation;
