import React from 'react';
import styles from './Notilist.module.scss';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Notilist = ({ notiList, fetchNotiList }) => {
  const navigate = useNavigate();

  const handleHitClick = async (list) => {
    try {
      console.log(list.notiId);
      await axios.patch(
        `http://plugngo.site/noti/views/${list.notiId}`,
      );
      fetchNotiList();
      navigate(`${list.notiId}`, {
        state: {
          header: list.notiTitle,
          contents: list.notiContent,
          views: list.views + 1,
          notiId: list.notiId,
        },
      });
    } catch (err) {
      console.error('Error updating views: ', err.message);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: false,
    });
  };

  return (
    <>
      <header
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          border: '0.1px solid grey',
          width: '150px',
          padding: '10px',
          textAlign: 'center',
          borderRadius: '5px',
          marginBottom: '1%',
        }}
      >
        이용방법
      </header>
      <div className={styles.noticontent}>
        <div className={styles.notibody}>
          <div style={{ width: '10%' }}>글번호</div>
          <div style={{ width: '45%' }}>제목</div>
          <div style={{ width: '10%' }}>작성자</div>
          <div style={{ width: '20%' }}>작성일</div>
          <div style={{ width: '15%' }}>조회수</div>
        </div>
        {Array.isArray(notiList) &&
          notiList.map((list) => (
            <div
              className={styles.notilist}
              key={list.notiId}
            >
              <div style={{ width: '10%' }}>
                {list.notiId}
              </div>
              <div
                onClick={() => handleHitClick(list)}
                style={{
                  width: '45%',
                  cursor: 'pointer',
                }}
              >
                {list.notiTitle}
              </div>
              <div style={{ width: '10%' }}>{'관리자'}</div>
              <div style={{ width: '20%' }}>
                {formatTime(list.regDate)}
              </div>
              <div style={{ width: '15%' }}>
                {list.views}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Notilist;
