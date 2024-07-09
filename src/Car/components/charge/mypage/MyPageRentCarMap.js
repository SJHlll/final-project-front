import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestRcContext } from '../../Mainpage/adminpage/admincar/TestRcContext';
import styles from './MyPageReviewList.module.scss';
import AuthContext from '../../../../util/AuthContext';
import MyPageModal from './MyPageModal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Margin } from '@mui/icons-material';
import RentCarReservationUpdate from './RentCarReservationUpdate';
import { Modal } from 'reactstrap';

const MyPageRentCarMap = () => {
  const navigate = useNavigate();
  const { reserveCar, setReserveCar } =
    useContext(TestRcContext);
  const { phoneNumber } = useContext(AuthContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] =
    useState(false);

  const [isEditDateMode, setIsEditDateMode] =
    useState(false);

  // DB에서 예약한 렌트카 가져오기
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin/car',
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
          (a, b) => new Date(b.carNo) - new Date(a.carNo),
        );
        setReserveCar(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [setReserveCar, phoneNumber]);

  // 예약한 충전소 DB에 지우기 (예약번호를 기준으로)
  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        `http://localhost:8181/admin/car?reservationNo=${reservationNo}`,
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setIsEditDateMode(false);
  };

  const toggleEditDateMode = () => {
    setIsEditDateMode(!isEditDateMode);
    setUpdateModalOpen(!updateModalOpen);
  };

  const AdminContents = ({ car }) => {
    return (
      <>
        {car.map((e) => (
          <div
            className={styles.listBody}
            key={e.carNo}
            onClick={() => handlerentCarClick(e)}
          >
            <div className={styles.resSelectedNo}>
              {e.carNo}
            </div>
            <div className={styles.resSelectedAd2}>
              {e.carName}
            </div>
            <div className={styles.resSelectedName2}>
              {formatPrice(e.totalPrice)}원
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.rentTime)}</div>
            </div>
            <div className={styles.resSelectedTime}>
              <div>{formatRentTime(e.turninDate)}</div>
            </div>
            <div className={styles.resNote}>
              {e.extra ? truncateText(e.extra, 40) : '없음'}
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
              <>
                <h2>렌트카 상세</h2>
                <p style={{ margin: '3px 0' }}>
                  차종: {selectedCar.carName}
                </p>
                <p style={{ margin: '3px 0' }}>
                  가격:{' '}
                  {formatPrice(selectedCar.totalPrice)}원
                </p>
                <div>
                  렌트 시작일 :{' '}
                  {formatRentTime(selectedCar.rentDate)}
                </div>
                <div>
                  렌트 반납일 :{' '}
                  {formatRentTime(selectedCar.turninDate)}
                </div>
                <div style={{ margin: '3px 0' }}>메모:</div>
                <div
                  style={{
                    border: '1px solid lightgray',
                    borderRadius: '7px',
                  }}
                >
                  {selectedCar.extra || '없음'}
                </div>
              </>
            )}
            {isEditDateMode && (
              <Modal
                style={{
                  position: 'absolute',
                  top: '100px',
                  left: '710px',
                  width: '100%',
                }}
                isOpen={updateModalOpen}
                toggle={toggleEditDateMode}
              >
                <RentCarReservationUpdate
                  carNo={selectedCar.carNo}
                  onClose={closeModal}
                  rentDate={selectedCar.rentDate}
                  turninDate={selectedCar.turninDate}
                />
              </Modal>
            )}
            {!isEditDateMode && (
              <>
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
                <button
                  className={styles.buttonbutton}
                  onClick={toggleEditDateMode}
                >
                  예약 변경
                </button>
              </>
            )}
          </MyPageModal>
          <p className={styles.filteredCount}>
            예약한 렌트카 :{' '}
            <span className={styles.filteredNum}>
              {reserveCar.length}
            </span>{' '}
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
