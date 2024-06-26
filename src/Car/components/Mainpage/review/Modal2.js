import React from 'react';

// Modal2 컴포넌트: 모달 창을 렌더링하는 컴포넌트
const Modal2 = ({ children, onClose }) => {
  // 모달 외부 클릭 시 모달을 닫는 함수
  const handleOutsideClick = (e) => {
    // 클릭한 대상이 모달 배경인 경우에만 닫기
    if (e.target === e.currentTarget) {
      onClose(); // 모달 닫기 함수 호출
    }
  };

  return (
    // 모달 배경
    <div className='modal' onClick={handleOutsideClick}>
      {/* 모달 콘텐츠 */}
      <div className='modal-content'>
        {/* 닫기 버튼 */}
        <span className='close' onClick={onClose}>
          &times; {/* 닫기 버튼 표시 (X) */}
        </span>
        {children} {/* 모달 내부에 렌더링될 자식 요소들 */}
      </div>
    </div>
  );
};

export default Modal2;
