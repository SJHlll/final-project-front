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

    // Using axios to make a GET request
    axios
      .post(`${REQUEST_URL}/googleLogin`, {
        code: response.credential,
      })
      .then((res) => {
        const { token, userName, email, role } = res.data;
        onLogin(token, userName, email, role);
        redirection('/');
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
