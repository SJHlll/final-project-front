import React from 'react';
import Carres from './Carres';
import Frame from '../Frame';
import { CarProvider } from '../../../../contexts/CarContext';

const Carreservation = () => {
  return (
    <CarProvider>
      <Frame>
        <Carres />
      </Frame>
    </CarProvider>
  );
};

export default Carreservation;

// const CarReservationBody = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;
