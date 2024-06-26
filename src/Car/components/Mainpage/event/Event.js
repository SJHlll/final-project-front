import React from 'react';
import './Event.scss';
import Eventlist from './Eventlist';

const Event = () => {
  return (
    <div className='maincontainer'>
      <div
        className='contentline'
        style={{
          fontSize: '30px',
        }}
      >
        <div className='eventbody'>
          <Eventlist />
        </div>
      </div>
    </div>
  );
};

export default Event;
