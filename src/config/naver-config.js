const CLIENT_ID = process.env.REACT_APP_REST_API_NAVER_KEY;
const REDIRECT_URI =
  process.env.REACT_APP_REDIRECT_NAVER_URL;
const STATE = Math.random().toString(36).substring(2);

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${STATE}&prompt=login`;
