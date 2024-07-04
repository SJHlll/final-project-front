import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styles from './Event.module.scss';

const EventDetail = ({ item, remove }) => {
  const location = useLocation();
  const { id } = useParams();
  const { img, title, status } = location.state || {};
  const navigate = useNavigate();
  const toList = () => {
    navigate('/event');
  };

  return (
    <>
      <div className={styles.maincontainer}>
        <div className={styles.contentline}>
          <div className={styles.eventDetailHeader}>
            <div
              className={`${styles.eventCurrent} ${styles.marginBox}`}
            >
              {status}
            </div>
            <div className={styles.eventDetailTitle}>
              {title}
            </div>
            <div
              className={`${styles.flexBox} ${styles.marginBox}`}
            >
              <div>글번호</div>
              <div>{id}</div>
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
            <button
              className={`${styles.publicBtn} ${styles.eventButton}`}
            >
              수정
            </button>
            <button
              className={`${styles.publicBtn} ${styles.eventButton}`}
            >
              삭제
            </button>
            <button
              className={styles.publicBtn}
              onClick={toList}
            >
              목록
            </button>
            <button
              className='pulic-btn'
              onClick={() => remove(id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
