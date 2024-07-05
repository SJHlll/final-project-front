import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './EventAddModal.module.scss'; // CSS 파일 경로
import { API_BASE_URL } from '../../../../config/host-config';
import AuthContext from '../../../../util/AuthContext';
import axiosInstance from '../../../../config/axios-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import styles from './EventAddModal.module.scss'; // CSS 파일 경로

const EventAddModal = ({
  isOpen,
  toggle,
  eventId,
  eventTitle,
  eventImage,
  isEditMode,
}) => {
  const [imagePreview, setImagePreview] = useState(
    eventImage || null,
  );
  const [title, setTitle] = useState(eventTitle || '');
  const [imageName, setImageName] = useState(
    eventImage ? 'Uploaded Image' : '',
  );
  const $fileInputRef = useRef();
  const navigate = useNavigate();

  const API_EVENT_URL = API_BASE_URL + '/events';

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (isEditMode) {
      setTitle(eventTitle);
      setImagePreview(eventImage);
      setImageName('Uploaded Image');
    }
  }, [isEditMode, eventTitle, eventImage]);

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

  // 파일 업로드 버튼 클릭 처리
  const handleUploadClick = () => {
    $fileInputRef.current.click();
  };

  // 저장 버튼 클릭 시 처리
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !imagePreview) {
      alert('제목과 이미지를 모두 입력해야 합니다.');
      return;
    }

    // const jsonBlob = new Blob([JSON.stringify({ title })], {
    //   type: 'application/json',
    // });

    const formData = new FormData();

    formData.append('eventData', JSON.stringify({ title }));
    formData.append(
      'eventImage',
      $fileInputRef.current.files[0],
    );

    // console.log('eventData: ', JSON.stringify({ title }));
    // console.log(
    //   'eventImage: ',
    //   $fileInputRef.current.files[0],
    // );

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    // };

    console.log('formData2: ', formData);
    console.log(
      'formData.eventData : ',
      formData.get('eventData'),
    );
    console.log(
      'formData.eventImage : ',
      formData.get('eventImage'),
    );

    try {
      const res = await axiosInstance.post(
        API_EVENT_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        alert('이벤트가 저장되었습니다.');
        navigate('/events');
      } else {
        console.log('Error: ', res.data);
        alert('이벤트 등록에 실패하였습니다.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      alert('이벤트 등록에 실패하였습니다.');
    }
    setTitle('');
    setImageName('');
    setImagePreview('');
    // try {
    //   const res = await fetch(
    //     'http://localhost:8181/events',
    //     requestOptions,
    //   );

    //   if (res.ok === 200) {
    //     const data = await res.json();
    //     alert('이벤트가 완료되었습니다.');
    //     navigate('/events');
    //   } else {
    //     const text = await res.text();
    //     console.error('Error: ', text);
    //     alert('이벤트 저장에 실패하였습니다.');
    //   }
    // } catch (err) {
    //   console.error('Error : ', err);
    //   alert('이벤트 등록에 실패하였습니다.');
    // }
  };

  // 수정
  const updateHandler = async (e) => {
    e.preventDefault();

    if (!title || !imagePreview) {
      alert('제목과 이미지를 모두 입력해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append(
      'eventImage',
      $fileInputRef.current.files[0],
    );

    try {
      await axiosInstance.patch(
        `http://localhost:8181/events/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      alert('수정 완료!');
      navigate(`/events`);
    } catch (err) {
      console.error('Error updating event:', err);
      alert('이벤트 수정에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={toggle}>
          ×
        </span>
        <h2>
          {isEditMode ? '이벤트 수정' : '이벤트 추가'}
        </h2>
        <form
          className={styles.formTop}
          onSubmit={isEditMode ? updateHandler : handleSave}
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
              id={styles.title}
              name='title'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor='imageUpload'
              className={styles.imageUploadLabel}
              onClick={handleUploadClick}
            >
              upload
            </label>
            <input
              type='file'
              id={styles.imageUpload}
              name='imageUpload'
              accept='image/*'
              onChange={handleImageChange}
              className={styles.hiddenFileInput}
              ref={$fileInputRef}
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
            <button type='submit'>
              {isEditMode ? '수정' : '저장'}
            </button>
            <button type='button' onClick={toggle}>
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
