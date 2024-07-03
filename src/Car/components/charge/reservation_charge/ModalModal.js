// Modal.js
import React from 'react';
import '../scss/ModalModal.scss';

const ModalModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className='modalmodal-overlay'>
      <div className='modalmodal-content'>
        <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
        <div className='modalmodal-buttons'>
          {onConfirm && (
            <button onClick={onConfirm}>확인</button>
          )}
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ModalModal;
