import { TextField } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Modal, ModalBody } from 'reactstrap';

const MyPageRentCar = () => {
  const [updateRentCar, setUpdateRentCar] = useState(false);

  const toggle = () => setUpdateRentCar(!updateRentCar);

  // 렌트카 예약 수정하기 모달창 활성화
  const ModalOpen = () => (
    <Modal isOpen={updateRentCar} toggle={toggle}>
      <ModalBody></ModalBody>
    </Modal>
  );

  return (
    <div className='reservation-list'>
      <h3 style={{ textAlign: 'center' }}>
        렌트카 예약현황
      </h3>
      <div className='flex'>
        <div className='value'>예약번호</div>
        <div>123456</div>
      </div>
      <div className='flex'>
        <div className='value'>차 이름</div>
        <div>차 이름</div>
      </div>
      <div className='flex'>
        <div className='value'>예약 날짜/시간</div>
        <DatePicker
          className='read-only-date'
          selected={new Date()}
          showTimeSelect
          dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
          readOnly
        />
      </div>
      <div
        className='flex'
        style={{ height: 'fit-content' }}
      >
        <div className='value'>비고</div>
        <TextField
          id='outlined-multiline-static'
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
          style={{ width: '300px', overflow: 'auto' }}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button className='public-btn' onClick={toggle}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default MyPageRentCar;
