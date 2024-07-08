import { Grid, Link, TextField } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, Container } from 'reactstrap';
import styles from '../../../scss/Login.module.scss';
import { KAKAO_AUTH_URL } from '../../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../../config/naver-config';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_URL } from '../../../config/google-config';
import style from '../../../scss/Button.module.scss';
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
        userId,
      } = await res.data;

      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(
        token,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
        userId,
      );

      // 홈으로 리다이렉트
      redirection('/');
    } catch (error) {
      console.log('error', error);
      alert('이메일과 비밀번호를 확이해주세요.');
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
      <form
        className={styles.loginform}
        noValidate
        onSubmit={loginHandler}
      >
        <Container className={styles.bodyTop}>
          <Grid container spacing={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                left: '42%',
              }}
            >
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
            </div>
            <Grid item xs={12}>
              <button
                className={style.publicBtn}
                type='submit'
                // fullWidth
                // variant='contained'
                onClick={loginHandler}
                style={{
                  width: '208px',
                  height: '44px',
                  margin: '5px',
                  // backgroundColor: 'skyblue',
                }}
              >
                로그인
              </button>
            </Grid>
          </Grid>

          <Button
            style={{
              width: '208px',
              height: '44px',
              margin: '5px',
            }}
            variant='contained'
            onClick={goToRegister}
          >
            회원가입
          </Button>
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
          <Grid
            style={{
              width: '210px',
              height: '40px',
              margin: '5px',
              position: 'relative',
              left: '41.5%',
            }}
          >
            <GoogleAuthLogin />
          </Grid>
        </Container>
      </form>
    </>
  );
};

export default Login;
