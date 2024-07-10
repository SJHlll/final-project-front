import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import EventAddModal from './EventAddModal';
import Frame from '../Frame';
import AuthContext from '../../../../util/AuthContext';
import { API_BASE_URL } from '../../../../config/host-config';

const EventDetail = () => {
  const { id } = useParams(); // URL에서 id를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const toList = () => navigate('/events'); // 이벤트 목록으로 이동하는 함수

  const [event, setEvent] = useState(null); // 이벤트 데이터를 저장할 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태를 저장할 상태
  const { role } = useContext(AuthContext); // 사용자 역할을 가져옴 (예: ADMIN)
  const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 스토리지에서 토큰을 가져옴

  const API_EVENT_URL = `${API_BASE_URL}/events/list/${id}`; // 이벤트 정보를 가져올 API URL

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 정보를 가져오는 함수
    const fetchEvent = async () => {
      try {
        const res = await axios.get(API_EVENT_URL);
        setEvent(res.data); // 이벤트 데이터를 상태에 저장
        console.log('res-data: ', res.data);
      } catch (err) {
        console.error('Error fetching event: ', err);
      }
    };

    fetchEvent();
  }, [API_EVENT_URL]);

  const removeEvent = async () => {
    // 이벤트를 삭제하는 함수
    try {
      await axios.delete(
        `http://localhost:8181/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('삭제 완료'); // 삭제 완료 알림
      navigate('/events'); // 이벤트 목록으로 이동
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const openModal = () => {
    // 모달을 여는 함수
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // 모달을 닫는 함수
    setIsModalOpen(false);
  };

  if (!event) {
    // 이벤트 데이터가 로딩 중일 때
    return <div>Loading...</div>;
  }

  const {
    content: img,
    title,
    eventCategory: status,
  } = event;

  const currentId = parseInt(id, 10); // 현재 이벤트 ID를 숫자로 변환
  const previousPage = currentId - 1; // 이전 페이지 ID
  const nextPage = currentId + 1; // 다음 페이지 ID

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
            {previousPage >= 1 && (
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
                  navigate(`/events/${previousPage}`, {
                    state: { id: previousPage },
                  })
                }
              >
                &lt;
              </button>
            )}

            <div className={styles.eventDetailTitle}>
              {title}
            </div>

            {nextPage <= 10 && (
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
                  navigate(`/events/${nextPage}`, {
                    state: { id: nextPage },
                  })
                }
              >
                &gt;
              </button>
            )}
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
