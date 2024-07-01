import { addDays, setHours, setMinutes } from 'date-fns';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import '../scss/ReservationModal.scss';
// import OpenTossPayments from '../../pay/OpenTossPayments';
import '../../../../scss/Button.scss';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  // 시간, 분 정하기
  const [selectedOption, setSelectedOption] =
    useState('option1');

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
      if (error.response && error.response.status === 400) {
        console.error(error);
        alert(
          `'${userName}' 회원님은 이미 예약하신 충전소가 있어\n'${stationName}' 충전소를 예약할 수 없습니다.`,
        );
        if (
          window.confirm('마이페이지로 이동하시겠습니까?')
        ) {
          navigate('/mypage');
        }
      } else {
        console.error(error);
        alert(error);
      }
      console.log(2);
    }
  };

  return (
    <>
      <div
        className='form-wrapper'
        style={{ fontFamily: 'font2' }}
      >
        <form
          className='reservation-charge'
          onSubmit={reservationHandler}
        >
          <div className='flex'>
            <div className='column'>이름</div>
            <div className='data'>{userName}</div>
          </div>
          <div className='flex'>
            <div className='column'>핸드폰 번호</div>
            <div className='data'>{phoneNumber}</div>
          </div>
          <div className='flex'>
            <div className='column'>충전소 이름</div>
            <div className='data'>{stationName}</div>
          </div>
          <div className='flex'>
            <div className='column'>충전소 위치</div>
            <div className='data'>{address}</div>
          </div>
          <div className='flex'>
            <div className='column'>충전 타입</div>
            <div className='data'>{type}</div>
          </div>
          <div className='flex'>
            <div className='column'>예약 날짜 및 시간</div>
            <DatePicker
              className='date-picker'
              selected={startDate}
              // showIcon
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              shouldCloseOnSelect
              minDate={today}
              maxDate={addDays(today, 2)}
              filterTime={filterPassedTime}
              timeIntervals={10} // 10분 단위
              dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
            />
          </div>
          <div className='flex'>
            <div className='column'>충전시간</div>
            {selectedOption === 'option1' && (
              <SelectBox options={FAST} defaultValue='10' />
            )}
            {selectedOption === 'option2' && (
              <SelectBox options={SLOW} defaultValue='1' />
            )}
            <div
              className='form-check form-check-inline'
              style={{ marginLeft: '16px' }}
            >
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio1'
                value='option1'
                checked={selectedOption === 'option1'}
                onChange={handlerRadioChange}
                disabled
              />
              <label className='check-label'>급속</label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio2'
                value='option2'
                checked={selectedOption === 'option2'}
                onChange={handlerRadioChange}
                disabled
              />
              <label className='check-label'>완속</label>
            </div>
          </div>
          <div className='flex'>
            <div className='column'>가격</div>
            <div className='data'>
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
            <button className='public-btn'>
              <div>
                <span className='pay-button'>결제하기</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationModal;
