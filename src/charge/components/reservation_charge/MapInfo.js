import React from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  padding: 10px;
  width: 250px;
`;

const MapInfo = ({ m }) => {
  return (
    <MapWrapper>
      <div>
        ({m.speed}) {m.stationName}
      </div>
      <div></div>
    </MapWrapper>
  );
};

export default MapInfo;
