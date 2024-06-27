import React from 'react';
import ReservationCharge from '../../../../charge/components/reservation_charge/ReservationCharge';
import './Chargereservation.scss';
import Frame from '../Frame';
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
