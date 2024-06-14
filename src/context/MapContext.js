// src/context/MapContext.js
import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  return (
    <MapContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        selectedMarkerIndex,
        setSelectedMarkerIndex,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
