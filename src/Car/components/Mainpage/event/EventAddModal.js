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

const EventAddModal = ({
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
    console.log({ isEditMode });
    e.preventDefault();
    if (!title || !imagePreview) {
      alert('제목과 이미지를 모두 입력해야 합니다.');
      return;
    }

    if (!$fileInputRef.current.files[0]) {
      alert('이미지를 선택해주세요.');
      return;
    }

    const eventJsonBlob = new Blob(
      [JSON.stringify(title)],
      {
        type: 'application/json',
      },
    );

    const eventFormData = new FormData();
    eventFormData.append('title', eventJsonBlob);
    eventFormData.append(
      'eventImage',
      $fileInputRef.current.files[0],
    );

    try {
      const res = await axiosInstance.post(
        API_EVENT_URL,
        eventFormData,
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
        toggle(false);
      } else {
        console.log('Error: ', res.data);
        alert('이벤트 등록에 실패하였습니다.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      alert('이벤트 등록에 실패하였습니다.');
    }
  };

  // 수정 버튼 클릭 시 처리
  const updateHandler = async (e) => {
    console.log({ isEditMode });
    e.preventDefault();
    if (!title || !imagePreview) {
      alert('제목과 이미지를 모두 입력해야 합니다.');
      return;
    }

    if (!$fileInputRef.current.files[0]) {
      alert('이미지를 선택해주세요.');
      return;
    }

    const eventJsonBlob = new Blob(
      [JSON.stringify(title)],
      {
        type: 'application/json',
      },
    );

    const eventFormData = new FormData();
    eventFormData.append('title', eventJsonBlob);
    eventFormData.append(
      'eventImage',
      $fileInputRef.current.files[0],
    );

    try {
      const res = await axiosInstance.patch(
        `${API_EVENT_URL}/${eventId}`,
        eventFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        alert('이벤트가 수정되었습니다.');
        navigate('/events');
        toggle(false);
      } else {
        console.log('Error: ', res.data);
        alert('이벤트 수정에 실패하였습니다.');
      }
    } catch (err) {
      console.error('Error updating event:', err.response);
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
        >
          <div className={styles.formGroup}>
            <input
              type='text'
              id={styles.title}
              name='title'
              value={title}
              placeholder='제목'
              onChange={handleTitleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label
              htmlFor='imageUpload'
              className={styles.imageUploadLabel}
              onClick={handleUploadClick}
            >
              {isEditMode ? '이미지 변경' : '이미지 업로드'}
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
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventAddModal;
