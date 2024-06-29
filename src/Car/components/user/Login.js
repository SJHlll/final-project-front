import { Grid, Link, TextField } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Container } from 'reactstrap';
// import '../../scss/Login.scss';
import { KAKAO_AUTH_URL } from '../../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../../config/naver-config';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_URL } from '../../../config/google-config';
import {
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import GoogleAuthLogin from './GoogleAuthLogin';
import {
  API_BASE_URL as BASE,
  USER,
} from '../../../config/host-config';
import AuthContext from '../../../util/AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const click = (text) => {
    // 특정 경로로 네비게이션
    navigate(text);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const REQUEST_URL = BASE + USER + '/signin';

  const { onLogin, isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const redirection = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setOpen(true);
      setTimeout(() => {
        redirection('/');
      }, 3500);
    }
  }, [isLoggedIn]);

  // 서버에 비동기 로그인 요청(AJAX 요청)
  // 함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴합니다.
  const fetchLogin = async () => {
    // 이메일, 비밀번호 입력 태그 취득하기
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    try {
      const res = await axios.post(REQUEST_URL, {
        email: $email.value,
        password: $password.value,
      });
      console.log('res,', res);
      console.log('Response Data ', res.data);

      const {
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
      } = await res.data;

      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
      );

      // 홈으로 리다이렉트
      redirection('/');
    } catch (error) {
      console.log('error', error);
      alert(error.response.data);
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    // 입력값에 관련된 처리를 하고 싶다면 여기서 하시면 됩니다.
    // 예제에서는 생략하겠습니다.

    // 서버에 로그인 요청 전송
    fetchLogin();
  };

  return (
    <>
      <form noValidate onSubmit={loginHandler}>
        <Container className='body-top'>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='#007bfff'
              />
            </Grid>
          </Grid>
        </Container>
      </form>
      <Container className='body-bottom'>
        <Grid item xs={12}>
          <a href={KAKAO_AUTH_URL}>
            <img
              style={{
                width: '208px',
                height: '44px',
                margin: '5px',
              }}
              alt='kakaobtn'
              src={require('../../assets/kakaoLogin.png')}
            />
          </a>
        </Grid>
        <Grid>
          <a href={NAVER_AUTH_URL}>
            <img
              style={{
                width: '208px',
                height: '40px',
                margin: '5px',
              }}
              alt='naverbtn'
              src={require('../../assets/naverLogin.png')}
            />
          </a>
        </Grid>
        <Grid>
          <GoogleAuthLogin />
        </Grid>
        <Button
          className='testbtn'
          onClick={() => click('/')}
          style={{ margin: '5px' }}
        >
          우선 돌아가기
        </Button>
        <Button variant='contained' onClick={goToRegister}>
          {' '}
          회원가입
        </Button>
      </Container>
    </>
  );
};

export default Login;
