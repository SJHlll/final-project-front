import React from 'react';
import './Carreviewbody.scss';
import Carreviewlist from './Carreviewlist';
import Carcontentheader from '../Carcontentheader';

const Carreviewbody = () => {
  return (
    <>
      <Carcontentheader category='이용후기' />
      <div className='reviewcontent'>
        <Carreviewlist />
      </div>
    </>
  );
};

export default Carreviewbody;
