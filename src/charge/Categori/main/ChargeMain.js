import React from 'react';
import LodingMotion from '../../../loading/LodingMotion';
import MainContent from './mainContent/MainContent';
import ChargeFooter from '../../footer/ChargeFooter';
// import Header from '../../Header/Header';

const chargeMain = () => {
  return (
    <div>
      <LodingMotion />
      <MainContent />
      <ChargeFooter />
    </div>
  );
};

export default chargeMain;
