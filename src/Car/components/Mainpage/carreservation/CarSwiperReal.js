import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules';
import { CarContext } from '../../../../contexts/CarContext';
import styles from './reservation_css/CarSwiper.module.scss';
const CarSwiperReal = ({ setSelectedCar }) => {
  // DB에서 전기차 목록 불러오기
  // rentCar = 전기차 목록 배열
  const { rentCar, setRentCar } = useContext(CarContext); // 전기차 목록

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          'http://localhost:8181/car/res',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // 데이터 형식 확인
        // setRentCar = 백엔드에서 불러온 전기차들 rentCar에 집어넣음
        setRentCar(data.carList || []); // CarListResponseDTO -> private List<CarDetailResponseDTO> carList;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, [setRentCar]);

  // 차 이미지를 클릭시 선택되는 자동차
  const clickCarHandler = (car) => {
    setSelectedCar(car);
    console.log('setSelected car: ', car);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={60}
      slidesPerView={3}
      navigation
      pagination={{
        clickable: true,
      }}
      loop
      autoplay={{ delay: 2000 }}
      className={styles.carswipercontainer}
    >
      {rentCar.map((car, index) => (
        <SwiperSlide
          key={index}
          onClick={() => clickCarHandler(car)}
          className={styles.swiperSlide}
        >
          <img
            src={car.carPicture}
            alt={`Car ${index}`}
            style={{
              width: '100%',
              height: 'auto',
              marginTop: '5%',
            }}
          />
          <div className={styles.swipercarname}>
            {car.carName}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarSwiperReal;
