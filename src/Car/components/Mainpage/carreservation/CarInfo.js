import React from 'react';
import './reservation_css/CarInfo.scss';

const CarInfo = ({ rentCar }) => {
  return (
    <>
      <div className='car-info-container'>ㅎㅇ</div>
      {rentCar.map((car) => (
        <div>
          {/* <div>{car.id}</div> 전기차 고유 id */}
          <div>{car.carName}</div> {/* 전기차 이름 */}
          <div>{car.carCompany}</div> {/* 제조회사 */}
          <div>{car.maximumPassenger}</div> {/* 탑승인원 */}
          <div>{car.carYear}</div> {/* 전기차 연식 */}
          <div>{car.carPrice}</div> {/* 전기차 가격 */}
          <div>
            {car.carPicture}자동차 사진 아직 안들어감
          </div>{' '}
          {/* 전기차 사진 */}
          <div>{car.carOptions}</div> {/* 안전/편의 */}
        </div>
      ))}
    </>
  );
};

export default CarInfo;
