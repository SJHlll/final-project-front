import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Button, Container } from 'reactstrap';
// import '../../scss/Login.scss';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_URL } from '../../config/google-config';
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import GoogleAuthLogin from './GoogleAuthLogin';

const Login = () => {
  const navigate = useNavigate();

  const click = (text) => {
    // 특정 경로로 네비게이션
    navigate(text);
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
  return (
    <>
      <Container className='body-top'>
        <TextField />
      </Container>
      <Container className='body-bottom'>
        <Grid item xs={12}>
          <a href={KAKAO_AUTH_URL}>
            <img
              style={{ width: '70%', height: '50%' }}
              alt='kakaobtn'
              src={require('../../Car/assets/kakaoLogin.png')}
            />
          </a>
        </Grid>
        <Grid>
          <a href={NAVER_AUTH_URL}>
            <img
              style={{ width: '70%', height: '10%' }}
              alt='naverbtn'
              src={require('../../Car/assets/naverLogin.png')}
            />
          </a>
        </Grid>
        <Grid>
          <GoogleAuthLogin />
        </Grid>
        <Button
          className='testbtn'
          onClick={() => click('/choose')}
        >
          우선 넘기기
        </Button>
      </Container>
    </>
  );
};

export default Login;
