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
                width: '840px',
                padding: '20px 15px 0px 15px',
                textAlign: 'right',
              }}
            >
              가격 단위 : 1kWh
            </div>
            <ReservationList />
          </div>
        </div>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
