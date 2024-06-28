import React from 'react';
import './reservation_css/CarInfo.scss';

// Carres.js에서 불러온 rentCar를 집어넣음
const CarInfo = ({ rentCar }) => {
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
        {rentCar.map((car) => (
          <div>
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
              {car.carPicture}자동차 사진 칸 (아직 안들어감)
            </div>
            <div>차량 옵션 : {car.carOptions}</div>
            <div>===================</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CarInfo;
