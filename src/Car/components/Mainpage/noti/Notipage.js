import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Frame from '../Frame';
import styles from './NotiPage.module.scss';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';

const NotiPage = () => {
  const location = useLocation();
  const { header, contents, views, notiId } =
    location.state || {};
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedHeader, setEditedHeader] = useState(header);
  const [editedContents, setEditedContents] =
    useState(contents);
  const [currentHeader, setCurrentHeader] =
    useState(header);
  const [currentContents, setCurrentContents] =
    useState(contents);
  const [setCurrentViews] = useState(views);

  const { role } = useContext(AuthContext);
  const token = localStorage.getItem('ACCESS_TOKEN');

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error('Noti Id 없습니다.');
      navigate('/noti');
    }
  }, [notiId, navigate]);

  const click = () => {
    navigate('/noti');
  };

  const updateHandler = () => {
    setIsEditing(true);
  };

  const saveUpdateHandler = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/noti/${id}`,
        {
          notiId,
          notiTitle: editedHeader,
          notiContent: editedContents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // setCurrentHeader(response.data.notiTitle);
      // setCurrentContents(response.data.notiContent);
      setIsEditing(false);
      alert('수정 완료!');
      navigate('/noti/' + id);
    } catch (err) {
      console.error('Error updating notification:', err);
    }
  };

  const deleteNotiHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/noti/${notiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('삭제 완료');
      navigate('/noti');
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getNotiInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/noti/info/${id}`,
      );
      setCurrentHeader(response.data.notiList[0].notiTitle);
      setCurrentContents(
        response.data.notiList[0].notiContent,
      );
      setCurrentViews(response.data.notiList[0].views);
    } catch (err) {
      console.error(
        'Error getting notification info:',
        err,
      );
    }
  };

  useEffect(() => {
    getNotiInfo();
  }, [notiId]);

  return (
    <Frame>
      <div style={{ padding: '1%' }}>
        <div className={styles.categoriheader}>
          이용방법
        </div>

        <div
          style={{ position: 'relative', bottom: '80px' }}
        >
          {isEditing ? (
            <>
              <input
                type='text'
                value={editedHeader}
                onChange={(e) =>
                  setEditedHeader(e.target.value)
                }
                className='Notitheader'
              />
              <textarea
                value={editedContents}
                onChange={(e) =>
                  setEditedContents(e.target.value)
                }
                className={styles.Notitbody}
              />
            </>
          ) : (
            <>
              <h1 className={styles.Notiheader}>
                제목 : {currentHeader}
              </h1>
              <p className={styles.Notihits}></p>
              <p
                className={styles.Notibody}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {currentContents}
              </p>
            </>
          )}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '50px',
              marginTop: '9px',
              flexDirection: 'row-reverse',
            }}
          >
            <button
              className={styles.notibtn}
              onClick={click}
            >
              이전
            </button>
            {/* {role === 'COMMON' &&
              (isEditing ? (
                <button
                  className={styles.notibtn}
                  onClick={saveUpdateHandler}
                >
                  저장
                </button>
              ) : (
                <button
                  className={styles.notibtn}
                  onClick={updateHandler}
                >
                  수정불가능
                </button>
              ))} */}
            {role === 'ADMIN' && (
              <>
                <button
                  className={styles.notibtn}
                  onClick={deleteNotiHandler}
                >
                  삭제
                </button>
                {isEditing ? (
                  <button
                    className={styles.notibtn}
                    onClick={saveUpdateHandler}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    className={styles.notibtn}
                    onClick={updateHandler}
                  >
                    수정
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default NotiPage;
