import React from 'react';
import { Button } from 'reactstrap';

const ReservationBtn = () => {
  return (
    <Button
      type='submit'
      variant='contained'
      style={{
        background: '#A9F5F2',
        width: '250px',
        height: '50px',
        fontSize: '1.15rem',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      Plug & Go 충전소 예약하기
    </Button>
  );
};

export default ReservationBtn;
