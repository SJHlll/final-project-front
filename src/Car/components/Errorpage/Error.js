import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate('/choose');
  };
  return (
    <>
      <div
        style={{
          fontSize: 30,
          color: 'black',
        }}
      >
        잘못된 URL입니다
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
