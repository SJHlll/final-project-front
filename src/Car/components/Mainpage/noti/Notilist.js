import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import './Notilist.scss';
import { useNavigate } from 'react-router-dom';
import '../../../../scss/Button.scss';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';

const Notilist = ({ notiList, fetchNotiList }) => {
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth() + 1;
  // const day = currentDate.getDate();

  // const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} `;
  // function createData(
  //   num,
  //   header,
  //   contents,
  //   writer,
  //   datetime,
  //   hits,
  // ) {
  //   return {
  //     num,
  //     header,
  //     contents,
  //     writer,
  //     datetime,
  //     hits,
  //   };
  // }

  // const initialRows = [
  //   createData(
  //     1,
  //     '제목',
  //     '내용1',
  //     '관리자',
  //     formattedDate,
  //     0,
  //   ),
  //   createData(
  //     2,
  //     '제목2',
  //     '내용2',
  //     '관리자',
  //     formattedDate,
  //     0,
  //   ),
  //   createData(
  //     3,
  //     '제목3',
  //     '내용3',
  //     '관리자',
  //     formattedDate,
  //     0,
  //   ),
  //   createData(
  //     4,
  //     '제목4',
  //     '내용4',
  //     '관리자',
  //     formattedDate,
  //     0,
  //   ),
  //   createData(
  //     5,
  //     '제목5',
  //     '내용5',
  //     '관리자',
  //     formattedDate,
  //     0,
  //   ),
  // ];

  // const loadHits = () => {
  //   const storedHits = JSON.parse(
  //     localStorage.getItem('hits'),
  //   );
  //   if (storedHits) {
  //     return initialRows.map((row) => {
  //       const storedHit = storedHits.find(
  //         (hit) => hit.num === row.num,
  //       );
  //       return storedHit
  //         ? { ...row, hits: storedHit.hits }
  //         : row;
  //     });
  //   }
  //   return initialRows;
  // };

  // const [Hit, setHits] = useState(loadHits());
  // const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem('hits', JSON.stringify(Hit));
  // }, [Hit]);

  // const handleHitClick = (noti) => {
  //   const updatedRows = Hit.map((row) =>
  //     row.num === noti.num
  //       ? { ...row, hits: row.hits + 1 }
  //       : row,
  //   );
  //   setHits(updatedRows);
  //   const updatedNoti = { ...noti, hits: noti.hits + 1 };
  //   navigate(`/noti/${updatedNoti.num}`, {
  //     state: {
  //       header: updatedNoti.header,
  //       contents: updatedNoti.contents,
  //       hits: updatedNoti.hits,
  //     },
  //   });
  // };

  // const handleHitClick = (list) => {
  //   const updatedNoti = { ...list, views: list.views + 1 };
  //   navigate(`${updatedNoti.notiId}`, {
  //     state: {
  //       header: updatedNoti.notiTitle,
  //       contents: updatedNoti.notiContent,
  //       hits: updatedNoti.views,
  //     },
  //   });
  // };

  const navigate = useNavigate();

  const handleHitClick = async (list) => {
    try {
      await axios.patch(
        `http://localhost:8181/noti/views/${list.notiId}`,
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
            <div className={styles.notilist} key={list.notiId}>
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
                {list.regDate}
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
