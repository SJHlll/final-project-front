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
import EventAddModal from './EventAddModal';
import Frame from '../Frame';

const Event = () => {
  const navigate = useNavigate();
  const { onLogout, role } = useContext(AuthContext);
  const [isModal, setIsModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [setLoading] = useState(true);

  const API_EVENT_URL = API_BASE_URL + '/events';

  const eventAddModalOpen = () => {
    setIsModal(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      await handleRequest(
        () => axiosInstance.get(`${API_EVENT_URL}/list`),
        (data) => {
          setEvents(data.events);
          setLoading(false);
        },
        onLogout,
        navigate,
      );
    };

    fetchEvents();
  }, [API_EVENT_URL, onLogout, navigate]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`, {
      state: { id: eventId },
    });
  };

  return (
    <Frame>
      <div className={styles.eventbody}>
        <Eventlist
          eventList={events}
          onEventClick={handleEventClick}
        />
        {role === 'ADMIN' && (
          <button
            className={`${style.publicBtn} ${styles.actionButtons}`}
            onClick={eventAddModalOpen}
          >
            추가
          </button>
        )}
      </div>

      {isModal && (
        <EventAddModal
          isOpen={isModal}
          toggle={() => setIsModal(false)}
        />
      )}
    </Frame>
  );
};

export default Event;
