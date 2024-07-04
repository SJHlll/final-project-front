import React, { createContext, useState } from 'react';

export const TestRcContext = createContext();

export const TestRcProvider = ({ children }) => {
  const [reserveCar, setReserveCar] = useState([]);

  return (
    <TestRcContext.Provider
      value={{ reserveCar, setReserveCar }}
    >
      {children}
    </TestRcContext.Provider>
  );
};
