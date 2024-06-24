import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.scss';

const Error = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate('/');
  };
  return (
    <>
      <div
        className='errorpage'
        style={{
          fontSize: 30,
          color: 'black',
        }}
      >
        잘못된 URL입니다
        <div className='chun'></div>
        <button
          style={{
            width: 300,
            height: 300,
          }}
          onClick={click}
        >
          돌아가기
        </button>
      </div>
      ;
    </>
  );
};

export default Error;
