import React, { createContext, useState } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);

  return (
    <StationContext.Provider
      value={{
        stations,
        setStations,
        visibleCount,
        setVisibleCount,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};
