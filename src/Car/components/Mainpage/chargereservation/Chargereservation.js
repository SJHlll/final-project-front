import React from 'react';
import './Chargereservation.module.scss';
import Frame from '../Frame';
import ReservationCharge from '../../charge/reservation_charge/ReservationCharge';
const Chargereservation = () => {
  return (
    <Frame>
      <div className='charegeresbody'>
        <ReservationCharge />
      </div>
    </Frame>
  );
};
export default Chargereservation;
