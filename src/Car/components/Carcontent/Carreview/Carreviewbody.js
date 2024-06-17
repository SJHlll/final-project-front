import React from 'react';
import './Carreviewbody.scss';
import Carreviewlist from './Carreviewtlist';
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
