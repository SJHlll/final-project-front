import React from 'react';
import styled from 'styled-components';

const MapInfo = ({ m }) => {
  return (
    <MapWrapper>
      <MapHeader>
        ({m.speed}) {m.stationName}
      </MapHeader>
      <hr />
      <MapBody>
        <div>규격 : {m.chargerType}</div>
        <div>가격 : {m.chargingPrice}원 (1kWh)</div>
      </MapBody>
    </MapWrapper>
  );
};

export default MapInfo;

const MapWrapper = styled.div`
  padding: 10px;
  width: 250px;
`;

const MapHeader = styled.div`
  font-size: 1.1rem;
`;

const MapBody = styled.div`
  font-size: 0.85rem;
`;
