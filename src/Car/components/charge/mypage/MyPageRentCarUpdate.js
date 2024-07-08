import { setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';

const MyPageRentCarUpdate = ({
  selectedCar,
  carName,
  newRentDate,
  newTurninDate,
  formatPrice,
}) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9), // 오늘 날짜에 9시 0분으로
  );

  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 0), 9), // 오늘 날짜에 9시 0분으로
  );

  return (
    <div>
      <h2>렌트카 상세</h2>
      <p>차종: {selectedCar.carName}</p>
      <p>가격: {formatPrice(selectedCar.totalPrice)}원</p>
      <p>
        <div>
          렌트 시작일 :
          <input
            type='datetime-local'
            value={newRentDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          렌트 반납일 :
          <input
            type='datetime-local'
            value={newTurninDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </p>
    </div>
  );
};

export default MyPageRentCarUpdate;
