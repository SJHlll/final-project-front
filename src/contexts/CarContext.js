import React, { createContext, useState } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [rentCar, setRentCar] = useState([]); // 차 목록을 보여주는 곳 (스위퍼)
  const [enterCar, setEnterCar] = useState(null); // 클릭된 차의 정보를 저장하는 곳
  const [carId, setCarId] = useState(''); // 차 아이디 가져오겠음

  return (
    <CarContext.Provider
      value={{
        carId,
        setCarId,
        rentCar,
        setRentCar,
        enterCar,
        setEnterCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
