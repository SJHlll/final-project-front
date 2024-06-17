import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Choose from './Car/components/Mainpage/Choose';
import Carhome from './Car/components/Mainpage/Carhome';
import Carevent from './Car/components/CarHeader/Carevent';
import Carnoti from './Car/components/CarHeader/Carnoti';
import Carres from './Car/components/CarHeader/Carres';
import Mypage from './Car/components/Mainpage/Mypage';
import Carreview from './Car/components/CarHeader/Carreview';
import Error from '../src/Car/components/Errorpage/Error';
import Loginpage from '../src/Car/components/Mainpage/Loginpage';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        {/* 공동페이지 */}
        <Route exact path='/' element={<Loginpage />} />
        <Route path='/car/home' element={<Carhome />} />
        <Route path='/choose' element={<Choose />} />

        {/* 마이페이지 */}
        <Route path='/mypage' element={<Mypage />} />

        {/* 차 렌트 페이지 */}
        <Route path='/car/res' element={<Carres />} />
        <Route path='/car/noti' element={<Carnoti />} />
        <Route path='/car/event' element={<Carevent />} />
        <Route path='/car/review' element={<Carreview />} />

        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
