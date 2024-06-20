import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CarHeaders_css/Carres.scss';
import CarCalendar from '../Carcontent/Carreservation/car/CarCalendar';

const Carres = () => {
  return (
    <>
      <Header />
      <div className='carresbody'></div>
      <CarCalendar />
      <Footer />
    </>
  );
};

export default Carres;
