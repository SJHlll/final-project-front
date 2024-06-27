import React, { useState } from 'react';
import '../scss/SmallScreen.scss';
import QuickMarker from '../assets/img/marker-quick.png';
import SlowMarker from '../assets/img/marker-slow.png';
import DisableMarker from '../assets/img/marker-disable.png';

const SmallScreen = ({ onToggle, filter }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle('disable');
  };

  return (
    <div className='small-screen'>
      <span className='marker-list'>
        <img src={QuickMarker} alt='급속' />
        <span>급속</span>
      </span>
      <span className='marker-list'>
        <img src={SlowMarker} alt='완속' />
        <span>완속</span>
      </span>
      <span
        className={`marker-list ${isChecked ? 'active' : 'inactive'}`}
        onClick={handleToggle}
        style={{ cursor: 'pointer' }}
      >
        <img src={DisableMarker} alt='이용자 제한' />
        <span>
          {filter === 'disable'
            ? '이용 제한 충전소 보기'
            : '이용 제한 충전소 숨기기'}
        </span>
        <input
          type='checkbox'
          className='marker-checkbox'
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </span>
    </div>
  );
};

export default SmallScreen;
