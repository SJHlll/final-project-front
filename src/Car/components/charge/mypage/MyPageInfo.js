import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../util/AuthContext';
import UserInfoSave from './UserInfoSave';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import style from '../../../../scss/Button.module.scss';
import styles from '../scss/MyPageInfo.module.scss';
import axios from 'axios';
import {
  API_BASE_URL,
  USER,
} from '../../../../config/host-config';

const MyPageInfo = () => {
  const [updateInfo, setUpdateInfo] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const {
    userName,
    email,
    phoneNumber,
    birthDay,
    onLogout,
  } = useContext(AuthContext);

  const toggleUpdateInfo = () => setUpdateInfo(!updateInfo);
  const toggleConfirmDelete = () =>
    setConfirmDelete(!confirmDelete);

  // 회원탈퇴 요청 함수
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    try {
      const response = await axios.delete(
        API_BASE_URL + USER + '/delete',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('responseData', response);
      console.log('token', token);
      alert('회원탈퇴가 성공적으로 처리되었습니다.');
      onLogout(); // Update the authentication state
      navigate('/');
    } catch (error) {
      alert('회원탈퇴 중 오류가 발생했습니다.');
      console.error('Error deleting account:', error);
    }
  };

  // 회원탈퇴 확인 모달
  const ConfirmDeleteModal = () => (
    <Modal
      isOpen={confirmDelete}
      toggle={toggleConfirmDelete}
      style={{ top: '25%', fontFamily: 'font2' }}
    >
      <ModalHeader toggle={toggleConfirmDelete}>
        회원탈퇴 확인
      </ModalHeader>
      <ModalBody>
        정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수
        없습니다.
      </ModalBody>
      <ModalFooter>
        <Button
          color='danger'
          onClick={() => {
            handleDeleteAccount();
            toggleConfirmDelete();
          }}
        >
          삭제
        </Button>
        <Button
          color='secondary'
          onClick={toggleConfirmDelete}
        >
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );

  // 회원정보 수정하기 모달창 활성화
  const ModalOpen = () => (
    <Modal
      isOpen={updateInfo}
      toggle={toggleUpdateInfo}
      style={{ top: '25%', fontFamily: 'font2' }}
    >
      <ModalBody>
        <UserInfoSave />
      </ModalBody>
    </Modal>
  );

  return (
    <div className={styles.reservationList}>
      <div className={styles.reservationList}>
        <h3 style={{ textAlign: 'center' }}>내 정보</h3>
        <div className={styles.flex}>
          <div className={styles.value}>이름</div>
          <div>{userName}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.value}>이메일</div>
          <div>{email}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.value}>핸드폰번호</div>
          <div>{phoneNumber}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.value}>생년월일</div>
          <div>{birthDay || ''}</div>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <button
            className={style.publicBtn}
            onClick={toggleUpdateInfo}
          >
            수정하기
          </button>
          <button
            className={style.publicBtn}
            onClick={toggleConfirmDelete}
          >
            회원탈퇴
          </button>
          {ModalOpen()}
          {ConfirmDeleteModal()}
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
