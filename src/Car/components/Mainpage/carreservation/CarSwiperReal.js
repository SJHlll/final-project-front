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
  const { rentCar, setRentCar } = useContext(CarContext);

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
        setRentCar(data.carList || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, [setRentCar]);

  const clickCarHandler = (car) => {
    setSelectedCar(car);
    console.log('setSelected car: ', car);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={1}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      loop={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className={styles.carswipercontainer}
      onAutoplayStart={() =>
        console.log('Autoplay started')
      }
      onAutoplayStop={() => console.log('Autoplay stop')}
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
              width: '70%',
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
