import React from 'react';
import ChargeStation from '../../../charge/components/charge_station/ChargeStation';

const Chargelist = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <ChargeStation />
      </div>

      {/* <Tabline /> */}
    </div>
  );
};

export default Chargelist;
