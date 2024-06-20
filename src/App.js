import { Route, Routes } from 'react-router-dom';
import Login from './components/user/Login';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import NaverLoginHandler from './components/user/NaverLoginHandler';
import React from 'react';
import './App.scss';
import Choose from './Car/components/Mainpage/Choose';
import Carhome from './Car/components/Mainpage/Carhome';
import Carevent from './Car/components/CarHeader/Carevent';
import Carnoti from './Car/components/CarHeader/Carnoti';
import Carres from './Car/components/CarHeader/Carres';
import Mypage from './Car/components/Mainpage/Mypage';
import Carreview from './Car/components/CarHeader/Carreview';
import Error from '../src/Car/components/Errorpage/Error';
import Loginpage from '../src/Car/components/Mainpage/Loginpage';
// import ChargeStation from './charge/components/charge_station/ChargeStation';
// import Header from './charge/Header/Header';
import ChargeMain from './charge/Categori/main/ChargeMain';
import Test from './charge/Test';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* 테스트 로그인페이지 */}
        <Route path='/testlogin' element={<Loginpage />} />

        {/* 공통 로그인페이지 */}
        <Route exact path='/' element={<Login />} />

        {/* 카카오 로그인페이지 */}
        <Route
          path='/oauth/kakao'
          element={<KakaoLoginHandler />}
        />
        {/* 네이버 로그인페이지 */}
        <Route
          path='/oauth/naver'
          element={<NaverLoginHandler />}
        />
        {/* 구글 로그인페이지 */}

        {/* 렌트카, 충전소 선택페이지 */}
        <Route path='/choose' element={<Choose />} />
        <Route path='/car/home' element={<Carhome />} />

        {/* 충전소 페이지 */}
        <Route
          path='/charge/home'
          element={<ChargeMain />}
        />

        {/* 차 렌트 페이지 */}
        <Route path='/car/res' element={<Carres />} />
        <Route path='/car/noti' element={<Carnoti />} />
        <Route path='/car/event' element={<Carevent />} />
        <Route path='/car/review' element={<Carreview />} />

        {/* 마이페이지 */}
        <Route path='/mypage' element={<Mypage />} />

        {/* 에러페이지 */}
        <Route path='/*' element={<Error />} />

        {/* 충전소 메인 페이지 */}
        <Route
          path='/charge/main'
          element={<ChargeMain />}
        />
        <Route path='/charge/test' element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
