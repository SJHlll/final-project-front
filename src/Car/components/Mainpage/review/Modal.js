import React from 'react';
import styles from './ReviewPage.module.scss';

const Modal = ({ review, onClose, selectedType }) => {
  // 모달 외부를 클릭하면 모달을 닫는 함수
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  // 리뷰 평점만큼 꽉 찬 별을 생성하는 배열
  const fullStars = Array.from(
    Array(Math.floor(review.rating)),
    (_, index) => <span key={index}>&#9733;</span>,
  );

  // 5에서 리뷰 평점을 뺀 만큼 빈 별을 생성하는 배열
  const emptyStars = Array.from(
    Array(5 - Math.floor(review.rating)),
    (_, index) => <span key={index}>&#9734;</span>,
  );

  const formatTime = (updateDate) => {
    const date = new Date(updateDate);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 기본 이미지 URL
  const defaultImage =
    selectedType === 'rental'
      ? 'https://plugngo.s3.ap-northeast-2.amazonaws.com/2023041259109115.jpg'
      : 'https://plugngo.s3.ap-northeast-2.amazonaws.com/207af597d815193c998b06d41b704937.jpg';

  // 차량 기본 이미지 URL
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

  // 이미지 URL 결정 함수
  const getImageUrl = () => {
    if (review.photo) {
      return review.photo; // 업로드된 이미지가 있을 때
    }

    if (selectedType === 'rental') {
      return carImageMap[review.carName] || defaultImage; // 차량 이미지 맵에서 기본 이미지 반환
    }

    return defaultImage; // 충전소인 경우 기본 이미지 반환
  };

  // 리뷰 작성자 이름 가리기
  const anonymizeName = (name) => {
    if (!name) return ''; // 이름이 없을 경우 빈 문자열을 반환

    const firstChar = name.charAt(0); // 첫 번째 글자 추출
    const remainingChars = name.slice(1); // 첫 글자를 제외한 나머지 부분 추출

    // 나머지 부분을 '*'로 치환
    const anonymized =
      firstChar + remainingChars.replace(/./g, '*');
    return anonymized;
  };

  // 모달 컴포넌트의 렌더링 부분
  return (
    <div
      className={styles.modal}
      onClick={handleOutsideClick}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.modalImageContainer}>
          <img
            src={getImageUrl()}
            alt='이미지'
            className={styles.previewImage}
          />
        </div>
        <div style={{ width: '100%', textAlign: 'end' }}>
          <span className={styles.reviewDate}>
            {formatTime(review.updateDate)}
          </span>
        </div>
        <h3>{anonymizeName(review.name)}</h3>
        <div className={styles.rating}>
          {fullStars}
          {emptyStars}
        </div>
        <h2>
          {`${selectedType === 'rental' ? '차량 : ' : '충전소 : '}`}
          {`${selectedType === 'rental' ? review.carName : review.stationName}`}
        </h2>
        <p>{review.content}</p>
      </div>
    </div>
  );
};

export default Modal;
