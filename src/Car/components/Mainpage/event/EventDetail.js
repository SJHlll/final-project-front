import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import EventAddModal from './EventAddModal';
import Frame from '../Frame';
import AuthContext from '../../../../util/AuthContext';
import { API_BASE_URL } from '../../../../config/host-config';

const EventDetail = () => {
  const location = useLocation();
  const { id, img, title, status } = location.state || {};
  const navigate = useNavigate();
  const toList = () => navigate('/events');

  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] =
    useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const { role } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const API_EVENT_URL = API_BASE_URL + `/events/list`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(API_EVENT_URL);
        console.log(`url : ${API_EVENT_URL}`);

        const eventsList = res.data;
        console.log('resData: ', res.data);
        console.log('eventList: ', eventsList);
        console.log('id: ', id);
        console.log('eventsLength:', events.length);

        setEvents(eventsList);
        const index = events.findIndex(
          (event) => event.id === id,
        );

        console.log('index: ', index);
        console.log('Event ID: ', id);
        if (index !== -1) {
          setCurrentEventIndex(index);
        } else {
          console.error(
            'Current event ID not found in the event list',
          );
        }
      } catch (err) {
        console.log('Error fetching events: ', err);
      }
    };

    fetchEvents();
  }, [id]);

  const removeEvent = async () => {
    try {
      await axios.delete(
        `http://localhost:8181/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('삭제 완료');
      navigate('/events');
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousEvent = () => {
    if (currentEventIndex > 0) {
      const previousEventId =
        events[currentEventIndex - 1].id;
      navigate(`/events/${previousEventId}`, {
        state: events[currentEventIndex - 1],
      });
    }
  };

  const goToNextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      const nextEventId = events[currentEventIndex + 1].id;
      navigate(`/events/${nextEventId}`, {
        state: events[currentEventIndex + 1],
      });
    }
  };

  const newLocal = '-10';
  return (
    <Frame>
      <div
        style={{
          border: '1px solid black',
          width: '70%',
          margin: '0 auto',
          overflow: 'auto',
        }}
      >
        <div className={styles.eventDetailHeader}>
          <div
            className={`${styles.eventCurrent} ${styles.marginBox}`}
          >
            {status === 'ACTIVE_EVENT'
              ? '진행 중'
              : status === 'END_EVENT'
                ? '종료'
                : null}
          </div>
          <button
            style={{
              backgroundColor: '#fff',
              border: '0px',
              marginRight: '30px',
              fontSize: '50px',
              padding: '0px 30px',
              color: 'black',
            }}
            className={`${style.publicBtn} ${styles.updateButton}`}
            onClick={goToPreviousEvent}
            disabled={currentEventIndex <= 0} // 이전 버튼 비활성화 조건
          >
            &lt;
          </button>
          <div className={styles.eventDetailTitle}>
            {title}
          </div>
          <button
            className={`${style.publicBtn} ${styles.updateButton}`}
            style={{
              backgroundColor: '#fff',
              border: '0px',
              fontSize: '50px',
              marginLeft: '30px',
              padding: '0px 30px',
              color: 'black',
            }}
            onClick={goToNextEvent}
            disabled={
              currentEventIndex >= events.length - 1
            } // 다음 버튼 비활성화 조건
          >
            &gt;
          </button>

          <div
            className={`${styles.flexBox} ${styles.marginBox}`}
          >
            <button
              style={{
                border: '0px solid black',
                backgroundColor: '#fff',
                color: 'black',
                padding: '20px',
              }}
              className={style.publicBtn}
              onClick={toList}
            >
              목록보기
            </button>
          </div>
        </div>
        <div className={styles.eventDetailBody}>
          {img && (
            <img
              className={styles.eventDetailImg}
              src={img}
              alt={title}
            />
          )}

          <div className={styles.actionButtons}>
            {role === 'ADMIN' && (
              <>
                <button
                  className={`${style.publicBtn} ${styles.updateButton}`}
                  onClick={openModal}
                >
                  수정
                </button>
                <button
                  className={`${style.publicBtn} ${styles.deleteButton}`}
                  onClick={removeEvent}
                >
                  삭제
                </button>
              </>
            )}

            {isModalOpen && (
              <EventAddModal
                isOpen={isModalOpen}
                toggle={closeModal}
                eventId={id}
                eventTitle={title}
                eventImage={img}
                isEditMode={true}
              />
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default EventDetail;
