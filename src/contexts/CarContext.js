import React, { createContext, useState } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [rentCar, setRentCar] = useState([]); // 차 목록을 보여주는 곳 (스위퍼)
  const [selectedCar, setSelectedCar] = useState(null); // 클릭된 차의 정보를 저장하는 곳

  return (
    <CarContext.Provider
      value={{
        rentCar,
        setRentCar,
        selectedCar,
        setSelectedCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
