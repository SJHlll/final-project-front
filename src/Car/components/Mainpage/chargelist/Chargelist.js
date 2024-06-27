import React from 'react';
import ChargeStation from '../../../../charge/components/charge_station/ChargeStation';
import Frame from '../Frame';

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
