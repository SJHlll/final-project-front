import React, { createContext, useState } from 'react';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [rentCar, setRentCar] = useState([]);

  return (
    <CarContext.Provider
      value={{
        rentCar,
        setRentCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
