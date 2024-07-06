import React, { useState } from 'react';
import EventAddModal from './EventAddModal'; // EventAddModal 컴포넌트 경로

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [events, setEvents] = useState([]); // 이벤트 목록 상태

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 이벤트 추가 처리
  const handleAddEvent = (event) => {
    setEvents([...events, event]); // 새 이벤트를 기존 이벤트 목록에 추가
    handleCloseModal(); // 모달 닫기
  };

  return (
    <div>
      <button onClick={handleOpenModal}>이벤트 추가</button>
      <EventAddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddEvent={handleAddEvent}
      />
      <div>
        {events.length === 0 && (
          <p>등록된 이벤트가 없습니다.</p>
        )}
        {events.map((event, index) => (
          <div key={index} className='eventItem'>
            <h3>{event.title}</h3>
            {event.image && (
              <img
                src={event.image}
                alt='Event'
                style={{
                  maxWidth: '100px',
                  maxHeight: '100px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
