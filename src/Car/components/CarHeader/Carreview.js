import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CarHeaders_css/Carreview.scss';
import Carreviewbody from '../../components/Carcontent/Carreview/Carreviewbody';

const Carreview = () => {
  return (
    <>
      <Header />
      <Carreviewbody />
      <Footer />
    </>
  );
};

export default Carreview;
