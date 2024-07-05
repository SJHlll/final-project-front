import React, { useState } from 'react';
import './EventAddModal.scss'; // CSS 파일 경로

const EventAddModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [imageName, setImageName] = useState('');

  // 이미지 파일이 선택되었을 때 미리보기 설정
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageName(file.name); // 선택된 파일의 이름 저장
      };
      reader.readAsDataURL(file);
    }
  };

  // 제목 입력 처리
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 모달 외부를 클릭하면 모달을 닫는 함수
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modalOverlay')) {
      onClose();
    }
  };

  // 저장 버튼 클릭 시 처리
  const handleSave = (event) => {
    event.preventDefault();
    if (!title || !imagePreview) {
      alert('제목과 이미지를 모두 입력해야 합니다.');
      return;
    }
    // 여기에 실제 저장 로직을 수행합니다.
    alert('이벤트가 저장되었습니다.');
    onClose();
  };

  if (!isOpen) return null;

  return React.createElement(
    'div',
    {
      className: 'modalOverlay',
      onClick: handleOutsideClick,
    },
    React.createElement(
      'div',
      { className: 'modalContent' },
      React.createElement(
        'span',
        { className: 'close', onClick: onClose },
        '×',
      ),
      React.createElement('h2', null, '이벤트 추가'),
      React.createElement(
        'form',
        { className: 'formTop', onSubmit: handleSave }, // 수정된 부분
        React.createElement(
          'div',
          { className: 'formGroup' },
          React.createElement(
            'label',
            { htmlFor: 'title' },
            '제목:',
          ),
          React.createElement('input', {
            type: 'text',
            id: 'title',
            name: 'title',
            value: title,
            onChange: handleTitleChange,
          }),
        ),
        React.createElement(
          'div',
          { className: 'formGroup' },
          React.createElement(
            'label',
            {
              htmlFor: 'imageUpload',
              className: 'imageUploadLabel',
            },
            'upload',
          ),
          React.createElement('input', {
            type: 'file',
            id: 'imageUpload',
            name: 'imageUpload',
            accept: 'image/*',
            onChange: handleImageChange,
            className: 'hiddenFileInput',
          }),
          imageName &&
            React.createElement('div', {
              className: 'imageName',
            }),
        ),
        imagePreview &&
          React.createElement(
            'div',
            { className: 'imagePreview' },
            React.createElement('img', {
              src: imagePreview,
              alt: '미리보기',
            }),
          ),
        React.createElement(
          'div',
          { className: 'formButtons' },
          React.createElement(
            'button',
            { type: 'submit' },
            '저장',
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: onClose },
            '닫기',
          ),
        ),
      ),
    ),
  );
};

export default EventAddModal;
