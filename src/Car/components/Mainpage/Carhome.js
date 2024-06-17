import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Eventswiper from '../Carhomebody/Eventswiper';
import Carsearchbar from '../Carhomebody/Carsearchbar';
import Carlist from '../Carhomebody/Carlist';

const Carhome = () => {
  return (
    <>
      <Header />
      <Eventswiper />
      <Carsearchbar />
      <Carlist />
      <Footer />
    </>
  );
};

export default Carhome;
