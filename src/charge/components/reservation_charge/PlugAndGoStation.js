import React from 'react';

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
    <div style={{ float: 'right' }}>
      <div>{Name}</div>
      <div>{Address}</div>
      <div>{Speed}</div>
      <div>{Type}</div>
    </div>
  );
};

export default PlugAndGoStation;
