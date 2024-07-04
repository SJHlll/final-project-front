import { TextField } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Modal, ModalBody } from 'reactstrap';
import styles from '../scss/MyPageCharge.module.scss';
import style from '../../../../scss/Button.module.scss';
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
    <div className={styles.reservationList}>
      <h3 style={{ textAlign: 'center' }}>
        렌트카 예약현황
      </h3>
      <div className={styles.flex}>
        <div className='value'>예약번호</div>
        <div>123456</div>
      </div>
      <div className={styles.flex}>
        <div className='value'>차 이름</div>
        <div>차 이름</div>
      </div>
      <div className={styles.flex}>
        <div className='value'>예약 날짜/시간</div>
        <DatePicker
          className={styles.readOnlyDate}
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
          id={styles.outlinedMultilineStatic}
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
          style={{ width: '300px', overflow: 'auto' }}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button
          className={style.publicBtn}
          onClick={toggle}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default MyPageRentCar;
