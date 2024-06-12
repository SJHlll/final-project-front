import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';

const KakaoMap = () => {
  return (
    <>
      <Map
        id='map'
        center={{
          lat: 37.552484,
          lng: 126.937641,
        }}
        style={{
          width: '100%',
          height: '945px',
          overflow: 'hidden',
        }}
        level={3}
      >
        <KakaoMapMarker /* 맵 마커 파일 */ />
        <ZoomControl position={'RIGHT'} /* 확대 및 축소 컨트롤러 */ />
      </Map>
    </>
  );
};

export default KakaoMap;
