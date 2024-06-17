import React from 'react';
import './Careventbody.scss';
import Careventlist from './Careventlist';
import Carcontentheader from '../Carcontentheader';

const Careventbody = () => {
  return (
    <>
      <Carcontentheader category='이벤트' />
      <div className='eventcontent'>
        <Careventlist />
      </div>
    </>
  );
};

export default Careventbody;
