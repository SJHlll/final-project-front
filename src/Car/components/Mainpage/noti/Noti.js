import React, { useCallback, useState } from 'react';
import './Noti.scss';
import Notilist from './Notilist';
import Frame from '../Frame';
import styled from 'styled-components';
import { Modal, Button, ModalBody } from 'reactstrap';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Noti = () => {
  const [Create, setCreate] = useState(false);
  const [NotiTitle, setNotiTitle] = useState('');
  const [NotiContent, setNotiContent] = useState('');

  const toggle = useCallback(() => {
    setCreate(!Create);
  }, [Create]);

  const handleTitleChange = useCallback((e) => {
    setNotiTitle(e.target.value);
  }, []);

  const handleContentChange = useCallback((e) => {
    setNotiContent(e.target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('게시물이 등록 되었습니다');
    setNotiTitle('');
    setNotiContent('');
    setCreate(false);
  };
  const button = () => (
    <div
      style={{
        width: '100%',
        height: '50px',
        textAlign: 'center',
        marginTop: '4%',
      }}
    >
      <button
        type='submit'
        onClick={handleSubmit}
        className='public-btn'
      >
        등록
      </button>
    </div>
  );

  const cancelcreatenoti = () => {
    alert('등록이 취소되었습니다.');
    setCreate(!Create);
  };

  const CreateNoti = () => (
    <ModalBackground>
      <Modal isOpen={Create} toggle={toggle}>
        <ModalBody>
          <div style={{ fontFamily: 'font2' }}>
            <div
              style={{ marginBottom: '3%' }}
              className='content'
            >
              <div
                style={{
                  fontSize: '30px',
                }}
              >
                이용방법 등록
              </div>
            </div>
            <form className='notilistform'>
              <input
                placeholder='제목'
                value={NotiTitle}
                onChange={handleTitleChange}
                className='notilistinput'
              ></input>
              <textarea
                value={NotiContent}
                onChange={handleContentChange}
                placeholder='내용'
                className='notilisttext'
              ></textarea>
            </form>
            <div style={{ display: 'flex' }}>
              {button()}
              <div
                style={{
                  width: '100%',
                  height: '50px',
                  textAlign: 'center',
                  marginTop: '4%',
                }}
              >
                <button
                  className='public-btn'
                  onClick={cancelcreatenoti}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ModalBackground>
  );

  return (
    <>
      <Frame>
        <div className='notiline'>
          <Notilist />

          <div style={{ display: 'flex' }}>
            <button
              className='createnotilist'
              onClick={toggle}
            >
              등록
            </button>
            <button
              style={{
                Left: '1%',
              }}
              className='createnotilist notilistupdatebtn'
              onClick={toggle}
            >
              수정
            </button>
          </div>
        </div>
      </Frame>
      {Create && <CreateNoti />}
    </>
  );
};

export default Noti;
