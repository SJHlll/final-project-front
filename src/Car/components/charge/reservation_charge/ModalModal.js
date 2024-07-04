// Modal.js
import React from 'react';
import styles from '../scss/ModalModal.module.scss';

const ModalModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalmodalOverlay}>
      <div className={styles.modalmodalContent}>
        <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
        <div className={styles.modalmodalButtons}>
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
