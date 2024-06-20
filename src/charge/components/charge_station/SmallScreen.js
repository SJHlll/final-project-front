import React from 'react';
import '../scss/SmallScreen.scss';
import QuickMarker from '../../assets/img/marker-quick.png';
import SlowMarker from '../../assets/img/marker-slow.png';
import DisableMarker from '../../assets/img/marker-disable.png';

const SmallScreen = ({ isSearchBoxVisible }) => {
  return (
    <div
      className={`small-screen ${isSearchBoxVisible ? 'visible' : 'hidden'}`}
    >
      <span>
        <img src={QuickMarker} alt='급속' />
        <span> : 급속</span>
      </span>
      <span>
        <img src={SlowMarker} alt='완속' />
        <span> : 완속</span>
      </span>
      <span>
        <img src={DisableMarker} alt='이용자 제한' />
        <span> : 이용자 제한</span>
      </span>
    </div>
  );
};

export default SmallScreen;
