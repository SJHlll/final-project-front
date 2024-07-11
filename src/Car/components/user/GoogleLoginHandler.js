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
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const REQUEST_URL = `${API_BASE_URL}${USER}`;

  const handleLoginSuccess = async (response) => {
    console.log('Google login response:', response);

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
      console.log('Login response data:', res.data);
      onLogin(
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
      );

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
        navigate('/mypage');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      useOneTap
    />
  );
};

export default GoogleLoginHandler;
