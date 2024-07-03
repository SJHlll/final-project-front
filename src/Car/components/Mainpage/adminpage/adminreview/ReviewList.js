import React from 'react';

const ReviewList = () => {
  return (
    <div className='admin-list review'>
      <div className='list-header'>
        <div className='res-no'>예약번호</div>
        <div className='res-user-name'>회원명</div>
        <div className='res-station-name'>충전소</div>
        <div className='res-station-time'>충전기간</div>
        <div className='hidden-text'></div>
      </div>
    </div>
  );
};

export default ReviewList;
