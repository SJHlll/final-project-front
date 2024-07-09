import React, { useContext, useEffect } from 'react';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';
import AuthContext from '../../../util/AuthContext';
import { useNavigate } from 'react-router-dom';

const KakaoLoginHandler = () => {
  console.log(
    '사용자가 동의화면을 통해 필수 정보 동의 후 kakao인증 서버에서 redirect를 진행함!',
  );

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  // URL에 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(
    window.location.href,
  ).searchParams.get('code');

  console.log('REQUEST_URL:', REQUEST_URL);
  console.log('Code:', code);

  useEffect(() => {
    // 컴포넌트가 렌더링될때 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      try {
        const res = await fetch(
          REQUEST_URL + '/kakaoLogin?code=' + code,
        );

        const {
          token,
          userName,
          email,
          phoneNumber,
          role,
          birthDay,
        } = await res.json(); // 서버에서 온 json 읽기

        // Context API를 사용하여 로그인 상태를 업데이트 합니다.
        onLogin(
          token,
          userName,
          email,
          phoneNumber,
          role,
          birthDay,
        );
        console.log('birth: ', birthDay);
        // 조건에 따라 리다이렉트
        if (!phoneNumber && !birthDay) {
          // 생년월일과 휴대폰 번호가 없는 경우
          alert(
            '카카오 로그인에 성공하셨습니다. \n마이페이지에 생년월일과 휴대폰 번호를 입력해주세요!',
          );
          redirection('/mypage');
        } else if (!phoneNumber && birthDay) {
          // 휴대폰 번호가 없는 경우
          alert(
            '카카오 로그인에 성공하셨습니다. \n마이페이지에 휴대폰 번호를 입력해주세요!',
          );
          redirection('/mypage');
        } else if (phoneNumber && !birthDay) {
          // 생년월일이 없는 경우
          alert(
            '카카오 로그인에 성공하셨습니다. \n마이페이지에 생년월일을 입력해주세요!',
          );
          redirection('/mypage');
        } else {
          // 둘 다 값이 있는 경우
          redirection('/'); // 홈 페이지로 이동
        }
      } catch (error) {
        console.error('Error during Kakao login:', error);
      }
    };

    kakaoLogin();
  }, [code, onLogin, redirection, REQUEST_URL]);

  return null;
};

export default KakaoLoginHandler;
