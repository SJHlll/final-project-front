import React from 'react';
import '../scss/PlugAndGoStation.scss';

const PlugAndGoStation = ({
  Id,
  lat,
  lng,
  StationId,
  Name,
  Address,
  Speed,
  Type,
  Management,
  areaIn,
  Available,
}) => {
  return (
    <div className='station-box'>
      <div>{Name}</div>
      <div>{Address}</div>
      <div>{Speed}</div>
      <div>{Type}</div>
    </div>
  );
};

export default PlugAndGoStation;
