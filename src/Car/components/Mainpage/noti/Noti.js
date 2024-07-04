import React, { useContext, useState } from 'react';
import styles from './Noti.module.scss';
import Notilist from './Notilist';
import Frame from '../Frame';
import { Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';

import AuthContext from '../../../../util/AuthContext';

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
  const { role } = useContext(AuthContext);
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
        <div className={styles.notiline}>
          <Notilist />

          {role === 'ADMIN' && (
            <button
              className={styles.createnotilist}
              onClick={toggle}
            >
              등록
            </button>
          )}
        </div>
      </Frame>

      {Create && (
        <ModalBackground>
          <Modal isOpen={Create} toggle={toggle}>
            <ModalBody>
              <div style={{ fontFamily: 'font2' }}>
                <div
                  style={{ marginBottom: '3%' }}
                  className={styles.content}
                >
                  <div style={{ fontSize: '30px' }}>
                    이용방법 등록
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className={styles.notilistform}
                >
                  <input
                    type='text'
                    placeholder='제목'
                    value={NotiTitle}
                    onChange={(e) =>
                      setNotiTitle(e.target.value)
                    }
                    className={styles.notilistinput}
                  />
                  <textarea
                    placeholder='내용'
                    value={NotiContent}
                    onChange={(e) =>
                      setNotiContent(e.target.value)
                    }
                    className={styles.notilisttext}
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
                        className={styles.publicBtn}
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
                        className={styles.publicBtn}
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
