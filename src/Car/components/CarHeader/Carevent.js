import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CarHeaders_css/Carevent.scss';
import Careventbody from '../Carcontent/Carevent/Careventbody';

const Carevent = () => {
  return (
    <>
      <Header />
      <Careventbody />
      <Footer />
    </>
  );
};

export default Carevent;
