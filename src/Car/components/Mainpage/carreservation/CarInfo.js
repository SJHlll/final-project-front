import React, { useEffect, useState } from 'react';
import './reservation_css/CarInfo.scss';
import { id } from 'date-fns/locale';
import Swiper from 'swiper';
import CarSwiper from './CarSwiperReal';

// Carres.js에서 불러온 rentCar를 집어넣음
const CarInfo = ({ rentCar }) => {
  const [clickCat, setClickCar] = useState(false);
  const [carList, setCarList] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/car/res')
      .then((response) => response.json())
      .then((data) => setCarList(data));
  }, []);

  return (
    <>
      <div className='car-info-container'>
        {/* rentCar(전기차목록)을 map해서 전부 보여줌. car는 car 말고 c 같은거 넣어도 됨. (ex -> c.carName) */}
        {/* CarDetailResponseDTO ->
          private String id;
          private String carName;
          private String carCompany;
          private int maximumPassenger;
          private Year carYear;
          private int carPrice;
          private String carPicture;
          private CarOptions carOptions;
          여기 적힌 값을 그대로 오타 없이 가져와야 함
         */}
        <CarSwiper>
          {rentCar.map((car) => (
            <div key={car.carId}>
              <img
                src='https://plugngo.s3.ap-northeast-2.amazonaws.com/947efdc5-bf6f-43e5-b9d9-ae73076a08c9_chun+(2).png'
                alt='차 이미지'
              ></img>
              <div>차종 : {car.carName}</div>
              <div>제조회사 : {car.carCompany}</div>
              <div>
                탑승인원 : 최대 {car.maximumPassenger}명
              </div>
              <div>연식 : {car.carYear}년</div>
              <div>
                가격 : {car.carPrice}원 (렌트가격아님)
              </div>
              <div>
                {car.carPicture}자동차 사진 칸 (아직
                안들어감)
              </div>
              <div>차량 옵션 : {car.carOptions}</div>
              <div>===================</div>
            </div>
          ))}
        </CarSwiper>
      </div>
    </>
  );
};

export default CarInfo;
