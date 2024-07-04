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

const Notilist = () => {
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

  const [notiList, setNotiList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const fetchNotiList = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8181/noti/info',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotiList(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotiList();
  }, []);

  const handleHitClick = (noti) => {
    const updatedNoti = { ...noti, hits: noti.hits + 1 };
    navigate(`/noti/${updatedNoti.num}`, {
      state: {
        header: updatedNoti.header,
        contents: updatedNoti.contents,
        hits: updatedNoti.hits,
      },
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
      {error && (
        <p style={{ color: 'red' }}> Error: {error}</p>
      )}
      <div className='noticontent'>
        <div className='notibody'>
          <div style={{ width: '10%' }}>글번호</div>
          <div style={{ width: '45%' }}>제목</div>
          <div style={{ width: '10%' }}>작성자</div>
          <div style={{ width: '20%' }}>작성일</div>
          <div style={{ width: '15%' }}>조회수</div>
        </div>
        {notiList.map((noti) => (
          <div className='notilist' key={noti.num}>
            <div style={{ width: '10%' }}>{noti.num}</div>
            <div
              onClick={() => handleHitClick(noti)}
              style={{ width: '45%', cursor: 'pointer' }}
            >
              {noti.header}
            </div>
            <div style={{ width: '10%' }}>
              {noti.writer}
            </div>
            <div style={{ width: '20%' }}>
              {noti.datetime}
            </div>
            <div style={{ width: '15%' }}>{noti.hits}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notilist;
