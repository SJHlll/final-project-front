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
            <div>{car.carName}</div> {/* 전기차 이름 */}
            <div>{car.carCompany}</div> {/* 제조회사 */}
            <div>{car.maximumPassenger}</div>{' '}
            {/* 탑승인원 */}
            <div>{car.carYear}</div> {/* 전기차 연식 */}
            <div>{car.carPrice}</div> {/* 전기차 가격 */}
            <div>
              {car.carPicture}자동차 사진 아직 안들어감
            </div>{' '}
            {/* 전기차 사진 */}
            <div>{car.carOptions}</div> {/* 안전/편의 */}
            <div>===================</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CarInfo;
