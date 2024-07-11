import React, { useContext } from 'react';
import AuthContext from '../../../util/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginHandler = () => {
  console.log('GoogleLoginHandler initialized');

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const REQUEST_URL = `${API_BASE_URL}${USER}`;

  const handleLoginSuccess = async (response) => {
    console.log('response_data: ', response);
    console.log(
      'response.credential: ',
      response.credential,
    );

    try {
      const res = await axios.post(
        `${REQUEST_URL}/googleLogin`,
        {
          code: response.credential,
        },
      );

      const {
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
      } = res.data;
      onLogin(
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
      );

      console.log('birthDay: ', birthDay);

      // Conditional redirection based on user data
      if (!phoneNumber || !birthDay) {
        let alertMessage = '구글 로그인에 성공하셨습니다. ';
        if (!phoneNumber)
          alertMessage +=
            '\n마이페이지에 휴대폰 번호를 입력해주세요!';
        if (!birthDay)
          alertMessage +=
            '\n마이페이지에 생년월일을 입력해주세요!';
        alert(alertMessage);
        redirection('/mypage');
      } else {
        redirection('/');
      }
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  console.log('REQUEST_URL: ', REQUEST_URL);

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      useOneTap
    />
  );
};

export default GoogleLoginHandler;
