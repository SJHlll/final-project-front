import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import MyPageInfo from './MyPageInfo';
import MyPageCharge from './MyPageCharge';
import './MyPageBtn.scss';

// 이미지 파일 import
import myPageInfoImg from '../assets/img/MyInfo.jpg';
import myPageChargeImg from '../assets/img/StaReser.png';
import myPageRentCarImg from '../assets/img/carReser.png';
import myPageReviewImg from '../assets/img/Myreview.jpg';

// 모달의 접근성을 위한 root 엘리먼트 지정
Modal.setAppElement('#root');

const MyPageBtn = () => {
  // 모달 상태와 콘텐츠 상태 관리
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  // 모달을 여는 함수
  const openModal = (content) => {
    setModalContent(content); // 모달에 표시할 콘텐츠 설정
    setModalIsOpen(true); // 모달 열기
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setModalIsOpen(false); // 모달 닫기
    setModalContent(null); // 모달 콘텐츠 초기화
  };

  // 각 버튼에 대한 정보를 배열로 정의
  const buttonData = [
    {
      onClick: () => openModal(<MyPageInfo />),
      src: myPageInfoImg,
      alt: '내 정보',
    },
    {
      onClick: () => openModal(<MyPageCharge />),
      src: myPageChargeImg,
      alt: '충전소 예약 내역',
    },
    {
      onClick: () => navigate('/mypage/car'),
      src: myPageRentCarImg,
      alt: '렌트카 예약현황',
    },
    {
      onClick: () => navigate('/mypage/review'),
      src: myPageReviewImg,
      alt: '내가 쓴 리뷰',
    },
  ];

  return (
    <div
      style={{
        fontFamily: 'font2',
        width: '100%',
        height: '100%',
        zIndex: '3',
        position: 'absolute',
        top: '30px',
      }}
    >
      {/* 버튼과 모달 */}
      <div className='ButtonContainer'>
        {buttonData.map((button, index) => (
          <button
            key={index} // 각 버튼의 고유 키
            className='GridButton' // 버튼 스타일 클래스
            onClick={button.onClick} // 클릭 시 실행할 함수
          >
            <img
              src={button.src} // 이미지 소스
              alt={button.alt} // 이미지 대체 텍스트
              className='ButtonImage' // 이미지 스타일 클래스
            />
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen} // 모달 열림/닫힘 상태
        onRequestClose={closeModal} // 모달 닫기 요청 시 실행할 함수
        contentLabel='Example Modal' // 모달의 접근성 라벨
        className='ModalContent' // 모달 콘텐츠 스타일 클래스
        overlayClassName='ModalOverlay' // 모달 오버레이 스타일 클래스
      >
        <button
          onClick={closeModal} // 모달 닫기 버튼 클릭 시 실행할 함수
          className='CloseButton' // 모달 닫기 버튼 스타일 클래스
        >
          ×
        </button>
        {modalContent} {/* 모달에 표시할 콘텐츠 */}
      </Modal>
    </div>
  );
};

export default MyPageBtn;
