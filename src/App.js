import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.scss';
import Mypage from './Car/components/Mainpage/Mypage';
import Error from '../src/Car/components/Errorpage/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChargeMain from './charge/Categori/main/ChargeMain';
import Test from './charge/Test';
import ChargeStation from './charge/components/charge_station/ChargeStation';
import ReservationCharge from './charge/components/reservation_charge/ReservationCharge';
import Login from './components/user/Login';
import Noti from './Car/components/Mainpage/Noti';
import Event from './Car/components/Mainpage/Event';
import Review from './Car/components/Mainpage/Review';
import Testheader from './Car/components/Mainpage/Testheader';
import Testhome from './Car/components/Mainpage/Testhome';
import { AuthContextProvider } from './util/AuthContext';
import { ModalProvider } from '@lasbe/react-modal';
import LoginSuccess from './components/user/LoginSuccess';
import { Checkout } from './components/pay/Checkout';
import { Success } from './components/pay/Success';
import { Fail } from './components/pay/Fail';
import RegisterPage from './components/user/RegisterPage';

const App = () => {
  return (
    <ModalProvider>
      <AuthContextProvider>
        <div
          className='App'
          style={{ fontFamily: 'font2' }}
        >
          <Testheader />
          <Routes>
            {/* 메인 홈페이지 */}
            <Route exact path='/' element={<Testhome />} />
            {/* 이용방법 페이지 */}
            <Route path='/noti' element={<Noti />} />
            {/* 이벤트 페이지 */}
            <Route path='/event' element={<Event />} />
            {/* 이용후기 페이지 */}
            <Route path='/review' element={<Review />} />
            {/* 충전소 메인 페이지 */}
            <Route
              path='/charge/home'
              element={<ChargeMain />}
            />
            <Route path='/charge/test' element={<Test />} />
            {/* 충전소 페이지 */}
            <Route
              path='charge/list'
              element={<ChargeStation />}
            />
            <Route
              path='charge/reservation'
              element={<ReservationCharge />}
            />

            {/* 마이페이지 */}
            <Route path='/mypage' element={<Mypage />} />

            {/* 공통 로그인페이지 */}
            <Route path='/Login' element={<Login />} />
            {/* 카카오 로그인페이지 */}
            <Route
              path='/oauth/kakao'
              element={<LoginSuccess />} // 강아지 사진 나오면 로그인 성공
            />
            {/* 네이버 로그인페이지 */}
            <Route
              path='/oauth/naver'
              element={<LoginSuccess />} // 강아지 사진 나오면 로그인 성공
            />

            {/* 구글 로그인페이지 */}

            {/* 회원가입2 */}
            <Route
              path='/register'
              element={<RegisterPage />}
            />

            {/* 에러페이지 */}
            <Route path='/*' element={<Error />} />

            {/* 충전소 메인 페이지 */}
            <Route
              path='/charge/home'
              element={<ChargeMain />}
            />
            <Route path='/charge/test' element={<Test />} />

            {/* 결제 페이지 */}
            <Route path='/pay' element={<Checkout />} />
            <Route path='/success' element={<Success />} />
            <Route path='/fail' element={<Fail />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </ModalProvider>
  );
};

export default App;
