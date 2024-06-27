import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './Event.scss';
import Eventlist from './Eventlist';

const EventDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { img, content } = location.state || {};

  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <div className='event-detail-header'>
            <h1>제목?</h1>
            <p>ID : {id}</p>
          </div>
          <div className='event-detail-body'>
            {img && (
              <img
                className='event-detail-img'
                src={img}
                alt={content}
              />
            )}
            <p>{content}</p>
          </div>
          <div className='event-detail-footer'>
            <p>다른 이벤트 둘러보기</p>
            <Eventlist />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
