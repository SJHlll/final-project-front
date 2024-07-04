import React, { useState } from 'react';
import styles from './Event.module.scss';
import { useNavigate } from 'react-router-dom';
import style from '../../../../scss/Button.module.scss';import EventDetail from './EventDetail';

const Eventlist = ({ eventList, remove }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  const Notilist = [
    {
      id: 1,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event1.jpg',
      title: '렌트카 하면 커피',
      status: '진행중',
    },
    {
      id: 2,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event3.jpg',
      title: '회원가입 시 할인',
      status: '진행중',
    },
    {
      id: 3,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event2.jpg',
      title: '열번충전 -> 기프티콘',
      status: '진행중',
    },
    {
      id: 4,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event4.png',
      title: '이용후기 남기면 확률1일이용권',
      status: '진행중',
    },
    {
      id: 5,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event6.png',
      title: '생일 이벤트',
      status: '진행중',
    },
    {
      id: 6,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/Event/event5.png',
      title: '가족과 함께 안전하게! 할인 쿠폰 증정',
      status: '진행중',
    },
  ];

  // 상세보기 들어감
  const handleClick = (item) => {
    navigate(`/event/${item.id}`);
    <EventDetail
      key={item.id}
      item={item}
      remove={remove}
    />;
  };

  // 필터링 진행중 / 종료
  const filteredList =
    activeTab === '전체'
      ? Notilist
      : Notilist.filter(
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
        <div className={styles.notiParent}>
          {filteredList.map((item) => (
            <div
              className={styles.notiItem}
              key={item.id}
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
