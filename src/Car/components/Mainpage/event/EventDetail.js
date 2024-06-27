import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './Event.scss';

const EventDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const { img, title, status } = location.state || {};
  const navigate = useNavigate();
  const toList = () => {
    navigate('/event');
  };

  return (
    <>
      <div className='maincontainer'>
        <div className='contentline'>
          <div className='event-detail-header'>
            <div className='event-current margin-box'>
              {status}
            </div>
            <div className='event-detail-title'>
              {title}
            </div>
            <div className='flex-box margin-box'>
              <div>글번호</div>
              <div>{id}</div>
            </div>
          </div>
          <div className='event-detail-body'>
            {img && (
              <img
                className='event-detail-img'
                src={img}
                alt={title}
              />
            )}
            <button className='public-btn' onClick={toList}>
              목록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
