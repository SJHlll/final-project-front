import React, { useState } from 'react';
import './Modal2.scss';

const Modal2 = ({ onClose, onSave, selectedType }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [rating, setRating] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const items =
    selectedType === 'rental'
      ? ['차량 1', '차량 2', '차량 3']
      : ['충전소 1', '충전소 2', '충전소 3'];

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 300) {
      setContent(inputValue);
      setError('');
    } else {
      setError('300자 이상 작성할 수 없습니다.');
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

  const handleSubmit = (e) => {
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

    onSave(content, selectedItem, rating, photo);
    setContent('');
    setSelectedItem('');
    setRating(1);
    setPhoto(null);
    setPhotoPreview(null);
    onClose();
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
                {items.map((item, index) => (
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
