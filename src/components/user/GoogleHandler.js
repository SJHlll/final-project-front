import React, { useEffect, useState } from 'react';
import {
  googleLogout,
  useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import {
  API_BASE_URL,
  USER,
} from '../../config/host-config';

const GoogleHandler = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const REQUEST_URL = API_BASE_URL + USER;

  const onLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user && user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          },
        )
        .then((res) => {
          setProfile(res.data);
          redirect('/');
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      {profile ? (
        <div>
          <img src={profile.picture} alt='user image' />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={onLogin}>
          Sign in with Google 🚀{' '}
        </button>
      )}
    </>
  );
};

export default GoogleHandler;
