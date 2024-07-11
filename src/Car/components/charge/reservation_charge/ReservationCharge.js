import React from 'react';

import ReservationList from './ReservationList';
import { StationProvider } from '../../../../contexts/StationContext';
import { SecondMapProvider } from '../../../../contexts/SecondMapContext';

import Frame from '../../Mainpage/Frame';

const ReservationCharge = () => {
  return (
    <>
      <StationProvider>
        <SecondMapProvider>
          <Frame>
            <div
              style={{
                width: '850px',
                marginTop: '15px',
                // padding: '20px 15px 0px 15px',
                textAlign: 'right',
                position: 'relative',
                left: '843px',
                height: '30px',
                backgroundColor: 'lightblue',
                lineHeight: '40px',
                paddingRight: '25px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
              }}
            >
              가격 단위 : 1kWh
            </div>
            <ReservationList />
          </Frame>
        </SecondMapProvider>
      </StationProvider>
    </>
  );
};

export default ReservationCharge;
