import React from 'react';
import './Testhome.scss';
// import mainback from '../../assets/mainback.mp4';
import Tabline from './Tabline';

const Testhome = () => {
  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <video className='covervideo' muted autoPlay loop>
            {/* <source src={mainback} type='video/mp4' /> */}
            <strong>
              Your browser does not support the video tag.
            </strong>
          </video>
        </div>
        <Tabline />
      </div>
    </>
  );
};
export default Testhome;
