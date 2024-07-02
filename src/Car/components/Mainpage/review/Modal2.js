import React, { useState } from 'react';
import './Modal2.scss';
import axios from 'axios';

const Modal2 = ({ onClose, onSave, selectedType }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [rating, setRating] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const reviewSelect =
    selectedType === 'rental'
      ? ['차량 1', '차량 2', '차량 3']
      : ['충전소 1', '충전소 2', '충전소 3'];

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 350) {
      setContent(inputValue);
      setError('');
    } else {
      setError('350자 이상 작성할 수 없습니다.');
    }
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItem === '') {
      window.alert(
        `${selectedType === 'rental' ? '차량' : '충전소'}를 선택해주세요.`,
      );
      return;
    }

    if (content.trim().length === 0) {
      window.alert('후기를 입력해주세요.');
      return;
    }

    if (content.length > 350) {
      window.alert('350자 이상 작성할 수 없습니다.');
      return;
    }

    const requestDTO = {
      content,
      selectedItem,
      rating,
      photo: photo ? photo.name : null, // 사진 이름만 전송, 서버에서 실제 파일 처리 필요
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/review',
        requestDTO,
      );
      console.log(response.data);
      console.log('전송완료');
      onSave(content, selectedItem, rating, photo);
      setContent('');
      setSelectedItem('');
      setRating(1);
      setPhoto(null);
      setPhotoPreview(null);
      onClose();
    } catch (error) {
      console.error('Error saving review:', error);
      window.alert(
        '리뷰를 저장하는 동안 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <div className='modal2'>
      <div className='modal2-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className='selection-row'>
            <div>
              <label htmlFor='item'>{`${selectedType === 'rental' ? '차량' : '충전소'} 선택:`}</label>
              <select
                id='item'
                value={selectedItem}
                onChange={handleItemChange}
              >
                <option value=''>선택하세요</option>
                {reviewSelect.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='rating'>별점 선택:</label>
              <select
                id='rating'
                value={rating}
                onChange={handleRatingChange}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {`${value}점`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='image-upload'>
            <label htmlFor='photo'>upload</label>
            <input
              type='file'
              id='photo'
              accept='image/*'
              onChange={handlePhotoChange}
            />
            <div className='photo-preview'>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt='이미지 미리보기'
                  className='preview-image'
                />
              )}
            </div>
          </div>
          <div className='review-textarea'>
            <textarea
              value={content}
              onChange={handleChange}
              placeholder='후기를 작성해주세요.'
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <div className='submit-button'>
            <button type='submit'>저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal2;
