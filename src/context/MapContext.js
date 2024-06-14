// src/context/MapContext.js
import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [mapLevel, setMapLevel] = useState(4); // 기본 맵 레벨 (1 ~ 15)

  return (
    <MapContext.Provider
      value={{
        selectedStation,
        setSelectedStation,
        selectedMarkerIndex,
        setSelectedMarkerIndex,
        mapLevel,
        setMapLevel,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
