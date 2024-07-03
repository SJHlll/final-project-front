import React from 'react';
import ReviewMap from './ReviewMap';

const ReviewList = () => {
  return (
    <div className='admin-list review'>
      <div className='list-header'>
        <div className='res-no'>예약번호</div>
        <div className='res-user-name'>회원명</div>
        <div className='res-station-name'>리뷰내용</div>
        <div className='res-station-time'>작성날짜</div>
        <div className='hidden-text'></div>
      </div>
      <ReviewMap />
    </div>
  );
};

export default ReviewList;
