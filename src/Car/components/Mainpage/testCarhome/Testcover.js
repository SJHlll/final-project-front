import React from 'react';
import './Testcover.scss';
import mainback from './mainback.mp4';
const Testcover = () => {
  return (
    <>
      <div className='covertest'>
        <video className='covervideo' muted autoPlay loop>
          <source src={mainback} type='video/mp4' />
          <strong>
            Your browser does not support the video tag.
          </strong>
        </video>
        <div>
          <h1 className='coverheader'>Discovery</h1>
          <p className='covercontent'>
            The warm heart <br />
            of Nordic beauty
          </p>
        </div>
      </div>
    </>
  );
};

export default Testcover;
