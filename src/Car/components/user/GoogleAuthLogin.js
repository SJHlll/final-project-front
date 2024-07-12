import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginHandler from './GoogleLoginHandler';

const GoogleAuthLogin = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

  console.log('REACT_APP_GOOGLE_CLIENT_KEY:', clientId);
  if (!clientId) {
    console.error(
      'Google Client ID is not set in environment variables.',
    );
    return <div>Error: Google Client ID is missing.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginHandler />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthLogin;
