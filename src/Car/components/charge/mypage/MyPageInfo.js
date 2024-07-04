import React, { useContext, useState } from 'react';
import AuthContext from '../../../../util/AuthContext';
import styles from '../scss/MyPageInfo.module.scss';
import UserInfoSave from './UserInfoSave';
import { Modal, ModalBody } from 'reactstrap';
import style from '../../../../scss/Button.module.scss';
const MyPageInfo = () => {
  const [updateInfo, setUpdateInfo] = useState(false);

  const { userName, email, phoneNumber } =
    useContext(AuthContext);

  const toggle = () => setUpdateInfo(!updateInfo);

  // 회원정보 수정하기 모달창 활성화
  const ModalOpen = () => (
    <Modal
      isOpen={updateInfo}
      toggle={toggle}
      style={{ top: '25%', fontFamily: 'font2' }}
    >
      <ModalBody>
        <UserInfoSave />
      </ModalBody>
    </Modal>
  );

  return (
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
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button
          className={style.publicBtn}
          onClick={toggle}
        >
          수정하기
        </button>
        {updateInfo && ModalOpen()}
      </div>
    </div>
  );
};

export default MyPageInfo;
