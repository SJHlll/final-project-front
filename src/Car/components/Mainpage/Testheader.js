import React, { useState } from 'react';
import './Testheader.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Testheader = () => {
  const navigate = useNavigate();
  const [State, Setstate] = useState('');
  const onClick = (index, text) => {
    navigate(text);
    Setstate(index);
  };

  const onclick = () => {
    navigate('/');
  };
  const click = () => {
    navigate('/Login');
  };
  return (
    <div className='Testheader'>
      <div className='logo' onClick={onclick} />
      {/* 탭형식의 메뉴 구성으로 로고에 홈 url이 안먹음 */}

      <div className='tabline'>
        <button
          className={State === 1 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(1, '/')}
        >
          Home
        </button>
        <button
          className={State === 2 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(2, '/car/res')}
        >
          전기차 렌트
        </button>
        <button
          className={State === 3 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(3, '/charge/list')}
        >
          충전소 보기
        </button>
        <button
          className={State === 4 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(4, '/charge/reservation')}
        >
          충전소 예약
        </button>
        <button
          className={State === 5 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(5, '/noti')}
        >
          이용방법
        </button>
        <button
          className={State === 6 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(6, '/event')}
        >
          이벤트
        </button>
        <button
          className={State === 7 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(7, '/review')}
        >
          이용후기
        </button>
        <button
          className={State === 8 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(8, '/mypage')}
        >
          마이페이지
        </button>
        <button className='loginbtn' onClick={click}>
          로그인
        </button>
        <div className='logoutbtn'>
          <p>Logout</p>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className='logouticon'
          />
        </div>
      </div>
    </div>
  );
};

export default Testheader;
