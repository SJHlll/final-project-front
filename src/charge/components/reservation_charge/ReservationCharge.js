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
                padding: '20px',
              }}
            >
              가격단위 : 1kWh
            </div>
            <ReservationList />
          </div>
        </div>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
