import React from 'react';
import ReservedCarMap from './ReservedCarMap';

const ReservedCarList = () => {
  return (
    <div className='admin-list reserve-car'>
      <div className='list-header'>
        <div className='res-no'>예약번호</div>
        <div className='res-user-name'>회원명</div>
        <div className='res-station-name'>차종</div>
        <div className='res-station-time'>렌트기간</div>
        <div className='hidden-text'></div>
      </div>
      <ReservedCarMap />
    </div>
  );
};

export default ReservedCarList;
