import React from 'react';
import KakaoMap from '../kakaomap/KakaoMap';
import SearchList from './SearchList';
import Header from '../../../Car/components/Header/Header';
import { MapProvider } from '../contexts/MapContext';
import { Button } from 'reactstrap';

const ChargeStation = () => {
  return (
    <>
      <Header />
      <MapProvider>
        <div style={{ position: 'relative' }}>
          <KakaoMap /* 카카오지도 */ />
          {/* 에약창 이동하기, 아직 미구현 */}
          <Button
            type='submit'
            variant='contained'
            style={{
              background: '#A9F5F2',
              width: '250px',
              height: '50px',
              zIndex: '1',
              fontSize: '1.15rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'absolute',
              right: '-1px',
              bottom: '1px',
            }}
          >
            Plug & Go 충전소 예약하기
          </Button>
          <SearchList />
        </div>
      </MapProvider>
      {/* <Footer /> 굳이 푸터를 안넣어도 될듯 */}
    </>
  );
};

export default ChargeStation;
