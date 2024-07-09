import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthContext from '../../../util/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';
import {
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginHandler = () => {
  console.log(
    '사용자가 등의 화면을 통해 필수 정보 동의 후 google인증 서버에서 redirect를 진행함!',
  );

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const REQUEST_URL = API_BASE_URL + USER;

  // const handleLoginSuccess = (response) => {
  //   console.log('response_data: ', response);
  //   // console.log('access_token: ', response.access_token);

  //   fetch(
  //     `${REQUEST_URL}/googleLogin?code=${response.credential}`,
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const { token, userName, email, role } = data;
  //       onLogin(token, userName, email, role);
  //       redirection('/');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleLoginSuccess = (response) => {
    console.log('response_data: ', response);
    console.log('response.credential', response.credential);
    console.log('birthDay: ', response.birthDay);

    // Using axios to make a GET request
    axios
      .post(`${REQUEST_URL}/googleLogin`, {
        code: response.credential,
      })
      .then((res) => {
        const {
          token,
          userName,
          email,
          phoneNumber,
          role,
          birthDay,
        } = res.data;
        console.log(token);
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
            '구글 로그인에 성공하셨습니다. \n마이페이지에 생년월일과 휴대폰 번호를 입력해주세요!',
          );
          redirection('/mypage');
        } else if (!phoneNumber && birthDay) {
          // 휴대폰 번호가 없는 경우
          alert(
            '구글 로그인에 성공하셨습니다. \n마이페이지에 휴대폰 번호를 입력해주세요!',
          );
          redirection('/mypage');
        } else if (phoneNumber && !birthDay) {
          // 생년월일이 없는 경우
          alert(
            '구글 로그인에 성공하셨습니다. \n마이페이지에 생년월일을 입력해주세요!',
          );
          redirection('/mypage');
        } else {
          // 둘 다 값이 있는 경우
          redirection('/'); // 홈 페이지로 이동
        }
      })
      .catch((err) => {
        console.error('Error logging in:', err);
      });
  };

  const handleLoginFailure = (error) => {
    console.error(error);
  };

  console.log('REQUEST_URL ', REQUEST_URL);

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      useOneTap
    />
  );
};

export default GoogleLoginHandler;
