import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRcContext } from '../../Mainpage/adminpage/admincar/TestRcContext';
import styles from './MyPageReviewList.module.scss';
import AuthContext from '../../../../util/AuthContext';
import MyPageModal from './MyPageModal';
import { useNavigate } from 'react-router-dom';

const MyPageRentCarMap = () => {
  const navigate = useNavigate();
  const { reserveCar, setReserveCar } =
    useContext(TestRcContext);
  const { phoneNumber } = useContext(AuthContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newRentDate, setNewRentDate] = useState('');
  const [newTurninDate, setNewTurninDate] = useState('');
  const [isEditDateMode, setIsEditDateMode] =
    useState(false);

  // DB에서 예약한 렌트카 가져오기
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/mypage/car',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();

        const filteredData = data.filter(
          (car) => car.phoneNumber === phoneNumber,
        );
        filteredData.sort(
          (a, b) =>
            new Date(a.rentDate) - new Date(b.rentDate),
        );
        setReserveCar(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [setReserveCar]);

  // 예약한 충전소 DB에 지우기 (예약번호를 기준으로)
  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://localhost:8181/mypage/car?reservationNo=${reservationNo}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      alert(
        '예약이 취소되었습니다. 환불은 24시간 이내로 이루어집니다.',
      );
      // 예약 취소가 성공하면 UI에서 해당 예약을 제거
      setReserveCar((prevCar) => {
        const updatedCar = prevCar.filter(
          (car) => car.reservationNo !== reservationNo,
        );
        return updatedCar;
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const truncateText = (text, length) => {
    if (!text) {
      return '';
    }
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: false,
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };

  const handlerentCarClick = (rentCar) => {
    setSelectedCar(rentCar);
    setIsModalOpen(true);
    setNewRentDate(rentCar.rentDate);
    setNewTurninDate(rentCar.turninDate);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setIsEditDateMode(false);
  };

  const toggleEditDateMode = () => {
    setIsEditDateMode(!isEditDateMode);
  };

  const AdminContents = ({ car }) => {
    return (
      <>
        {car.map((e) => (
          <div
            className={styles.listBody}
            key={e.reservationNo}
            onClick={() => handlerentCarClick(e)}
          >
            <div className={styles.resSelectedAd2}>
              {e.carName}
            </div>
            <div className={styles.resSelectedName2}>
              {formatPrice(e.totalPrice)}원
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.rentDate)}</div>
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.turninDate)}</div>
            </div>
            <div className={styles.resNote}>
              {e.extra ? truncateText(e.extra, 80) : '없음'}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {reserveCar.length > 0 ? (
        <>
          <AdminContents car={reserveCar} />
          <MyPageModal
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            {selectedCar && (
              <div>
                <h2>렌트카 상세</h2>
                <p>차종: {selectedCar.carName}</p>
                <p>
                  가격:{' '}
                  {formatPrice(selectedCar.totalPrice)}원
                </p>
                {isEditDateMode ? (
                  <p>
                    <div>
                      렌트 시작일 :
                      <input
                        type='datetime-local'
                        value={newRentDate}
                        onChange={(e) =>
                          setNewRentDate(e.target.value)
                        }
                      />
                    </div>
                    <div>
                      렌트 반납일 :
                      <input
                        type='datetime-local'
                        value={newTurninDate}
                        onChange={(e) =>
                          setNewTurninDate(e.target.value)
                        }
                      />
                    </div>
                  </p>
                ) : (
                  <p>
                    <div>
                      렌트 시작일 :{' '}
                      {formatRentTime(selectedCar.rentDate)}
                    </div>
                    <div>
                      렌트 반납일 :{' '}
                      {formatRentTime(
                        selectedCar.turninDate,
                      )}
                    </div>
                  </p>
                )}
                <button
                  className={styles.buttonbutton}
                  onClick={() => {
                    if (
                      window.confirm(
                        '정말 예약을 취소하시겠습니까?',
                      )
                    ) {
                      handleCancelReservation(
                        selectedCar.reservationNo,
                      );
                    }
                  }}
                >
                  예약 취소
                </button>
                {/* <button
                  className={styles.buttonbutton}
                  onClick={toggleEditDateMode}
                >
                  {isEditDateMode
                    ? '수정 취소'
                    : '날짜 수정하기'}
                </button>
                {isEditDateMode && (
                  <button
                    className={styles.buttonbutton}
                    // onClick={() => {
                    //   if (
                    //     window.confirm(
                    //       '정말 예약을 수정하시겠습니까?',
                    //     )
                    //   ) {
                    //     handleUpdateReservation(
                    //       selectedCar.reservationNo,
                    //     );
                    //   }
                    // }}
                  >
                    수정 완료
                  </button>
                )} */}
              </div>
            )}
          </MyPageModal>
          <p className={styles.filteredCount}>
            예약한 렌트카 :{' '}
            <span className={styles.filteredNum}>
              {reserveCar.length}
            </span>
            개
          </p>
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: 'center',
              marginTop: '100px',
              fontSize: '1.5rem',
            }}
            onClick={() => console.log(reserveCar)}
          >
            예약한 렌트카가 없습니다.
            <div>
              <span
                onClick={() => navigate('/car/res')}
                style={{
                  cursor: 'pointer',
                  color: '#F18D8A',
                }}
              >
                렌트카 예약 페이지로 이동하기
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyPageRentCarMap;
