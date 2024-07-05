import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Modal2.module.scss';
import axios from 'axios';
import axiosInstance from '../../../../config/axios-config';
import AuthContext from '../../../../util/AuthContext';
import style from '../../../../scss/Button.module.scss';
import { useNavigate } from 'react-router-dom';
const Modal2 = ({
  onClose,
  onSave,
  selectedType,
  reviewContent,
  reviewRating,
  reviewPhotoPreview,
  reviewItem,
  isEditMode,
}) => {
  const [content, setContent] = useState(
    reviewContent || null,
  );

  const Modal2 = ({ onClose, onSave, selectedType }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(
      reviewItem || '',
    );
    const [rating, setRating] = useState(reviewRating || 1);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(
      reviewPhotoPreview || '',
    );
    const [reviewList, setReviewList] = useState([]);
    const [carList, setCarList] = useState([]);
    const [chargeList, setChargeList] = useState([]);

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    useEffect(() => {
      if (isEditMode) {
        setContent(reviewContent);
        setSelectedItem(reviewItem);
        setRating(reviewRating);
        setPhotoPreview(reviewPhotoPreview);
      }
    }, [
      isEditMode,
      reviewContent,
      reviewItem,
      reviewRating,
      reviewPhotoPreview,
    ]);

    useEffect(() => {
      const fetchCarList = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8181/car/res',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(
            '렌트카 목록 응답 데이터 : ',
            response.data,
          );
          setCarList(response.data.carList);
        } catch (error) {
          console.log(
            '렌트카 목록을 가져오는데 실패했습니다. : ',
            error,
          );
        }
      };

      if (selectedType === 'rental') {
        fetchCarList();
      }
    }, [token, selectedType]);

    useEffect(() => {
      const fetchChargeList = async () => {
        try {
          const response = await axios.get(
            'http://localhost:8181/charge/reservation',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(
            '충전소 목록 응답 데이터 : ',
            response.data,
          );
          setChargeList(response.data.chargers);
        } catch (error) {
          console.log(
            '충전소 목록을 가져오는데 실패했습니다. : ',
            error,
          );
        }
      };
      if (selectedType !== 'rental') {
        fetchChargeList();
      }
    }, [token, selectedType]);

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

      if (selectedType !== 'rental') {
        const reviewChargeData = {
          content,
          rating,
          stationName: selectedItem,
        };

        try {
          const response = await axiosInstance.post(
            'http://localhost:8181/review/charge',
            reviewChargeData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          setReviewList([...reviewList, response.data]);
          alert('리뷰 작성이 완성되었습니다.');
          onSave(content, selectedItem, rating);
        } catch (err) {
          setError(err.message);
          alert('리뷰 등록에 실패하였습니다.');
        }
      } else {
        const reviewCarData = {
          content,
          rating,
          carName: selectedItem,
        };

        try {
          const response = await axiosInstance.post(
            'http://localhost:8181/review/car',
            reviewCarData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          setReviewList([...reviewList, response.data]);
          alert('리뷰 작성이 완성되었습니다.');
          onSave(content, selectedItem, rating);
        } catch (err) {
          setError(err.message);
          alert('리뷰 등록에 실패하였습니다.');
        }
      }
      onSave(content, selectedItem, rating, photo);
      setContent(''); // 폼 초기화
      setSelectedItem(''); // 폼 초기화
      setRating(1); // 폼 초기화
    };

    // 리뷰 수정하기
    const updateHandler = async (e) => {
      e.preventDefault();

      if (selectedType !== 'rental') {
        const reviewChargeData = {
          content,
          rating,
          stationName: selectedItem,
        };

        try {
          await axiosInstance.patch(
            `http://localhost:8181/review/`,
            reviewChargeData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          alert('리뷰 수정이 완료 되었습니다.');
          navigate('/mypage');
        } catch (err) {
          console.log('Error : ', err.response);
          alert('리뷰 수정에 실패하였습니다.');
        }
      } else {
        const reviewCarData = {
          content,
          rating,
          carName: selectedItem,
        };

        try {
          const response = await axiosInstance.post(
            'http://localhost:8181/review/car',
            reviewCarData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );
          setReviewList([...reviewList, response.data]);
          alert('리뷰 수정이 완료 되었습니다.');
          navigate('/mypage');
        } catch (err) {
          setError(err.message);
          alert('리뷰 수정에 실패하였습니다.');
        }
      }
      setContent(''); // 폼 초기화
      setSelectedItem(''); // 폼 초기화
      setRating(1); // 폼 초기화
    };

    return (
      <div className={styles.modal2}>
        <div
          className={styles.modal2Content}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <div className={styles.selectionRow}>
              <div>
                <label htmlFor='item'>{`${selectedType === 'rental' ? '차량' : '충전소'} 선택:`}</label>
                <select
                  id='item'
                  value={selectedItem}
                  onChange={handleItemChange}
                >
                  <option value=''>선택하세요</option>
                  {selectedType === 'rental'
                    ? carList.map((car) => (
                        <option
                          key={car.carId}
                          value={car.carId}
                        >
                          {car.carName}
                        </option>
                      ))
                    : chargeList.map((charge) => (
                        <option
                          key={charge.stationId}
                          value={charge.stationId}
                        >
                          {charge.stationName}
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
            <div className={styles.imageUpload}>
              <label htmlFor='photo'>upload</label>
              <input
                type='file'
                id='photo'
                accept='image/*'
                onChange={handlePhotoChange}
              />
              <div className={styles.photoPreview}>
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt='이미지 미리보기'
                    className={styles.previewImage}
                  />
                )}
              </div>
            </div>
            <div className={styles.reviewTextarea}>
              <textarea
                value={content}
                onChange={handleChange}
                placeholder='후기를 작성해주세요.'
              />
            </div>
            {error && (
              <p className={styles.error}>{error}</p>
            )}
            <div className={style.submitButton}>
              <button type='submit'>저장</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

export default Modal2;
