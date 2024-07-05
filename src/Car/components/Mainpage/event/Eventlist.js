import React, { useState } from 'react';
import styles from './Event.module.scss';
import { useNavigate } from 'react-router-dom';

const Eventlist = ({ eventList }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  // 상세보기 들어감
  const handleClick = (item) => {
    console.log('item ', item);
    console.log('eventList ', eventList);
    console.log('eventNo ', item.eventNo);

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
  // const filteredList =
  //   activeTab === '전체'
  //     ? Notilist
  //     : Notilist.filter(
  //         (item) => item.status === activeTab,
  //       );

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
        <div className={styles.notiParent}>
          {eventList.map((item) => (
            <div
              className={styles.notiItem}
              key={item.eventNo}
              onClick={() => handleClick(item)}
            >
              <img src={item.img} alt={item.title} />
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
