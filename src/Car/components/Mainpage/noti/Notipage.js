import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Frame from '../Frame';
import './NotiPage.scss';

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

  const click = () => {
    navigate('/noti');
  };

  const updatehandler = () => {
    setIsEditing(true);
  };

  const saveUpdateHandler = () => {
    const storedHits = JSON.parse(
      localStorage.getItem('hits'),
    );
    const updatedHits = storedHits.map((item) => {
      if (item.header === header) {
        return {
          ...item,
          header: editedHeader,
          contents: editedContents,
        };
      }
      return item;
    });
    localStorage.setItem(
      'hits',
      JSON.stringify(updatedHits),
    );
    setCurrentHeader(editedHeader);
    setCurrentContents(editedContents);
    setIsEditing(false);
  };
  const deletenotihandler = () => {
    const storedHits = JSON.parse(
      localStorage.getItem('hits'),
    );
    const updatedHits = storedHits.filter(
      (item) => item.header !== header,
    );
    localStorage.setItem(
      'hits',
      JSON.stringify(updatedHits),
    );
    navigate('/noti');
  };
  return (
    <Frame>
      <div style={{ padding: '1%' }}>
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
          {isEditing ? (
            <>
              <input
                type='text'
                value={editedHeader}
                onChange={(e) =>
                  setEditedHeader(e.target.value)
                }
                className='Notitheader'
              ></input>
              <textarea
                value={editedContents}
                onChange={(e) =>
                  setEditedContents(e.target.value)
                }
                className='Notitbody'
              ></textarea>
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
            <button
              className='notibtn'
              onClick={deletenotihandler}
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
                onClick={updatehandler}
              >
                수정
              </button>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default NotiPage;
