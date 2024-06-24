import { Route, Routes } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
//import Testmain from './Car/components/Mainpage/testCarhome/Testmain';
// import Header from './charge/Header/Header';
import ChargeMain from './charge/Categori/main/ChargeMain';
import Test from './charge/Test';
import ChargeStation from './charge/components/charge_station/ChargeStation';
import ReservationCharge from './charge/components/reservation_charge/ReservationCharge';
import { AuthContextProvider } from './util/AuthContext';
import { ModalProvider } from '@lasbe/react-modal';
import LoginSuccess from './components/user/LoginSuccess';
import Login from './components/user/Login';
import { Checkout } from './components/pay/Checkout';
import { Success } from './components/pay/Success';
import { Fail } from './components/pay/Fail';

const App = () => {
  return (
    <ModalProvider>
      <AuthContextProvider>
        <div className='App'>
          <Routes>
            {/* 공통 로그인페이지 */}
            <Route
              exact
              path='/login'
              element={<Login />}
            />

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

            {/* 렌트카, 충전소 선택페이지 */}
            <Route path='/choose' element={<Choose />} />

            {/* 충전소 페이지 */}
            <Route
              path='charge/list'
              element={<ChargeStation />}
            />
            <Route
              path='charge/reservation'
              element={<ReservationCharge />}
            />

            {/* 차 렌트 메인페이지 */}
            <Route path='/car/home' element={<Carhome />} />
            {/* 차 렌트 상세페이지 */}
            <Route path='/car/res' element={<Carres />} />
            <Route path='/car/noti' element={<Carnoti />} />
            <Route
              path='/car/event'
              element={<Carevent />}
            />
            <Route
              path='/car/review'
              element={<Carreview />}
            />

            {/* 마이페이지 */}
            <Route path='/mypage' element={<Mypage />} />

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
