import logo from './logo.svg';
import './App.css';
import Homepage from './components/mainpage/Homepage';
import { Route, Routes } from 'react-router-dom';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';
import NaverLoginHandler from './components/user/NaverLoginHandler';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Homepage />} />
      <Route path='/oauth/kakao' element={<KakaoLoginHandler />} />
      <Route path='/oauth/naver' element={<NaverLoginHandler />} />
    </Routes>
  );
}

export default App;
