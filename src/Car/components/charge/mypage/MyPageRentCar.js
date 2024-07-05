import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import { Modal, ModalBody } from 'reactstrap';
import styles from './MyPageBtn.scss';
import style from '../../../../scss/Button.module.scss';

const MyPageRentCar = () => {
  const [updateRentCar, setUpdateRentCar] = useState(false);
  const [rentCarData, setRentCarData] = useState([
    {
      id: 1,
      reservationNumber: '123456',
      carName: '차 이름 1',
      date: new Date(),
      note: '비고 1',
    },
    {
      id: 2,
      reservationNumber: '234567',
      carName: '차 이름 2',
      date: new Date(),
      note: '비고 2',
    },
    {
      id: 3,
      reservationNumber: '345678',
      carName: '차 이름 3',
      date: new Date(),
      note: '비고 3',
    },
    {
      id: 4,
      reservationNumber: '456789',
      carName: '차 이름 4',
      date: new Date(),
      note: '비고 4',
    },
    {
      id: 5,
      reservationNumber: '567890',
      carName: '차 이름 5',
      date: new Date(),
      note: '비고 5',
    },
  ]);
  const [selectedReservation, setSelectedReservation] =
    useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] =
    useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleConfirmDelete = () =>
    setIsConfirmDelete(!isConfirmDelete);

  const handleDelete = (id) => {
    setSelectedReservation(id);
    toggleConfirmDelete();
  };

  const confirmDelete = () => {
    setRentCarData(
      rentCarData.filter(
        (item) => item.id !== selectedReservation,
      ),
    );
    setSelectedReservation(null);
    toggleConfirmDelete();
  };

  return (
    <div className={styles.reservationList}>
      <h3 style={{ textAlign: 'center' }}>
        렌트카 예약현황
      </h3>
      {rentCarData.length === 0 ? (
        <div>예약이 없습니다.</div>
      ) : (
        rentCarData.map((item) => (
          <div key={item.id} className={styles.flex}>
            <div className={styles.value}>예약번호</div>
            <div>{item.reservationNumber}</div>
            <div className={styles.value}>차 이름</div>
            <div>{item.carName}</div>
            <div className={styles.value}>
              예약 날짜/시간
            </div>
            <DatePicker
              className={styles.readOnlyDate}
              selected={item.date}
              showTimeSelect
              dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
              readOnly
            />
            <div
              className={styles.flex}
              style={{ height: 'fit-content' }}
            >
              <div className={styles.value}>비고</div>
              <TextField
                id={styles.outlinedMultilineStatic}
                multiline
                rows={4}
                value={item.note}
                InputProps={{ readOnly: true }}
                style={{ width: '300px', overflow: 'auto' }}
              />
            </div>
            <div
              style={{ width: '100%', textAlign: 'center' }}
            >
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
      {/* 모달창 */}
      {modalOpen && (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalBody>
            <div style={{ fontFamily: 'font2' }}>
              {/* 여기에는 수정 폼을 넣거나 적절한 내용으로 변경 */}
              <div>
                렌트카 예약을 수정할 수 있는 폼을 여기에
                넣으세요.
              </div>
              <button
                className={style.publicBtn}
                onClick={toggleModal}
              >
                닫기
              </button>
            </div>
          </ModalBody>
        </Modal>
      )}
      {/* 삭제 확인 모달 */}
      {isConfirmDelete && (
        <Modal
          isOpen={isConfirmDelete}
          toggle={toggleConfirmDelete}
        >
          <ModalBody>
            <div
              style={{
                fontFamily: 'font2',
                textAlign: 'center',
              }}
            >
              <p>정말로 이 예약을 삭제하시겠습니까?</p>
              <button
                className={style.publicBtn}
                onClick={confirmDelete}
              >
                삭제
              </button>
              <button
                className={style.publicBtn}
                onClick={toggleConfirmDelete}
              >
                취소
              </button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default MyPageRentCar;
