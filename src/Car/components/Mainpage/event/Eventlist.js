import React from 'react';
import './Eventlist.scss';
import { useNavigate } from 'react-router-dom';

const Eventlist = () => {

  const navigate = useNavigate();

  const eventlistdummy = [
    {
      id: 1,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      content: '내용내용',
    },
    {
      id: 25,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      content: '내용내용',
    },
    {
      id: 3,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      content: '내용내용',
    },
    {
      id: 4,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      content: '내용내용',
    },
    {
      id: 5,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner1.png',
      content: '내용내용',
    },
    {
      id: 6,
      img: 'https://plugngo.s3.ap-northeast-2.amazonaws.com/eventbanner2.png',
      content: '내용내용',
    },
  ];

  // 상세보기 들어감
  const handleClick = (item) => {
    navigate(`/event/${item.id}`, {
      state: { img: item.img, content: item.content },
    });
  };

  return (
    <>
      <div
        className='eventheader'
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          border: '0.1px solid grey',
          width: '150px',
          padding: '10px',
          textAlign: 'center',
          borderRadius: '5px',
          marginBottom: '2%',
        }}
      >
        이벤트
      </div>
      <div
        className='eventparent'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {eventlistdummy.map((item) => (
          <div
            className='eventlist'
            style={styles}
            onClick={() => handleClick(item)}
            key={item.id}
          >
            <img
              src={item.img}
              alt={item.content}
              style={{
                width: '100%',
                height: '70%',
                objectFit: 'cover',
              }}
            />
            <p className='eventp'>{item.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Eventlist;

const styles = {
  width: '27%', // 수정된 너비 설정
  height: '300px',
  textAlign: 'center',
  marginTop: '1%',
  cursor: 'pointer',
};
