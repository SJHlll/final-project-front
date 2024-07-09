import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import EventAddModal from './EventAddModal';
import Frame from '../Frame';
import AuthContext from '../../../../util/AuthContext';
import { API_BASE_URL } from '../../../../config/host-config';
import EventBtn from './EventBtn';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toList = () => navigate('/events');

  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const { role } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const API_EVENT_URL = `${API_BASE_URL}/events/list/${id}`;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(API_EVENT_URL);
        setEvent(res.data);
        console.log('res-data: ', res.data);
      } catch (err) {
        console.error('Error fetching event: ', err);
      }
    };

    fetchEvent();
  }, [API_EVENT_URL]);

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
      console.error('Error deleting event:', err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const {
    content: img,
    title,
    eventCategory: status,
  } = event;

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

          <div className={styles.eventDetailButtons}>
            <button
              style={{
                backgroundColor: '#fff',
                border: '0px',
                fontSize: '50px',
                padding: '0px 30px',
                color: 'black',
              }}
              className={`${style.publicBtn} ${styles.updateButton}`}
              onClick={() =>
                navigate(
                  `/events/${parseInt(id, 10) - 1}`,
                  { state: { id: parseInt(id, 10) - 1 } },
                )
              }
            >
              &lt;
            </button>

            <div className={styles.eventDetailTitle}>
              {title}
            </div>

            <button
              style={{
                backgroundColor: '#fff',
                border: '0px',
                fontSize: '50px',
                padding: '0px 30px',
                color: 'black',
              }}
              className={`${style.publicBtn} ${styles.updateButton}`}
              onClick={() =>
                navigate(
                  `/events/${parseInt(id, 10) + 1}`,
                  { state: { id: parseInt(id, 10) + 1 } },
                )
              }
            >
              &gt;
            </button>
          </div>

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
