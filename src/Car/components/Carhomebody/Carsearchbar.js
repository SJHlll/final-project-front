import React from 'react';
import './Carsearchbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Carsearchbar = () => {
  return (
    <>
      <div className='carsearchbar'>
        <div className='searchdate'>대여일시</div>
        <FontAwesomeIcon
          classname='faright'
          icon={faArrowRight}
          size='2x'
        />
        <div className='searchtime'>반납일자</div>
        <button className='searchbarbtn'>검색하기</button>
      </div>
    </>
  );
};

export default Carsearchbar;
