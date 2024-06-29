import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';

import './reservation_css/CarResSwiper.scss';

import Logo from '../../../assets/Logo.png'; // 기본 이미지
import EventBanner1 from '../../../assets/eventbanner1.png'; // 추가 이미지
import NewLogo from '../../../assets/newlogo.png'; // 세 번째 슬라이드 이미지

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Rent = () => {
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(null);

  // 이미지 클릭 시 선택된 이미지 설정
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  // 이미지 닫기 버튼 클릭 시 선택된 이미지 해제
  const handleCloseImage = () => {
    setSelectedImageIndex(null);
  };

  // 슬라이드들을 맵핑하여 SwiperSlide로 반환
  const slides = Array.from({ length: 10 }).map(
    (_, index) => (
      <SwiperSlide key={index}>
        <div className='rent-slide'>
          {index === selectedImageIndex ? (
            // 선택된 이미지
            <img
              src={
                index === 1
                  ? EventBanner1
                  : index === 2
                    ? NewLogo
                    : Logo
              }
              alt={`Slide ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          ) : (
            // 기본 이미지 (슬라이드 버튼 옆에 보여질 이미지)
            <img
              src={
                index === 1
                  ? EventBanner1
                  : index === 2
                    ? NewLogo
                    : Logo
              }
              alt={`Slide ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
          )}
        </div>
      </SwiperSlide>
    ),
  );

  return (
    <div className='rent-slider'>
      {/* Swiper 컴포넌트 */}
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 2000 }} // 자동 슬라이딩 설정 (2초)
      >
        {slides}
      </Swiper>

      {/* 선택된 이미지가 있을 경우, 이미지를 보여줄 컨테이너 */}
      {selectedImageIndex !== null && (
        <div className='selected-image-container'>
          {/* 선택된 이미지 */}
          <img
            src={
              selectedImageIndex === 1
                ? EventBanner1
                : selectedImageIndex === 2
                  ? NewLogo
                  : Logo
            }
            alt='Selected Slide'
            className='selected-image'
          />

          {/* 이미지 닫기 버튼 */}
          <button
            className='close-button'
            onClick={handleCloseImage}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Rent;
