import { GoogleOAuthProvider } from '@react-oauth/google';

import GoogleHandler from './GoogleHandler';
import GoogleLoginHandler from './GoogleLoginHandler';

const GoogleAuthLogin = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginHandler />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthLogin;
