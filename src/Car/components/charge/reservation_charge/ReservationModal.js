import { addDays, setHours, setMinutes } from 'date-fns';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import styles from '../scss/ReservationModal.module.scss';
import style from '../../../../scss/Button.module.scss';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalModal from './ModalModal';

const ReservationModal = ({
  chargeId,
  stationName,
  address,
  speed,
  type,
  price,
}) => {
  const navigate = useNavigate();
  const today = new Date();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(today, 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const { userName, phoneNumber, email } =
    useContext(AuthContext);

  const [selectedValue, setSelectedValue] = useState(10);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  // 시간, 분 정하기
  const [selectedOption, setSelectedOption] =
    useState('option1');

  const [unavailableTimes, setUnavailableTimes] = useState(
    [],
  );

  const handlerRadioChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'option1') {
      setSelectedValue(10); // 기본값 설정
    } else if (e.target.value === 'option2') {
      setSelectedValue(1); // 기본값 설정
    }
  };

  useEffect(() => {
    if (speed === '급속') {
      setSelectedOption('option1');
    } else if (speed === '완속') {
      setSelectedOption('option2');
    }
  }, [speed]);

  const FAST = [
    { value: '10', name: '10분' },
    { value: '20', name: '20분' },
    { value: '30', name: '30분' },
    { value: '40', name: '40분' },
    { value: '50', name: '50분' },
    { value: '60', name: '60분' },
  ];

  const SLOW = [
    { value: '10', name: '1시간' },
    { value: '20', name: '2시간' },
    { value: '30', name: '3시간' },
    { value: '40', name: '4시간' },
    { value: '50', name: '5시간' },
    { value: '60', name: '6시간' },
    { value: '70', name: '7시간' },
    { value: '80', name: '8시간' },
  ];

  const SelectBox = (props) => {
    return (
      <select
        value={selectedValue}
        onChange={(e) =>
          setSelectedValue(Number(e.target.value))
        }
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  const calculateTotalPrice = () => {
    return speed === '급속'
      ? Math.floor(price * selectedValue * 0.1667) * 10
      : price * selectedValue;
  };

  // 모달창 결제버튼 함수
  const reservationHandler = async (e) => {
    e.preventDefault();

    // price와 selectedValue 값을 조정하는 함수
    const adjustValues = (speed, price, selectedValue) => {
      let adjustedPrice = price;
      let adjustedSelectedValue = selectedValue;

      if (speed === '급속') {
        adjustedPrice =
          Math.floor(price * selectedValue * 0.1667) * 10;
      } else if (speed === '완속') {
        adjustedPrice = price * selectedValue;
        adjustedSelectedValue = Math.floor(
          selectedValue * 6,
        );
      }

      return { adjustedPrice, adjustedSelectedValue };
    };

    // 조정된 값 가져오기
    const { adjustedPrice, adjustedSelectedValue } =
      adjustValues(speed, price, selectedValue);

    // 백엔드에서 데이터 가져오기
    const requestDTO = {
      chargeId,
      name: userName,
      address,
      phoneNumber,
      stationName,
      speed,
      price: adjustedPrice,
      startDate,
      selectedValue: adjustedSelectedValue,
      email,
    };
    console.log(requestDTO);

    // 시도
    try {
      const response = await axios.post(
        'http://localhost:8181/charge/reservation',
        requestDTO,
      );
      console.log(response.data);
      console.log(1);

      // 이상 없으면 새 결제창 염.
      const width = 700;
      const height = 800;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
        `/pay?totalPrice=${calculateTotalPrice()}`,
        '_blank',
        `width=${width},height=${height},top=${top},left=${left}`,
      );
      // 에러 발생 시 새 결제창 안염.
    } catch (error) {
      // 400에러
      if (error.response && error.response.status === 400) {
        if (
          error.response.data ===
          '이미 예약하신 충전소가 있습니다.'
        ) {
          setModalMessage(
            `'${userName}' 회원님은 이미 예약하신 충전소가 있어 추가 예약이 불가능합니다.
            \n마이페이지로 이동하시겠습니까?`,
          );
          setOnConfirm(() => () => navigate('/mypage'));
          setModalOpen(true);
        } else if (
          error.response.data === '회원 정보가 없습니다.'
        ) {
          setModalMessage(
            `회원 정보를 찾을 수 없습니다. 로그인 후 예약 신청을 해주세요.
            \n로그인 페이지로 이동하시겠습니까?`,
          );
          setOnConfirm(() => () => navigate('/Login'));
          setModalOpen(true);
        } else if (
          error.response.data ===
          '해당 시간대에 이미 예약된 충전소가 있습니다.'
        ) {
          setModalMessage(
            `해당 시간대에 이미 예약한 회원이 있습니다. 다른 시간대에 예약 신청을 해주세요.`,
          );
          setOnConfirm(null);
          setModalOpen(true);
        }
      } else {
        setModalMessage(error.message);
        setOnConfirm(null);
        setModalOpen(true);
      }
    }
  };

  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8181/charge/unavailable-times/${chargeId}`,
        );
        setUnavailableTimes(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch unavailable times:',
          error,
        );
      }
    };

    fetchUnavailableTimes();
  }, [chargeId]);

  const filterUnavailableTimes = (time) => {
    const selectedDate = new Date(time);
    return !unavailableTimes.some((unavailable) => {
      const startTime = new Date(unavailable.startTime);
      const endTime = new Date(unavailable.endTime);
      return (
        selectedDate >= startTime && selectedDate <= endTime
      );
    });
  };

  const getTimeClassName = (time) => {
    const selectedDate = new Date(time);
    const isUnavailable = unavailableTimes.some(
      (unavailable) => {
        const startTime = new Date(unavailable.startTime);
        const endTime = new Date(unavailable.endTime);
        return (
          selectedDate >= startTime &&
          selectedDate <= endTime
        );
      },
    );
    return isUnavailable ? styles.unavailableTime : '';
  };

  return (
    <>
      <ModalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirm}
        message={modalMessage}
      />
      <div
        className={styles.formWrapper}
        style={{ fontFamily: 'font2' }}
      >
        <form
          className={styles.reservationCharge}
          onSubmit={reservationHandler}
        >
          {userName ? (
            <>
              <div className={styles.flex}>
                <div className={styles.column}>이름</div>
                <div className={styles.data}>
                  {userName}
                </div>
              </div>
              <div className={styles.flex}>
                <div className={styles.column}>
                  핸드폰 번호
                </div>
                <div className={styles.data}>
                  {phoneNumber}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.flex}>
                <div className={styles.column}>이름</div>
                <div
                  className={styles.data}
                  style={{
                    color: '#F18D8A',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/Login')}
                >
                  회원 정보 없음!
                </div>
              </div>
              <div className={styles.flex}>
                <div className={styles.column}>
                  핸드폰 번호
                </div>
                <div
                  className={styles.data}
                  style={{
                    color: '#F18D8A',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/Login')}
                >
                  로그인을 진행해주세요.
                </div>
              </div>
            </>
          )}
          <div className={styles.flex}>
            <div className={styles.column}>충전소 이름</div>
            <div className={styles.data}>{stationName}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>충전소 위치</div>
            <div className={styles.data}>{address}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>충전 타입</div>
            <div className={styles.data}>{type}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>
              예약 날짜 및 시간
            </div>
            <DatePicker
              className={styles.datePicker}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              shouldCloseOnSelect
              minDate={today}
              maxDate={addDays(today, 2)}
              filterTime={(time) =>
                filterPassedTime(time) &&
                filterUnavailableTimes(time)
              }
              timeIntervals={10}
              dateFormat={'yyyy년 MM월 dd일 h:mm aa'}
              timeClassName={getTimeClassName}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>충전시간</div>
            {selectedOption === 'option1' && (
              <SelectBox options={FAST} defaultValue='10' />
            )}
            {selectedOption === 'option2' && (
              <SelectBox options={SLOW} defaultValue='1' />
            )}
            <div
              className={`{styles.formCheck} {styles.formCheckInline}`}
              style={{ marginLeft: '16px' }}
            >
              <input
                className={styles.formCheckInput}
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio1'
                value='option1'
                checked={selectedOption === 'option1'}
                onChange={handlerRadioChange}
                disabled
              />
              <label className={styles.checkLabel}>
                급속
              </label>
            </div>
            <div
              className={`${styles.formCheck} ${styles.formCheckInline}`}
            >
              <input
                className={styles.formCheckInput}
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio2'
                value='option2'
                checked={selectedOption === 'option2'}
                onChange={handlerRadioChange}
                disabled
              />
              <label className={styles.checkLabel}>
                완속
              </label>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>가격</div>
            <div className={styles.data}>
              {calculateTotalPrice()}원 (약{' '}
              {speed === '급속'
                ? parseFloat(
                    (
                      Math.floor(
                        selectedValue * 1.667 * 10,
                      ) / 10
                    ).toFixed(1),
                  )
                : selectedValue}
              kWh)
            </div>
          </div>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              margin: '10px',
            }}
          >
            <button className={style.publicBtn}>
              <div>
                <span className={style.payButton}>
                  결제하기
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationModal;
