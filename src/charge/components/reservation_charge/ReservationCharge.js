import React from 'react';
import '../scss/ReservationCharge.scss';
import ReservationList from './ReservationList';

import { StationProvider } from '../contexts/StationContext';

const ReservationCharge = () => {
  return (
    <>
      <StationProvider>
        <div className='maincontainer'>
          <div className='contentline'>
            <div
              style={{
                textAlign: 'right',
                padding: '20px',
              }}
            >
              단위 : 1kWh
            </div>
            <ReservationList />
          </div>
        </div>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
