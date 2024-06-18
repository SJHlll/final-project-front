// .env 파일 내의 값을 읽어올 때는 [process.env.지정한이름] 을 통해 값을 불러올 수 있음
//  React 환경에서 .env 내의 데이터를 읽어올 때는 반드시 REACT_APP_를 붙여 줘야 한다!!!

const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
