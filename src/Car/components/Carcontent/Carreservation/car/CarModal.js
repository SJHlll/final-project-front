import React, { useState } from 'react';
import CarCalendar from './CarCalendar';
import '../car/reservation_css/CarModal.scss';

const CarModal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {/* 버튼을 클릭하면 modal이 true로 바뀐다. */}

      <button className='reserBtn' onClick={toggleModal}>
        예약하기
      </button>

      {/* modal이 true일 때만 CarCalendar를 보여준다. */}
      {modal && (
        <div
          className='modal-overlay'
          onClick={toggleModal}
        >
          <div
            className='modal-content'
            onClick={(e) => e.stopPropagation()}
          >
            <CarCalendar closeModal={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarModal;
