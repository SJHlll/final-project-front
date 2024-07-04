const handleError = (error, onLogout, redirection) => {
  console.log('handleError 호출!');
  if (error.response && error.response.status === 401) {
    if (error.response.data.message === 'INVALID_AUTH') {
      alert('로그인이 필요한 서비스입니다.');
      redirection('/login');
    } else if (
      error.response.data.message === 'EXPIRED_TOKEN'
    ) {
      console.log('onLogout: ', onLogout);
      console.log('redirection: ', redirection);
      alert(
        '로그인 시간이 만료되었습니다. 다시 로그인 해주세요!',
      );
      onLogout();
      redirection('/login');
    }
  }
};

const handleRequest = async (
  requestFunc,
  onSuccess,
  onLogout,
  redirection,
) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, redirection);
  }
};

export default handleRequest;
