import React, { createContext, useState } from 'react';

export const ReserveStationContext = createContext();

export const ReserveStationProvider = ({ children }) => {
  const [reserveStation, setReserveStation] = useState([]);

  return (
    <ReserveStationContext.Provider
      value={{
        reserveStation,
        setReserveStation,
      }}
    >
      {children}
    </ReserveStationContext.Provider>
  );
};
