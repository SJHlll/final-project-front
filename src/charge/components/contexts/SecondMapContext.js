import React, { createContext, useState } from 'react';

export const SecondMapContext = createContext();

export const SecondMapProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] =
    useState(null);
  const [mapLevel, setMapLevel] = useState(13);

  return (
    <SecondMapContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        mapLevel,
        setMapLevel,
      }}
    >
      {children}
    </SecondMapContext.Provider>
  );
};
