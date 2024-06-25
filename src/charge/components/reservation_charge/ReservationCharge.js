import React from 'react';
import '../scss/ReservationCharge.scss';
import ReservationList from './ReservationList';
import Header from '../../Header/Chargeheader';
import { StationProvider } from '../contexts/StationContext';

const ReservationCharge = () => {
  return (
    <>
      <Header />
      <StationProvider>
        <ReservationList />
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
