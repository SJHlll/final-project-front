import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo_charge.png';

const Header = () => {
  const navigate = useNavigate();

  const click = (text) => {
    navigate(text);
  };
  // 추가
  const headerItem = [
    {
      name: '충전소보기',
      navigate: '/Charge/reserve',
    },
    {
      name: '예약하기',
      navigate: '/Charge/howToUse',
    },
    {
      name: '이용방법',
      navigate: '/Charge/noticeEvents',
    },
    {
      name: '이용후기',
      navigate: '/Charge/reviews',
    },
    {
      name: '렌트카',
      navigate: '/Car/main',
    },
    {
      name: 'MyPage',
      navigate: '/Car/mypage',
    },
  ];

  return (
    <div className='Charge_header'>
      <div className='charge_logo'>
        <img
          className='Logo'
          src={logo}
          onClick={() => click('/charge/main/')}
        />
      </div>

      <div className='charge_cate'>
        {headerItem.map((item, i) => {
          return (
            <div
              key={i}
              className='list'
              onClick={() => {
                navigate(`${item.navigate}`);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
