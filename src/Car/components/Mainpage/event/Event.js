import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import './Event.scss';
import Eventlist from './Eventlist';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../util/AuthContext';
import handleRequest from '../../../../util/handleRequest';
import { API_BASE_URL } from '../../../../config/host-config';
import axiosInstance from '../../../../config/axios-config';

const Event = () => {
  const redirection = useNavigate();
  const { onLogout } = useContext(AuthContext);

  const API_EVENT_URL = API_BASE_URL + '/evnets';

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  // 이벤트 삭제 처리 함수
  const removeEvent = async (no) => {
    handleRequest(
      () => () =>
        axiosInstance.delete(`${API_EVENT_URL}/${no}`),
      (data) => setEvents(data.events),
      onLogout,
      redirection,
    );
  };

  useEffect(() => {
    handleRequest(
      () => axiosInstance.get(`${API_EVENT_URL}/list`),
      (data) => {
        setEvents(data.events);
        setLoading(false);
      },
      onLogout,
      redirection,
    );
  }, []);

  return (
    <div className='maincontainer'>
      <div className='contentline'>
        <div className='eventbody'>
          <Eventlist
            eventList={events}
            remove={removeEvent}
          />
        </div>
        <button className='public-btn event-button'>
          추가
        </button>
        <button className='public-btn event-button'>
          수정
        </button>
      </div>
      <button
        className={`${style.publicBtn} ${style.eventButton}`}
      >
        추가
      </button>
    </Frame>
  );
};

export default Event;
