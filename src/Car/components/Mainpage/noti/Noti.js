import React, { useState } from 'react';
import './Noti.scss';
import Notilist from './Notilist';
import Frame from '../Frame';
import { Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('게시물이 등록 되었습니다');
    setNotiTitle('');
    setNotiContent('');
    setCreate(false);
  };

  const cancelcreatenoti = () => {
    alert('등록이 취소되었습니다.');
    setCreate(false);
  };

  const toggle = () => {
    setCreate(!Create);
  };

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
          </div>
        </div>
      </Frame>

      {Create && (
        <ModalBackground>
          <Modal isOpen={Create} toggle={toggle}>
            <ModalBody>
              <div style={{ fontFamily: 'font2' }}>
                <div
                  style={{ marginBottom: '3%' }}
                  className='content'
                >
                  <div style={{ fontSize: '30px' }}>
                    이용방법 등록
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className='notilistform'
                >
                  <input
                    type='text'
                    placeholder='제목'
                    value={NotiTitle}
                    onChange={(e) =>
                      setNotiTitle(e.target.value)
                    }
                    className='notilistinput'
                  />
                  <textarea
                    placeholder='내용'
                    value={NotiContent}
                    onChange={(e) =>
                      setNotiContent(e.target.value)
                    }
                    className='notilisttext'
                  ></textarea>
                  <div style={{ display: 'flex' }}>
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
                        className='public-btn'
                      >
                        등록
                      </button>
                    </div>
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
                </form>
              </div>
            </ModalBody>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
};

export default Noti;
