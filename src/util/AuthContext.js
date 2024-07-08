import React, { useEffect, useState } from 'react';

// 새로운 전역 컨텍스트 생성
const AuthContext = React.createContext({
  isLoggedIn: false, // 로그인 했는지의 여부
  userName: '',
  email: '',
  phoneNumber: '',
  role: '',
  birthDay: '',
  userId: '',
  loginMethod: '',
  onLogout: () => {},
  onLogin: () => {},
});

// 바로 위에서 생성한 Context를 제공하는 provider
// 이 컴포넌트를 통해 자식 컴포넌트(consumer)에게 인증 상태와 관련된 값, 함수를 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [userId, setUserId] = useState('');
  const [loginMethod, setLoginMethod] = useState('');

  // 로그인 핸들러
  const loginHandler = (
    token,
    userName,
    email,
    phoneNumber,
    role,
    birthDay,
    userId,
    loginMethod,
  ) => {
    // json에 담긴 인증 정보를 클라이언트에 보관
    // 1. 로컬 스토리지 - 브라우저가 종료 되어도 유지됨.
    // 2. 세션 스토리지 - 브라우저가 종료 되면 사라짐.
    localStorage.setItem(
      'ACCESS_TOKEN',
      token.access_token,
    );
    localStorage.setItem(
      'REFRESH_TOKEN',
      token.refresh_token,
    );
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('USER_EMAIL', email);
    localStorage.setItem('USER_PHONENUMBER', phoneNumber);
    localStorage.setItem('USER_ROLE', role);
    localStorage.setItem('USER_BIRTHDAY', birthDay);
    localStorage.setItem('LOGIN_USERID', userId);
    setIsLoggedIn(true);
    setUserName(userName);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setRole(role);
    setBirthDay(birthDay);
    setUserId(userId);
    setLoginMethod(loginMethod);

    console.log('localStorage: ', localStorage);

    console.log(
      'userID: ',
      localStorage.getItem('LOGIN_USERID'),
    );

    console.log(
      '생일 : ',
      localStorage.getItem('USER_BIRTHDAY'),
    );
  };

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); // 로컬스토리지 내용 전체 삭제(하나만 지우고 싶으면 -> remove)
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
    setPhoneNumber('');
    setRole('');
    setBirthDay('');
    setUserId('');
    setLoginMethod('');
  };

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('LOGIN_USERNAME'));
      setEmail(localStorage.getItem('USER_EMAIL'));
      setPhoneNumber(
        localStorage.getItem('USER_PHONENUMBER'),
      );
      setRole(localStorage.getItem('USER_ROLE'));
      setBirthDay(localStorage.getItem('USER_BIRTHDAY'));
      setUserId(localStorage.getItem('LOGIN_USERID'));
      setLoginMethod(localStorage.getItem('LOGIN_METHOD'));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        email,
        phoneNumber,
        role,
        birthDay,
        userId,
        loginMethod,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        setUserName,
        setEmail,
        setPhoneNumber,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
