import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import React from 'react';
import './App.scss';
import Mypage from './Car/components/Mainpage/Mypage';
import Error from '../src/Car/components/Errorpage/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Car/components/user/Login';
import Noti from './Car/components/Mainpage/noti/Noti';
import Event from './Car/components/Mainpage/event/Event';
import Review from './Car/components/Mainpage/review/Review';
import Testheader from './Car/components/Mainpage/Testheader';
import Testhome from './Car/components/Mainpage/Testhome';
import { AuthContextProvider } from './util/AuthContext';
import { ModalProvider } from '@lasbe/react-modal';
import ChargeStation from './Car/components/charge/charge_station/ChargeStation';
import ReservationCharge from './Car/components/charge/reservation_charge/ReservationCharge';
import { Checkout } from './Car/components/pay/Checkout';
import { Success } from './Car/components/pay/Success';
import { Fail } from './Car/components/pay/Fail';
import Chargelist from './Car/components/Mainpage/Chargelist';
import Carreservation from './Car/components/Mainpage/carreservation/Carreservation';
import EventDetail from './Car/components/Mainpage/event/EventDetail';
import Carres from './Car/components/Mainpage/carreservation/Carres';
import UserInfoSave from './Car/components/charge/mypage/UserInfoSave';
import RegisterPage from './Car/components/user/RegisterPage';
import NotiPage from './Car/components/Mainpage/noti/Notipage';
import Loginpage from './Car/components/Mainpage/Loginpage';
import KakaoLoginHandler from './Car/components/user/KakaoLoginHandler';
import NaverLoginHandler from './Car/components/user/NaverLoginHandler';
import AdminPage from './Car/components/Mainpage/adminpage/AdminPage';
import ReviewPage from './Car/components/Mainpage/review/ReviewPage';
import ReservedStationList from './Car/components/Mainpage/adminpage/adminstation/ReservedStationList';
import ReservedCarList from './Car/components/Mainpage/adminpage/admincar/ReservedCarList';
import ReviewList from './Car/components/Mainpage/adminpage/adminreview/ReviewList';

const App = () => {
  const location = useLocation();
  // 헤더가 안보여도 되는 페이지 경로
  const hideHeaderPaths = ['/pay', '/success', '/fail'];

  return (
    <ModalProvider>
      <AuthContextProvider>
        <div
          className='App'
          style={{ fontFamily: 'font2' }}
        >
          {!hideHeaderPaths.includes(location.pathname) && (
            <Testheader />
          )}
          <Routes>
            {/* 메인 홈페이지 */}
            <Route exact path='/' element={<Testhome />} />
            {/* 전기차 예약하기 */}
            <Route
              path='/car/res'
              element={<Carreservation />}
            />
            {/* 충전소 조회 페이지 */}
            <Route
              path='charge/list'
              element={<Chargelist />}
            />
            {/* 충전소 예약 페이지 */}
            <Route
              path='charge/reservation'
              element={<ReservationCharge />}
            />
            {/* 이용방법 페이지 */}
            <Route path='/noti' element={<Noti />} />

            <Route
              path='/noti/:id'
              element={<NotiPage />}
            />
            {/* 이벤트 페이지 */}
            <Route path='/event' element={<Event />} />
            <Route
              path='/event/:id'
              element={<EventDetail />}
            />
            {/* 이용후기 페이지 */}
            <Route path='/review' element={<Review />} />
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
            <Route path='/Login' element={<Loginpage />} />

            {/* 카카오 로그인페이지 */}
            <Route
              path='/oauth/kakao'
              element={<KakaoLoginHandler />} // 로그아웃 아이콘 나오면 성공
            />
            {/* 네이버 로그인페이지 */}
            <Route
              path='/oauth/naver'
              element={<NaverLoginHandler />} // 로그아웃 아이콘 나오면 성공
            />

            {/* 구글 로그인페이지 */}

            {/* 회원가입 */}
            <Route
              path='/register'
              element={<RegisterPage />}
            />

            {/* 토스페이먼츠 */}
            <Route path='/pay' element={<Checkout />} />
            <Route path='/success' element={<Success />} />
            <Route path='/fail' element={<Fail />} />

            {/* 에러페이지 */}
            <Route path='/*' element={<Error />} />

            <Route
              path='/info'
              element={<UserInfoSave />}
            />

            {/* 어드민페이지 */}
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </ModalProvider>
  );
};

export default App;
