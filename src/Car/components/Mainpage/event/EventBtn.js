import React from 'react';
import style from '../../../../scss/Button.module.scss';
import { useNavigate } from 'react-router-dom';

const EventBtn = ({ id }) => {
  const navigate = useNavigate();

  const goToPreviousEvent = () => {
    if (id) {
      const currentId = parseInt(id, 10);

      if (!isNaN(currentId)) {
        const previousEventId = currentId - 1;

        console.log(
          `Navigating to previous event: ${previousEventId}`,
        );
        navigate(`/events/${previousEventId}`, {
          state: { id: previousEventId },
        });
      } else {
        console.log('Invalid currentId:', currentId);
      }
    } else {
      console.log('No ID provided');
    }
  };

  const goToNextEvent = () => {
    if (id) {
      const currentId = parseInt(id, 10);

      if (!isNaN(currentId)) {
        const nextEventId = currentId + 1;

        console.log(
          `Navigating to next event: ${nextEventId}`,
        );
        navigate(`/events/${nextEventId}`, {
          state: { id: nextEventId },
        });
      } else {
        console.log('Invalid currentId:', currentId);
      }
    } else {
      console.log('No ID provided');
    }
  };

  return (
    <div>
      <button
        className={style.publicBtn}
        onClick={goToPreviousEvent}
      >
        뒤로 가기
      </button>
      <button
        className={style.publicBtn}
        onClick={goToNextEvent}
      >
        앞으로 가기
      </button>
    </div>
  );
};

export default EventBtn;
