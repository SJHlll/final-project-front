import React from 'react';
import './Testreservation.scss';
import { Button } from 'reactstrap';

const Testreservation = () => {
  return (
    <>
      <div className='testres'>
        <div>
          <h1 className='resheader'>To Do</h1>
          <p className='rescontent'>
            Close Encounters <br /> with nature
          </p>
        </div>
        <Button className='resbtn'>예약하기</Button>
      </div>
      ;
    </>
  );
};

export default Testreservation;
