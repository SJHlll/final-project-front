import React from 'react';
import './Noti.scss';
import Notilist from './Notilist';

const Noti = () => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='notiline'>
          <Notilist />
          <button className='createnotilist'>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Noti;
