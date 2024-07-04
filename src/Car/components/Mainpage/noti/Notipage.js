import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Frame from '../Frame';
import './NotiPage.scss';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';

const NotiPage = () => {
  const location = useLocation();
  const { header, contents, hits } = location.state || {};
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedHeader, setEditedHeader] = useState(header);
  const [editedContents, setEditedContents] =
    useState(contents);
  const [currentHeader, setCurrentHeader] =
    useState(header);
  const [currentContents, setCurrentContents] =
    useState(contents);

  const { role, token } = useContext(AuthContext);

  const click = () => {
    navigate('/noti');
  };

  const updateHandler = () => {
    setIsEditing(true);
  };

  const saveUpdateHandler = async () => {
    try {
      const response = await axios.patch(
        `/noti/${location.state.num}`,
        {
          header: editedHeader,
          contents: editedContents,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCurrentHeader(response.data.header);
      setCurrentContents(response.data.contents);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating notification:', err);
    }
  };

  const deleteNotiHandler = async () => {
    try {
      await axios.delete(`/noti/${location.state.num}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/noti');
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <Frame>
      <div style={{ padding: '1%' }}>
        <div className='categoriheader'>이용방법</div>
        <p className='backnoti' onClick={click}>
          목록
        </p>
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
                className='Notitbody'
              />
            </>
          ) : (
            <>
              <h1 className='Notiheader'>
                제목 : {currentHeader}
              </h1>
              <p className='Notihits'>조회수: {hits}</p>
              <p className='Notibody'>{currentContents}</p>
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
            <button className='notibtn' onClick={click}>
              이전
            </button>
            {role === 'COMMON' &&
              (isEditing ? (
                <button
                  className='notibtn'
                  onClick={saveUpdateHandler}
                >
                  저장
                </button>
              ) : (
                <button
                  className='notibtn'
                  onClick={updateHandler}
                >
                  수정이가능
                </button>
              ))}
            {role === 'ADMIN' && (
              <>
                <button
                  className='notibtn'
                  onClick={deleteNotiHandler}
                >
                  삭제
                </button>
                {isEditing ? (
                  <button
                    className='notibtn'
                    onClick={saveUpdateHandler}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    className='notibtn'
                    onClick={updateHandler}
                  >
                    수정불가
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
