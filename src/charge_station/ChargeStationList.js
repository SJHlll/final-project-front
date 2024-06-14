import React from 'react';
import Station from './Station';
import '../scss/ChargeStationList.scss';
import { areas } from './areas';

const ChargeStationList = () => {
  const stations = areas;

  return (
    <div className='ListContainer'>
      {stations.map((station, index) => (
        <Station
          key={index}
          id={station.id}
          lat={station.lat}
          lng={station.lng}
          StationName={station.StationName}
          StationAddress={station.StationAddress}
          AC={station.AC}
          DC={station.DC}
          index={index}
        />
      ))}
    </div>
  );
};

export default ChargeStationList;
