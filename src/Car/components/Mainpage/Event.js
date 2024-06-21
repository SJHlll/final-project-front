import React from 'react';
import Tabline from './Tabline';
import './Event.scss';
const Event = () => {
  return (
    <div className='maincontainer'>
      <div
        className='contentline'
        style={{
          fontSize: '100px',
        }}
      >
        이벤트
      </div>

      <Tabline />
    </div>
  );
};

export default Event;
