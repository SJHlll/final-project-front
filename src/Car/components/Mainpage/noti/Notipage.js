import React from 'react';
import {
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Frame from '../Frame';
import './NotiPage.scss';

const NotiPage = () => {
  const location = useLocation();
  const { header, contents, hits } = location.state || {};
  const Navigate = useNavigate();
  const click = () => {
    Navigate('/noti');
  };
  return (
    <Frame>
      <div
        style={{
          padding: '1%',
        }}
      >
        <div className='categoriheader'>이용방법</div>
        <p className='backnoti' onClick={click}>
          목록
        </p>
        <div
          style={{
            position: 'relative',
            bottom: '80px',
          }}
        >
          <h1 className='Notiheader'>제목 : {header}</h1>
          <p className='Notihits'>조회수: {hits}</p>
          {/* <p className='Notibody'>{contents}</p> */}
          <p className='Notibody'>
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
            내용은 내용입니다 내용이지요 내용내용내용내용
            <br />
          </p>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '50px',
              flexDirection: 'row-reverse',
            }}
          >
            <button className='notibtn'>삭제</button>
            <button className='notibtn'>수정</button>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default NotiPage;
