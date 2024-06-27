import React, { useState } from 'react';
import './Event.scss';
import { useNavigate } from 'react-router-dom';

const Eventlist = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  const Notilist = [
    {
      id: 1,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      title: '충전하는 순간, 행운의 커피를!',
      status: '진행중',
    },
    {
      id: 2,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      title: '충전할 때마다 할인 혜택!',
      status: '진행중',
    },
    {
      id: 3,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      title: '10번 충전하면 기프티콘이 내 손에!',
      status: '진행중',
    },
    {
      id: 4,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      title: '렌트카 하루 무료 이용권의 기회!',
      status: '진행중',
    },
    {
      id: 5,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      title: 'SNS로 나누면 더 커지는 혜택!',
      status: '진행중',
    },
    {
      id: 6,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      title: '가족과 함께 안전하게! 카시트 무료 증정',
      status: '진행중',
    },
  ];

  // 상세보기 들어감
  const handleClick = (item) => {
    navigate(`/event/${item.id}`, {
      state: {
        img: item.img,
        title: item.title,
        status: item.status,
      },
    });
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
      <div className='eventlist-container'>
        <div className='tabs'>
          <button
            className={activeTab === '전체' ? 'active' : ''}
            onClick={() => handleTabClick('전체')}
          >
            전체 이벤트보기
          </button>
          <button
            className={
              activeTab === '진행중' ? 'active' : ''
            }
            onClick={() => handleTabClick('진행중')}
          >
            진행 중인 이벤트보기
          </button>
          <button
            className={activeTab === '종료' ? 'active' : ''}
            onClick={() => handleTabClick('종료')}
          >
            종료된 이벤트보기
          </button>
        </div>
        <div className='noti-parent'>
          {filteredList.map((item) => (
            <div
              className='noti-item'
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <img src={item.img} alt={item.title} />
              <span>
                <span
                  className={
                    item.status === '진행중'
                      ? 'active'
                      : 'done'
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
