import React from 'react';
import './Event.scss';
import Eventlist from './Eventlist';

const Event = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='eventbody'>
          <Eventlist />
        </div>
        <button className='public-btn event-button'>
          추가
        </button>
        <button className='public-btn event-button'>
          수정
        </button>
        <button className='public-btn event-button'>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Event;
