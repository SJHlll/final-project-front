import React from 'react';
import './Choose.scss';
import Cars from '../../assets/car.png';
import charger from '../../assets/charger (2).png';
import { useNavigate } from 'react-router-dom';

const Choose = () => {
  const navigate = useNavigate();

  const click = (text) => {
    // 특정 경로로 네비게이션
    navigate(text);
  };
  return (
    <>
      <div className='chHeader'></div>
      <div className='chBody'>
        <button
          onClick={() => click('/car/home')}
          className='chbutton'
        >
          <img className='chimg' src={Cars} alt='Cars' />
          <div className='chtext'>
            전기차
            <br />
            타러가기
          </div>
        </button>
        <button
          className='chbutton2'
          onClick={() => click('/charge/home')}
        >
          <img className='chimg' src={charger} alt='Car' />
          <div className='chtext'>
            전기차
            <br />
            충전하기
          </div>
        </button>
      </div>
    </>
  );
};

export default Choose;
