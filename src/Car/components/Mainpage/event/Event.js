import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Event.module.scss';
import Eventlist from './Eventlist';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../util/AuthContext';
import handleRequest from '../../../../util/handleRequest';
import { API_BASE_URL } from '../../../../config/host-config';
import axiosInstance from '../../../../config/axios-config';
import style from '../../../../scss/Button.module.scss';

const Event = () => {
  const redirection = useNavigate();
  const { onLogout } = useContext(AuthContext);

  const API_EVENT_URL = API_BASE_URL + '/events';

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

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
    <div className={styles.maincontainer}>
      <div className={styles.contentline}>
        <div className={styles.eventbody}>
          <Eventlist eventList={events} />
        </div>
        <button
          className={`${style.publicBtn} ${style.eventButton}`}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default Event;
