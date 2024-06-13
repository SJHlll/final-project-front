import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';

const KakaoMap = () => {
  return (
    <>
      <Map
        id='map'
        center={{
          lat: 37.552484, // 맨 처음 보여줄 위도
          lng: 126.937641, // 맨 처음 보여줄 경도
        }}
        style={{
          width: '1280px',
          height: '800px',
        }}
        level={5} // 맨 처음 확대 및 축소 정도 (1 ~ 15)
      >
        <KakaoMapMarker /* 맵 마커 js */ />
        <ZoomControl position={'RIGHT'} /* 확대 및 축소 컨트롤러 */ />
      </Map>
    </>
  );
};

export default KakaoMap;
