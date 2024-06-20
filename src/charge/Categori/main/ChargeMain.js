import React from 'react';
import LodingMotion from '../../../loading/LodingMotion';
import MainContent from './mainContent/MainContent';
import ChargeFooter from '../../footer/ChargeFooter';
import './ChargeMain.scss';
// import Header from '../../Header/Header';

const chargeMain = () => {
  return (
    <div className='chargeapp'>
      <LodingMotion />
      <MainContent />
      <ChargeFooter />
    </div>
  );
};

export default chargeMain;
