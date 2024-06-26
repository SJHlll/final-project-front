// import React, { useState, useEffect } from 'react';
// import './Notilist.scss';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 10;
// `;

// const Notilist = () => {
//   const [cancel, setCancel] = useState(false);
//   // const [isReservation, setIsReservaion] = useState(false); // 예약 존재 여부

//   const toggle = () => {
//     setCancel(!cancel);
//   };

//   const button = () => (
//     <div style={{ width: '100%', textAlign: 'center' }}>
//       <button className='public-btn' onClick={toggle}>
//         예약 취소
//       </button>
//     </div>
//   );
//   const CancelCharge = () => (
//     <ModalBackground>
//       <Modal isOpen={cancel} toggle={toggle}>
//         <ModalBody>
//           <div style={{ fontFamily: 'font2' }}>
//             <div className='content'>
//               <div>예약을 취소하시겠습니까?</div>
//             </div>
//             <div className='flex modal-button'>
//               <button
//                 className='public-btn cancel-charge-btn'
//                 onClick={cancelReservation}
//               >
//                 예약 취소
//               </button>
//               <button
//                 className='public-btn cancel-charge-btn'
//                 onClick={toggle}
//               >
//                 뒤로 가기
//               </button>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>
//     </ModalBackground>
//   );
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1;
//   const day = currentDate.getDate();
//   const hours = currentDate.getHours();
//   const minutes = currentDate.getMinutes();
//   const seconds = currentDate.getSeconds();

//   const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

//   function createData(
//     num,
//     header,
//     contents,
//     writer,
//     datetime,
//     hits,
//   ) {
//     return {
//       num,
//       header,
//       contents,
//       writer,
//       datetime,
//       hits,
//     };
//   }
//   const initialRows = [
//     createData(
//       1,
//       '제목',
//       '내용1',
//       '관리자',
//       formattedDate,
//       0,
//     ),
//     createData(
//       2,
//       '제목2',
//       '내용2',
//       '관리자',
//       formattedDate,
//       0,
//     ),
//     createData(
//       3,
//       '제목3',
//       '내용3',
//       '관리자',
//       formattedDate,
//       0,
//     ),
//     createData(
//       4,
//       '제목4',
//       '내용4',
//       '관리자',
//       formattedDate,
//       0,
//     ),
//     createData(
//       5,
//       '제목5',
//       '내용5',
//       '관리자',
//       formattedDate,
//       0,
//     ),
//   ];

//   // Load hits from localStorage or set initial hits
//   const loadHits = () => {
//     const storedHits = JSON.parse(
//       localStorage.getItem('hits'),
//     );
//     if (storedHits) {
//       return initialRows.map((row) => {
//         const storedHit = storedHits.find(
//           (hit) => hit.num === row.num,
//         );
//         return storedHit
//           ? { ...row, hits: storedHit.hits }
//           : row;
//       });
//     }
//     return initialRows;
//   };

//   const [Hit, setHits] = useState(loadHits());
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('hits', JSON.stringify(Hit));
//   }, [Hit]);

//   const handleHitClick = (noti) => {
//     const updatedRows = Hit.map((row) =>
//       row.num === noti.num
//         ? { ...row, hits: row.hits + 1 }
//         : row,
//     );
//     setHits(updatedRows);
//     const updatedNoti = { ...noti, hits: noti.hits + 1 };
//     navigate(`/noti/${updatedNoti.num}`, {
//       state: {
//         header: updatedNoti.header,
//         contents: updatedNoti.contents,
//         hits: updatedNoti.hits,
//       },
//     });
//   };

//   return (
//     <>
//       <header
//         style={{
//           fontSize: '24px',
//           fontWeight: 'bold',
//           border: '0.1px solid grey',
//           width: '150px',
//           padding: '10px',
//           textAlign: 'center',
//           borderRadius: '5px',
//           marginBottom: '1%',
//         }}
//       >
//         이용방법
//       </header>
//       <div className='noticontent'>
//         <div className='notibody'>
//           <div style={{ width: '10%' }}>글번호</div>
//           <div style={{ width: '45%' }}>제목</div>
//           <div style={{ width: '10%' }}>작성자</div>
//           <div style={{ width: '20%' }}>작성일</div>
//           <div style={{ width: '15%' }}>조회수</div>
//         </div>
//         {Hit.map((noti) => (
//           <div className='notilist' key={noti.num}>
//             <div style={{ width: '10%' }}>{noti.num}</div>
//             <div
//               onClick={() => handleHitClick(noti)}
//               style={{ width: '45%', cursor: 'pointer' }}
//             >
//               {noti.header}
//             </div>
//             <div style={{ width: '10%' }}>
//               {noti.writer}
//             </div>
//             <div style={{ width: '20%' }}>
//               {noti.datetime}
//             </div>
//             <div style={{ width: '15%' }}>{noti.hits}</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Notilist;
