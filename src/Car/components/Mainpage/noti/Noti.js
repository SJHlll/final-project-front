import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Noti.module.scss';
import Notilist from './Notilist';
import Frame from '../Frame';
import { Modal, ModalBody } from 'reactstrap';
import styled from 'styled-components';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';
import style from '../../../../scss/Button.module.scss';
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
  const [notiList, setNotiList] = useState([]);
  const [setError] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert('게시물이 등록 되었습니다');
  //   setNotiTitle('');
  //   setNotiContent('');
  //   setCreate(false);
  // };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/noti`,
        {
          notiTitle: NotiTitle,
          notiContent: NotiContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNotiList([...notiList, response.data]);
      alert('게시물이 등록 되었습니다.');
      // setCreate(false);
      window.location.reload(); // F5, 글번호 제목 작성일 조회수 안보이던거 새로고침으로 보이게
    } catch (err) {
      setError(err.message);
      alert('등록이 실패하였습니다.');
      console.error(err.message);
    }
  };

  const fetchNotiList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/noti/info`,
      );
      setNotiList(response.data.notiList);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchNotiList();
  }, []);

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
          <Notilist
            notiList={notiList}
            fetchNotiList={fetchNotiList}
          />
          <div style={{ display: 'flex' }}>
            {role === 'ADMIN' && (
              <button
                className={styles.createnotilist}
                onClick={toggle}
              >
                등록
              </button>
            )}
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
                        className={style.publicBtn}
                        style={{
                          width: '50%',
                          height: '80%',
                        }}
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
                        className={style.publicBtn}
                        onClick={cancelcreatenoti}
                        style={{
                          width: '50%',
                          height: '80%',
                        }}
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
