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

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleOpenModal },
      '이벤트 추가',
    ),
    React.createElement(EventAddModal, {
      isOpen: isModalOpen,
      onClose: handleCloseModal,
      onAddEvent: handleAddEvent,
    }),
    React.createElement(
      'div',
      null,
      events.length === 0 &&
        React.createElement(
          'p',
          null,
          '등록된 이벤트가 없습니다.',
        ),
      events.map((event, index) =>
        React.createElement(
          'div',
          { key: index, className: 'eventItem' },
          React.createElement('h3', null, event.title),
          event.image &&
            React.createElement('img', {
              src: event.image,
              alt: 'Event',
              style: {
                maxWidth: '100px',
                maxHeight: '100px',
              },
            }),
        ),
      ),
    ),
  );
};

export default EventPage;
