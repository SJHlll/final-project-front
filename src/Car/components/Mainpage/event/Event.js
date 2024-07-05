import React, { useState } from 'react';
import './Event.scss';
import Eventlist from './Eventlist'; // 실제 파일 이름과 일치시킴
import EventAddModal from './EventAddModal';

function Event() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return React.createElement(
    'div',
    { className: 'mainContainer' },
    React.createElement(
      'div',
      { className: 'contentLine' },
      React.createElement(
        'div',
        { className: 'eventBody' },
        React.createElement(Eventlist, null), // 실제 파일 이름과 일치시킴
      ),
      React.createElement(
        'button',
        {
          className: 'publicBtn eventButton',
          onClick: openModal,
        },
        '추가',
      ),
      React.createElement(
        'button',
        { className: 'publicBtn eventButton' },
        '수정',
      ),
      React.createElement(
        'button',
        { className: 'publicBtn eventButton' },
        '삭제',
      ),
    ),
    React.createElement(EventAddModal, {
      isOpen: isModalOpen,
      onClose: closeModal,
    }),
  );
}

export default Event;
