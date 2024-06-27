import React, { useState } from 'react';
import './Notilist.scss';
// 현재 날짜와 시간을 가져오기
const Notilist = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  function createData(num, header, writer, datetime, hits) {
    return { num, header, writer, datetime, hits };
  }
  const initialRows = [
    createData(1, '제목', '관리자', formattedDate, 0),
    createData(2, '제목2', '관리자', formattedDate, 0),
    createData(3, '제목3', '관리자', formattedDate, 0),
    createData(4, '제목4', '관리자', formattedDate, 0),
    createData(5, '제목5', '관리자', formattedDate, 0),
  ];
  const [Hit, setHits] = useState(initialRows);

  const handleHitClick = (num) => {
    const updatedRows = Hit.map((row) =>
      row.num === num
        ? { ...row, hits: row.hits + 1 }
        : row,
    );
    setHits(updatedRows);
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
        이용 방법
      </header>
      <div className='noticontent'>
        <div className='notibody'>
          <div style={{ width: '10%' }}>글번호</div>
          <div style={{ width: '45%' }}>제목</div>
          <div style={{ width: '10%' }}>작성자</div>
          <div style={{ width: '20%' }}>작성일</div>
          <div style={{ width: '15%' }}>조회수</div>
        </div>
        {Hit.map((row) => (
          <div className='notilist' key={row.num}>
            <div style={{ width: '10%' }}>{row.num}</div>
            <div
              onClick={() => handleHitClick(row.num)}
              style={{ width: '45%', cursor: 'pointer' }}
            >
              {row.header}
            </div>
            <div style={{ width: '10%' }}>{row.writer}</div>
            <div style={{ width: '20%' }}>
              {row.datetime}
            </div>
            <div style={{ width: '15%' }}>{row.hits}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Notilist;
