import React, { useState } from 'react';
import styles from './EventAddModal.module.scss'; // CSS 파일 경로

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
  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOutsideClick}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          ×
        </span>
        <h2>이벤트 추가</h2>
        <form
          className={styles.formTop}
          onSubmit={handleSave}
        >
          <div className={styles.formGroup}>
            <label htmlFor='title'>제목:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor='imageUpload'
              className={styles.imageUploadLabel}
            >
              upload
            </label>
            <input
              type='file'
              id='imageUpload'
              name='imageUpload'
              accept='image/*'
              onChange={handleImageChange}
              className={styles.hiddenFileInput}
            />
            {imageName && (
              <div className={styles.imageName}>
                {imageName}
              </div>
            )}
          </div>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt='미리보기' />
            </div>
          )}
          <div className={styles.formButtons}>
            <button type='submit'>저장</button>
            <button type='button' onClick={onClose}>
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EventAddModal;
