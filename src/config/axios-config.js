import axios from 'axios';
// import { API_BASE_URL, REVIEW } from './host-config';

// const REVIEW_URL = API_BASE_URL + REVIEW;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor 설정
axiosInstance.interceptors.request.use(
  // 요청 보내기 전에 일괄 처리해야 할 내용을 함수로 선언.
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 응답에 문제가 없다면 그대로 응답 내용 리턴
  async (error) => {
    console.log(
      'response Interceptor 동작! 응답 에러 발생!',
    );

    // 응답이 실패했는데 토큰 재발급이 필요하지 않는 상황 (로그인을 하지 않고 요청)
    if (error.response.data.message === 'INVALID_AUTH') {
      console.log('로그인을 안해서 401 발생');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
