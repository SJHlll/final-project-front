import React, {
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import { Modal } from 'reactstrap';
import '../scss/UserInfoSave.scss';
import {
  initialState,
  userInfoReducer,
} from './userInfoReducer';
import { Grid, TextField, debounce } from '@mui/material';
import {
  API_BASE_URL,
  USER,
} from '../../../../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../util/AuthContext';

const UserInfoSave = () => {
  const navigate = useNavigate();

  // 리듀서 함수 등록
  const [state, dispatch] = useReducer(
    userInfoReducer,
    initialState,
  );

  // 상태 객체에서 상태 객체값 분해할당
  const { userValue, message, correct } = state;

  // 각각의 핸들러에서 호출하는 dispatch 처리를 중앙화 하자.
  const updateState = (key, inputValue, msg, flag) => {
    dispatch({
      type: 'SET_USER_VALUE',
      key,
      value: inputValue,
    });
    dispatch({
      type: 'SET_MESSAGE',
      key,
      value: msg,
    });
    dispatch({
      type: 'SET_CORRECT',
      key,
      value: flag,
    });
  };

  const debouncedUpdateState = useCallback(
    debounce((key, inputValue, msg, flag) => {
      updateState(key, inputValue, msg, flag);
    }, 300),
    [],
  );

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = (e) => {
    const nameRegex = /^[가-힣]{2,5}$/;
    const inputValue = e.target.value;

    // 입력값 검증
    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '회원 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5 글자 사이의 한글로 작성하세요!';
    } else {
      flag = true;
    }

    debouncedUpdateState('userName', inputValue, msg, flag);
  };

  const phoneNumberHandler = (e) => {
    const inputValue = e.target.value;
    const phoneRegex = /^(010)-[0-9]{3,4}-[0,9]{4}$/;

    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '핸드폰 번호를 입력해 주세요!';
    } else if (!phoneRegex.test(inputValue)) {
      msg = '핸드폰 번호 형식이 올바르지 않습니다.';
    } else {
      flag = true;
    }

    debouncedUpdateState(
      'phoneNumber',
      inputValue,
      msg,
      flag,
    );
  };

  const birthDayHandler = (e) => {
    const inputValue = e.target.value;
    const birthRegex =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '생년월일(8자리)를 입력해 주세요!';
    } else if (!birthRegex.test(inputValue)) {
      msg = '생년월일(8자리) 형식이 올바르지 않습니다.';
    } else {
      flag = true;
    }

    debouncedUpdateState('birthDay', inputValue, msg, flag);
  };

  // 입력창이 모두 검증에 통과했는지 여부 검사
  const isValid = () => {
    for (let key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };

  // 회원정보 수정 처리 서버 요청
  const updateUserInfoPost = async () => {
    try {
      const res = await fetch(API_BASE_URL + USER, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(userValue),
      });

      if (res.ok) {
        const data = await res.json();
        alert(
          `${data.userName}님 회원정보 수정이 완료되었습니다!`,
        );
        navigate('/');
      } else {
        // 상태 코드가 200이 아닌 경우
        const errData = await res.json();
        console.log(
          'Error response from server : ',
          errData,
        );
        alert(
          '서버와의 통신이 원활하지 않습니다. 관리자에게 문의하세요!',
        );
      }
    } catch (err) {
      // 네트워크 오류 등 처리
      console.log('Error : ', err);
      alert(
        '서버와의 통신이 원활하지 않습니다. 잠시후에 다시 시도해 주세요!',
      );
    }
  };

  // 회원정보 수정 버튼 클릭 이벤트 핸들러
  const updateButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      updateUserInfoPost();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const { userName, email } = useContext(AuthContext);

  const toggle = () => setModalOpen(!modalOpen);

  const infoModal = () => (
    <Modal
      isOpen={modalOpen}
      toggle={toggle}
      backdrop='static'
      style={{ fontFamily: 'font2', top: '25%' }}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>이름</div>
            <TextField
              id='outl'
              variant='standard'
              size='small'
              defaultValue={userName}
              onChange={nameHandler}
            />
          </Grid>
          <div className='effectiveness'>
            <span
              style={
                correct.userName
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {message.userName}
            </span>
          </div>

          <Grid item xs={12} style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>이메일</div>
            <TextField
              id='outl'
              variant='standard'
              size='small'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={email}
            />
          </Grid>

          <Grid item xs={12} style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>연락처</div>
            <TextField
              id='outl'
              variant='standard'
              size='small'
              onChange={phoneNumberHandler}
            />
          </Grid>
          <div className='effectiveness'>
            <span
              style={
                correct.phoneNumber
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {message.phoneNumber}
            </span>
          </div>

          <Grid item xs={12} style={{ display: 'flex' }}>
            <div style={{ width: '30%' }}>생년월일</div>
            <TextField
              id='outl'
              variant='standard'
              size='small'
              onChange={birthDayHandler}
            />
          </Grid>
          <div className='effectiveness'>
            <span
              style={
                correct.birthDay
                  ? { color: 'green' }
                  : { color: 'red' }
              }
            >
              {message.birthDay}
            </span>
          </div>
        </Grid>
      </form>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '10px 0px',
        }}
      >
        <button
          type='submit'
          className='public-btn updating'
          onClick={updateButtonClickHandler}
        >
          수정하기
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <button className='public-btn' onClick={toggle}>
            모달창 오픈!
          </button>
          {modalOpen && infoModal()}
        </div>
      </div>
    </>
  );
};

export default UserInfoSave;
