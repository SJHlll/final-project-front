import React from 'react';
import '../../../scss/Button.scss';

const CancelChargeModal = () => {
  return (
    <>
      <div>예약을 취소하시겠습니까?</div>
      <div className='flex'>
        <button className='public-btn'>예약 취소</button>
        <button className='public-btn'>뒤로 가기</button>
      </div>
    </>
  );
};

export default CancelChargeModal;
