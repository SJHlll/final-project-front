import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Modal2.module.scss';
import axios from 'axios';
import axiosInstance from '../../../../config/axios-config';
import AuthContext from '../../../../util/AuthContext';
import style from '../../../../scss/Button.module.scss';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config/host-config';

const Modal2 = ({
  onClose,
  reviewNo,
  selectedType,
  reviewContent,
  reviewRating,
  reviewPhotoPreview,
  reviewItem,
  isEditMode,
}) => {
  const [content, setContent] = useState(
    reviewContent || '',
  );
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(
    reviewItem || '',
  );
  const [rating, setRating] = useState(reviewRating || 1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    reviewPhotoPreview || '',
  );
  const [carList, setCarList] = useState([]);
  const [chargeList, setChargeList] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const $fileInputRef = useRef();

  const API_REVIEW_URL = API_BASE_URL + '/review';

  const carImageMap = {
    'BMW i5 M60':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/BMW_i5_M60.png',
    'BMW i8 로드스터':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/BMW_i8_Roadster.png',
    'GMC 허머 EV':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/GMC_HUMMER_EV.png',
    '굼퍼트 나탈리':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Gumpert_Nathalie.png',
    '루시드 에어':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Lucid_Air.png',
    '링컨 에비에이터 플러그인 하이브리드':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Lincoln_Aviator.png',
    '맥라렌 아투라':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/McLaren_Artura.png',
    '메르세데스-벤츠 AMG S클래스 E 퍼포먼스':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Mercedes_Benz_AMG_SClass.png',
    '메르세데스-벤츠 EQE':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Mercedes_Benz_EQE.png',
    '볼린저 B2':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Bollinger_B2.png',
    '아우디 Q6 e-트론':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Audi_Q6_Etron.png',
    '아우디 SQ6 e-트론':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Audi_SQ6_Etron.png',
    '재규어 I-페이스':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Jaguar_IPace.png',
    '지프 그랜드 체로키 4XE':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Jeep_Grand_Cherokee_4XE.png',
    '지프 랭글러 4XE':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Jeep_Wrangler_4XE.png',
    '캐딜락 셀레스틱':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Cadillac_Celestiq.png',
    '테슬라 로드스터 스포츠':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Tesla_Roadster.png',
    '테슬라 모델S':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Tesla_ModelS.png',
    '테슬라 모델X':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Tesla_ModelX.png',
    '테슬라 사이버트럭':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Tesla_CyberTruck.png',
    '페라리 296 GTB':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Ferrari_296_GTB.png',
    '포르쉐 카이엔 E-하이브리드 쿠페':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Porsche_Cayenne.png',
    '피스커 로닌':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Fisker_Ronin.png',
    '홍치 E-HS9':
      'https://plugngo.s3.ap-northeast-2.amazonaws.com/Car/Hongqi_EHS9.png',
  };

  useEffect(() => {
    console.log('isEditMode: ', isEditMode);
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

    console.log('선택된 값: ', selectedItem);
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
      console.log('선택된 값: ', selectedItem);
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
    if (!photo) {
      const defaultImage = carImageMap[e.target.value];
      setPhotoPreview(defaultImage || '');
    }
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
      const defaultImage = carImageMap[selectedItem];
      setPhotoPreview(defaultImage || '');
      setPhoto(null);
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

    const url = `http://localhost:8181/review/${selectedType === 'rental' ? 'car' : 'charge'}`;

    // 충전소 리뷰 데이터
    const reviewChargeJsonBlob = new Blob(
      [
        JSON.stringify({
          content,
          rating,
          stationName: selectedItem,
        }),
      ],
      { type: 'application/json' },
    );

    const reviewChargeData = new FormData();
    reviewChargeData.append('charge', reviewChargeJsonBlob);
    reviewChargeData.append(
      'reviewImage',
      $fileInputRef.current.files[0],
    );

    // 렌트카 리뷰 데이터
    const reviewCarJsonBlob = new Blob(
      [
        JSON.stringify({
          content,
          rating,
          carName: selectedItem,
        }),
      ],
      { type: 'application/json' },
    );

    const reviewCarData = new FormData();
    reviewCarData.append('car', reviewCarJsonBlob);
    reviewCarData.append(
      'reviewImage',
      $fileInputRef.current.files[0],
    );

    try {
      const response = await axiosInstance.post(
        url,
        selectedType === 'rental'
          ? reviewCarData
          : reviewChargeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        alert('리뷰 등록이 완료되었습니다.');
        navigate('/review');
        onClose();
        window.location.reload(); // 페이지 새로 고침
      } else {
        console.log('Error : ', response.data);
        alert('리뷰 등록에 실패하였습니다.');
      }
    } catch (err) {
      console.log('Error: ', err.response);
      alert('리뷰 등록에 실패하였습니다.');
    }
  };

  // 리뷰 수정 이벤트
  const updateHandler = async (e) => {
    e.preventDefault();

    // 충전소 리뷰 데이터
    const reviewChargeJsonBlob = new Blob(
      [
        JSON.stringify({
          content,
          rating,
          stationName: selectedItem,
        }),
      ],
      { type: 'application/json' },
    );

    const reviewChargeData = new FormData();
    reviewChargeData.append('charge', reviewChargeJsonBlob);
    reviewChargeData.append(
      'reviewImage',
      $fileInputRef.current.files[0],
    );

    // 렌트카 리뷰 데이터
    const reviewCarJsonBlob = new Blob(
      [
        JSON.stringify({
          content,
          rating,
          carName: selectedItem,
        }),
      ],
      { type: 'application/json' },
    );

    const reviewCarData = new FormData();
    reviewCarData.append('car', reviewCarJsonBlob);
    reviewCarData.append(
      'reviewImage',
      $fileInputRef.current.files[0],
    );

    const url = `${API_REVIEW_URL}/charge/${reviewNo}`;

    console.log('reviewNo: ', reviewNo);
    console.log('url: ', url);

    try {
      const res = await axiosInstance.patch(
        url,
        selectedType === 'rental'
          ? reviewCarData
          : reviewChargeData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        alert('리뷰 수정이 완료되었습니다.');
        navigate('/mypage/review');
        onClose();
        window.location.reload(); // 페이지 새로 고침
      } else {
        console.log('Error: ', res.data);
        alert('리뷰 수정에 실패하였습니다.');
      }
    } catch (err) {
      console.log('Error : ', err.response);
      alert('리뷰 수정에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.modal2} onClick={onClose}>
      <div
        className={styles.modal2Content}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form
          onSubmit={
            isEditMode ? updateHandler : handleSubmit
          }
        >
          <div className={styles.selectionRow}>
            <div>
              <label htmlFor='item'>{`${selectedType === 'rental' ? '차량' : '충전소'} 선택:`}</label>
              <select
                id='item'
                value={selectedItem}
                onChange={handleItemChange}
                disabled={isEditMode}
              >
                <option value=''>선택하세요</option>
                {selectedType === 'rental'
                  ? carList.map((car) => (
                      <option
                        key={car.carId}
                        value={car.carName}
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
              ref={$fileInputRef}
            />
            <div className={styles.photoPreview}>
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt='이미지 미리보기'
                  className={styles.previewImage}
                />
              ) : (
                <img
                  src={
                    selectedType === 'rental'
                      ? 'https://plugngo.s3.ap-northeast-2.amazonaws.com/2023041259109115.jpg'
                      : 'https://plugngo.s3.ap-northeast-2.amazonaws.com/207af597d815193c998b06d41b704937.jpg'
                  }
                  alt='기본 이미지'
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
          {error && <p className={styles.error}>{error}</p>}
          <div className={style.submitButton}>
            <button type='submit'>
              {isEditMode ? '수정' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal2;
