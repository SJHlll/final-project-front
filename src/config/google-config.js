const G_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const GOOGLE_CLIENT_REDIRECT_URI =
  process.env.REACT_APP_GOOGLE_REDIRECT_URL;
const GOOGLE_SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;

export const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=${GOOGLE_SCOPE}&client_id=${G_CLIENT_ID}}&redirect_uri=${GOOGLE_CLIENT_REDIRECT_URI}`;
