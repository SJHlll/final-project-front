import React from 'react';
import ReservationCharge from '../../../../charge/components/reservation_charge/ReservationCharge';
import './Chargereservation.scss';
const Chargereservation = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='charegeresbody'>
          <ReservationCharge />
        </div>
      </div>
    </div>
  );
};
export default Chargereservation;
