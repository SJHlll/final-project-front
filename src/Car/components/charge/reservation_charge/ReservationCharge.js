import React from 'react';
import '../scss/ReservationCharge.scss';
import ReservationList from './ReservationList';
import { StationProvider } from '../../../../contexts/StationContext';
import { SecondMapProvider } from '../../../../contexts/SecondMapContext';
import styled from 'styled-components';

const ReservationCharge = () => {
  return (
    <>
      <StationProvider>
        <SecondMapProvider>
          <div className='maincontainer'>
            <div className='contentline'>
              <div
                style={{
                  width: '840px',
                  padding: '20px 15px 0px 15px',
                  textAlign: 'right',
                }}
              >
                가격 단위 : 1kWh
              </div>
              <ReservationList />
            </div>
          </div>
        </SecondMapProvider>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;

const ReserveHeader = styled.div`
  width: 850px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const BigSpan = styled.span`
  font-size: 1.5rem;
`;
