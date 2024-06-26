import React from 'react';
import ChargeStation from '../../../../charge/components/charge_station/ChargeStation';

const Chargelist = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='eventbody'>
          <ChargeStation />
        </div>
      </div>
    </div>
  );
};

export default Chargelist;
