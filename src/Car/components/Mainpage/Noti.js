import React from 'react';
import Tabline from './Tabline';
import './Noti.scss';
const Noti = () => {
  return (
    <div className='maincontainer'>
      <div
        className='contentline'
        style={{
          fontSize: '100px',
        }}
      >
        이용방법
      </div>

      <Tabline />
    </div>
  );
};

export default Noti;
