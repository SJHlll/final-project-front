import React from 'react';

const LoginSuccess = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src='../../Car/assets/loginPuppy.jpg'
        alt='Logged In'
        style={{ width: '30%' }}
      />
      <h1>로그인 성공!</h1>
    </div>
  );
};

export default LoginSuccess;
