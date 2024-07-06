import React, { useState } from 'react';
import styles from './Event.module.scss';
import { useNavigate } from 'react-router-dom';
import style from '../../../../scss/Button.module.scss';

const Eventlist = ({ eventList }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  // 상세보기로 이동
  const handleClick = (item) => {
    navigate(`/events/${item.eventNo}`, {
      state: {
        id: item.eventNo,
        img: item.content,
        title: item.title,
        status: item.eventCategory,
      },
    });
  };

  // 필터링 진행중 / 종료
  const filteredList =
    activeTab === '전체'
      ? eventList
      : eventList.filter(
          (item) => item.status === activeTab,
        );

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
              activeTab === '진행중' ? styles.active : ''
            }
            onClick={() => handleTabClick('진행중')}
          >
            진행 중인 이벤트보기
          </button>
          <button
            className={
              activeTab === '종료' ? styles.active : ''
            }
            onClick={() => handleTabClick('종료')}
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
                    item.status === '진행중'
                      ? styles.active
                      : styles.done
                  }
                >
                  {item.status}
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
