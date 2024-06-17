import React, { useContext } from 'react';
import Station from './Station';
import '../../scss/ChargeStationList.scss';
import { areas } from './areas';
import { SearchContext } from '../contexts/SearchContext';

const ChargeStationList = () => {
  const { searchConditions } = useContext(SearchContext);
  const { selectedArea, selectedSubArea, facilitySearch } = searchConditions;

  const filteredStations = areas.filter((station) => {
    const isAreaMatch = selectedArea
      ? station.StationAddress.includes(selectedArea)
      : true;
    const isSubAreaMatch = selectedSubArea
      ? station.StationAddress.includes(selectedSubArea)
      : true;
    const isFacilityMatch = facilitySearch
      ? station.StationName.includes(facilitySearch)
      : true;
    return isAreaMatch && isSubAreaMatch && isFacilityMatch;
  });

  return (
    <div className='ListContainer'>
      {filteredStations.map((station, index) => (
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
