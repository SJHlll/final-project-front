import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CarHeaders_css/Carres.scss';
import CarCalendar from '../Carcontent/Carreservation/car/CarCalendar';
import {
  ModalProvider,
  ModalStyle,
  useModal,
} from '@lasbe/react-modal';

const Carres = () => {
  const [modalOpen, modalClose] = useModal(false);

  return (
    <ModalProvider>
      <Header />
      <div className='carresbody'></div>

      <ModalStyle.Button>예약하기</ModalStyle.Button>

      <CarCalendar />

      <Footer />
    </ModalProvider>
  );
};

export default Carres;
