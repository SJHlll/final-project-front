import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import EventAddModal from './EventAddModal';
import Frame from '../Frame';
import AuthContext from '../../../../util/AuthContext';

const EventDetail = () => {
  const location = useLocation();
  const { id, img, title, status } = location.state || {};
  const navigate = useNavigate();
  const toList = () => navigate('/events');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const { role } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN');

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

  return (
    <Frame>
      <div
        className='eventdetailscroll'
        style={{
          // padding: '1% 5%',
          border: '1px solid black',
          width: '70%',
          margin: '0 auto',
          overflow: 'auto',
          height: '2000px',
        }}
      >
        <div className={styles.eventDetailHeader}>
          <div
            className={`${styles.eventCurrent} ${styles.marginBox}`}
          >
            {status === 'ACTIVE_EVENT'
              ? '진행중'
              : status === 'END_EVENT'
                ? '종료'
                : null}
          </div>
          <div className={styles.eventDetailTitle}>
            {title}
          </div>
          <div
            className={`${styles.flexBox} ${styles.marginBox}`}
          >
            <button
              style={{
                marginTop: '30%',
              }}
              className={style.publicBtn}
              onClick={toList}
            >
              목록
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
    </Frame>
  );
};

export default EventDetail;
