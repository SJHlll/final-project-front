import React, { useState } from 'react';
import Modal from 'react-modal';
import MyPageInfo from './MyPageInfo';
import MyPageCharge from './MyPageCharge';
import MyPageRentCar from './MyPageRentCar';
import MyPageReview from './MyPageReview';
import './MyPageBtn.scss'; // SCSS 파일을 import합니다.

// 이미지 파일을 import합니다.
import myPageInfoImg from '../assets/img/MyInfo.jpg'; // 이미지 경로는 실제 경로에 맞게 조정하세요.
import myPageChargeImg from '../assets/img/StaReser.jpg'; // 충전소 예약 내역 이미지
import myPageRentCarImg from '../assets/img/carReser.jpg'; // 렌트카 예약현황 이미지
import myPageReviewImg from '../assets/img/Myreview.jpg'; // 내가 쓴 리뷰 이미지
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // root 엘리먼트를 지정합니다. 이는 모달 접근성을 위해 필요합니다.

const MyPageBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate('');

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  return (
    <div>
      {/* 버튼과 모달 */}
      <div className='ButtonContainer'>
        <button
          className='GridButton'
          onClick={() => openModal(<MyPageInfo />)}
        >
          <img
            src={myPageInfoImg}
            alt='내 정보'
            className='ButtonImage'
          />
        </button>
        <button
          className='GridButton'
          onClick={() => openModal(<MyPageCharge />)}
        >
          <img
            src={myPageChargeImg}
            alt='충전소 예약 내역'
            className='ButtonImage'
          />
        </button>
        <button
          className='GridButton'
          onClick={() => openModal(<MyPageRentCar />)}
        >
          <img
            src={myPageRentCarImg}
            alt='렌트카 예약현황'
            className='ButtonImage'
          />
        </button>
        <button
          className='GridButton'
          onClick={() => navigate('/mypage/review')}
        >
          <img
            src={myPageReviewImg}
            alt='내가 쓴 리뷰'
            className='ButtonImage'
          />
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        className='ModalContent' // SCSS에서 정의한 클래스 사용
        overlayClassName='ModalOverlay' // SCSS에서 정의한 클래스 사용
      >
        <button
          onClick={closeModal}
          className='CloseButton' // SCSS에서 정의한 클래스 사용
        >
          ×
        </button>
        {modalContent}
      </Modal>
    </div>
  );
};

export default MyPageBtn;
