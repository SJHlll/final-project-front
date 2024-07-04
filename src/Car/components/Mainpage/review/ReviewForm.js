// import React, { useContext, useState } from 'react';
// import AuthContext from '../../../../util/AuthContext';
// import axiosInstance from '../../../../config/axios-config';
// // ReviewForm 컴포넌트: 리뷰 작성 폼
// const ReviewForm = ({ onClose, onSave, selectedType }) => {
//   const [content, setContent] = useState(''); // 후기 내용 상태
//   const [error, setError] = useState(''); // 에러 메시지 상태
//   const [selectedItem, setSelectedItem] = useState(''); // 선택한 항목 (렌트카 또는 충전소)
//   const [rating, setRating] = useState(1); // 별점 상태
//   const [reviewList, setReviewList] = useState([]);

//   const { token } = useContext(AuthContext);

//   // 선택된 타입에 따른 항목 목록
//   const items =
//     selectedType === 'rental'
//       ? ['차량 1', '차량 2', '차량 3'] // 렌트카 항목
//       : ['충전소 1', '충전소 2', '충전소 3']; // 충전소 항목

//   // 후기가 변경될 때 호출되는 함수
//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.length <= 300) {
//       setContent(inputValue); // 350자 이하일 경우 후기 내용 상태 업데이트
//       setError(''); // 에러 메시지 초기화
//     } else {
//       setError('300자 이상 작성할 수 없습니다.'); // 350자 초과 시 에러 메시지 설정
//     }
//   };

//   // 선택 항목이 변경될 때 호출되는 함수
//   const handleItemChange = (e) => {
//     setSelectedItem(e.target.value); // 선택한 항목 상태 업데이트
//   };

//   // 별점이 변경될 때 호출되는 함수
//   const handleRatingChange = (e) => {
//     setRating(Number(e.target.value)); // 별점 상태 업데이트
//   };

//   // 폼 제출 시 호출되는 함수
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // 폼 제출 기본 동작 방지
//     if (selectedItem === '') {
//       window.alert(
//         `${
//           selectedType === 'rental' ? '차량' : '충전소'
//         }를 선택해주세요.`, // 항목을 선택하지 않았을 때 경고창 띄우기
//       );
//       return; // 저장 중지
//     }

//     if (content.trim().length === 0) {
//       window.alert('후기를 입력해주세요.'); // 후기가 비어 있으면 경고창 띄우기
//       return; // 저장 중지
//     }

//     if (content.length > 350) {
//       window.alert('350자 이상 작성할 수 없습니다.'); // 길이 제한 초과 시 경고창 띄우기
//       return; // 저장 중지
//     }

//     const reviewData = {
//       content,
//       rating,
//       selectedItem,
//     };

//     try {
//       const response = await axiosInstance.post(
//         'http://localhost:8181/review/car',
//         reviewData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       setReviewList([...reviewList, response.data]);
//       alert('리뷰 작성이 완성되었습니다.');
//     } catch (err) {
//       setError(err.message);
//       alert('리뷰 등록에 실패하였습니다.');
//     }

//     onSave(content, selectedItem, rating); // 부모 컴포넌트에 후기 저장 요청
//     setContent(''); // 폼 초기화
//     setSelectedItem(''); // 폼 초기화
//     setRating(1); // 폼 초기화
//   };

//   // 폼 렌더링 부분
//   return (
//     <div className='modal2'>
//       <div className='modal2-content'>
//         <span className='close' onClick={onClose}>
//           &times;
//         </span>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor='item'>{`${
//               selectedType === 'rental' ? '차량' : '충전소'
//             } 선택:`}</label>
//             <select
//               id='item'
//               value={selectedItem}
//               onChange={handleItemChange} // 항목 선택 시 호출
//             >
//               <option value=''>선택하세요</option>{' '}
//               {/* 기본 옵션 */}
//               {items.map((item, index) => (
//                 <option key={index} value={item}>
//                   {item} {/* 항목 옵션 */}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor='rating'>별점 선택:</label>
//             <select
//               id='rating'
//               value={rating}
//               onChange={handleRatingChange} // 별점 선택 시 호출
//             >
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <option key={value} value={value}>
//                   {`${value}점`} {/* 별점 옵션 */}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <textarea
//             value={content}
//             onChange={handleChange} // 후기 내용 변경 시 호출
//             placeholder='후기를 작성해주세요.' // 텍스트 영역에 표시되는 플레이스홀더
//           />
//           {error && <p className='error'>{error}</p>}{' '}
//           {/* 에러 메시지 표시 */}
//           <button type='submit'>저장</button>{' '}
//           {/* 저장 버튼 */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;
