import React, { useContext, useState } from 'react';
import AuthContext from '../../../../util/AuthContext';
// import '../scss/MyPageInfo.scss';
import '../scss/MyPageInfo.scss';
import UserInfoSave from './UserInfoSave';
import { Modal, ModalBody } from 'reactstrap';

const MyPageInfo = () => {
  const [updateInfo, setUpdateInfo] = useState(false);

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

  const { userName, email, phoneNumber } =
    useContext(AuthContext);

  return (
    <div className='reservation-list'>
      <h3 style={{ textAlign: 'center' }}>프로필</h3>
      <div className='flex'>
        <div className='value'>이름</div>
        <div>{userName}</div>
      </div>
      <div className='flex'>
        <div className='value'>이메일</div>
        <div>{email}</div>
      </div>
      <div className='flex'>
        <div className='value'>핸드폰번호</div>
        <div>{phoneNumber}</div>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button className='public-btn' onClick={toggle}>
          수정하기
        </button>
        {updateInfo && ModalOpen()}
      </div>
    </div>
  );
};

export default MyPageInfo;
