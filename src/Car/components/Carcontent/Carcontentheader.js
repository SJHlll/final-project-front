import React from 'react';
import './Carcontentheader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carcontentheader = ({ category }) => {
  return (
    <>
      <div className='carcontentheaderbody'>
        <div className='contenthdtitle'>
          <span className='contenthdmain'>{category}</span>
          <span className='contenthdsub'>
            <span className=''>Home</span>

            <FontAwesomeIcon icon={faChevronRight} />
            <span className=''>커뮤니티</span>

            <FontAwesomeIcon icon={faChevronRight} />
            <span className=''>{category}</span>
          </span>
        </div>
      </div>
    </>
  );
};
export default Carcontentheader;
