import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import KakaoMapModal from './KakaoMapModal';

const KakaoMapMarker = ({ lat, lng }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <MapMarker
        position={{ lat, lng }}
        clickable={true}
        onClick={handleMarkerClick}
      />
      <KakaoMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default KakaoMapMarker;
