import { Grid, Link, TextField } from '@mui/material';
import React from 'react';
import { Button, Container } from 'reactstrap';
// import '../../scss/Login.scss';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { useNavigate } from 'react-router-dom';
import GoogleAuthLogin from './GoogleAuthLogin';
import LoginText from './LoginText';

const Login = () => {
  const navigate = useNavigate();

  const click = (text) => {
    // 특정 경로로 네비게이션
    navigate(text);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
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
          onClick={() => click('/')}
        >
          우선 돌아가기
        </Button>
        <Button variant='contained' onClick={goToRegister}>
          {' '}
          회원가입 내꺼
        </Button>
        <Button variant='contained' onClick={goToRegister}>
          {' '}
          회원가입 쌤
        </Button>
      </Container>
    </>
  );
};

export default Login;
