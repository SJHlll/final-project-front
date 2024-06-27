import React from 'react';
import Frame from '../Frame';
import ChargeStation from './../../charge/charge_station/ChargeStation';

const Chargelist = () => {
  return (
    <Frame>
      <div className='eventbody'>
        <ChargeStation />
      </div>
    </Frame>
  );
};

export default Chargelist;
