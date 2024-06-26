import React from 'react';
import '../scss/ReservationCharge.scss';
import ReservationList from './ReservationList';
import { StationProvider } from '../contexts/StationContext';

const ReservationCharge = () => {
  return (
    <>
      <StationProvider>
        <ReservationList />
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
