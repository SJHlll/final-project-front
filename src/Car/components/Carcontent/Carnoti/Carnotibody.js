import React from 'react';
import './Carnotibody.scss';
import Carnotilist from './Carnotilist';
import Carcontentheader from '../Carcontentheader';

const Carnotibody = () => {
  return (
    <>
      <Carcontentheader category='이용방법' />
      <div className='noticontent'>
        <Carnotilist />
      </div>
    </>
  );
};

export default Carnotibody;
