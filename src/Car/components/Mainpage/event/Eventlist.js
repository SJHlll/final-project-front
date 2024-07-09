import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';

const Eventlist = ({ eventList, onEventClick }) => {
  const [activeTab, setActiveTab] = useState('전체');
  const navigate = useNavigate();

  // 상세보기로 이동
  const handleClick = (item) => {
    if (onEventClick) {
      onEventClick(item.eventNo);
    }
  };

  // 필터링 진행중 / 종료
  const filteredList =
    activeTab === '전체'
      ? eventList.reverse()
      : eventList
          .filter(
            (item) => item.eventCategory === activeTab,
          )
          .reverse();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.eventlistContainer}>
        <div className={styles.tabs}>
          <button
            className={
              activeTab === '전체' ? styles.active : ''
            }
            onClick={() => handleTabClick('전체')}
          >
            전체 이벤트보기
          </button>
          <button
            className={
              activeTab === 'ACTIVE_EVENT'
                ? styles.active
                : ''
            }
            onClick={() => handleTabClick('ACTIVE_EVENT')}
          >
            진행 중인 이벤트보기
          </button>
          <button
            className={
              activeTab === 'END_EVENT' ? styles.active : ''
            }
            onClick={() => handleTabClick('END_EVENT')}
          >
            종료된 이벤트보기
          </button>
        </div>
        <div className={styles.eventParent}>
          {filteredList.map((item) => (
            <div
              className={styles.eventItem}
              key={item.eventNo}
              onClick={() => handleClick(item)}
            >
              <img src={item.content} alt={item.title} />
              <span>
                <span
                  className={
                    item.eventCategory === 'ACTIVE_EVENT'
                      ? styles.active
                      : styles.done
                  }
                >
                  {item.eventCategory === 'ACTIVE_EVENT'
                    ? '진행중'
                    : '종료'}
                </span>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Eventlist;
