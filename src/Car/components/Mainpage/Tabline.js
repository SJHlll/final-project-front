import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tabline.scss';

const Tabline = () => {
  const navigate = useNavigate();
  const [State, Setstate] = useState('1');
  const onClick = (index, text) => {
    navigate(text);
    Setstate(index.toString());
  };
  return (
    <div className='tabline'>
      <button
        className={State === '1' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(1, '/')}
      >
        Home
      </button>
      <button
        className={State === '2' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(2, '/carres')}
      >
        전기차 렌트
      </button>
      <button
        className={State === '3' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(3, '/chargeinfo')}
      >
        충전소 보기
      </button>
      <button
        className={State === '4' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(4, '/chargeres')}
      >
        충전소 예약
      </button>
      <button
        className={State === '5' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(5, '/noti')}
      >
        이용방법
      </button>
      <button
        className={State === '6' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(6, '/event')}
      >
        이벤트
      </button>
      <button
        className={State === '7' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(7, '/review')}
      >
        이용후기
      </button>
      <button
        className={State === '8' ? 'tabli active' : 'tabli'}
        onClick={() => onClick(8, '/mypage')}
      >
        마이페이지
      </button>
    </div>
  );
};

export default Tabline;
