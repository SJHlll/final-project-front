import { addDays, setHours, setMinutes } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import '../scss/ReservationModal.scss';
import { Button } from 'reactstrap';
import OpenTossPayments from '../../../components/pay/OpenTossPayments';

const ReservationModal = ({
  name,
  address,
  speed,
  type,
  price,
}) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const [selectedValue, setSelectedValue] = useState(10);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // submit 이벤트 핸들러
  const reservationHandler = (e) => {
    e.preventDefault();
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

  return (
    <>
      <div className='form-wrapper'>
        <form
          className='reservation-charge'
          onSubmit={reservationHandler}
        >
          <div className='flex'>
            <div className='column'>이름</div>
            <div className='data'>OOO</div>
          </div>
          <div className='flex'>
            <div className='column'>핸드폰 번호</div>
            <div className='data'>010-0000-0000</div>
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
              minDate={new Date()}
              maxDate={addDays(new Date(), 2)}
              filterTime={filterPassedTime}
              timeIntervals={10} // 10분 단위
              dateFormat={'yyyy년 MM월 dd일 aa hh:mm'}
            />
          </div>
          <div className='flex'>
            <div className='column'>충전소 이름</div>
            <div className='data'>{name}</div>
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
            <div className='column'>충전량</div>
            <div className='form-check form-check-inline'>
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
            <div className='column'>충전시간</div>
            {selectedOption === 'option1' && (
              <SelectBox options={FAST} defaultValue='10' />
            )}
            {selectedOption === 'option2' && (
              <SelectBox options={SLOW} defaultValue='1' />
            )}
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
            <Button
              variant='outlined'
              color='success'
              size='small'
              style={{ marginLeft: 'auto' }}
            >
              <OpenTossPayments
                totalPrice={calculateTotalPrice()}
              />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReservationModal;
