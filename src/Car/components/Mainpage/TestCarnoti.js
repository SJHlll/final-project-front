import React from 'react';
import './Testcarnoti.scss';
import chunsik from '../../../assets/chunsik.png';
const Testnoti = () => {
  return (
    <>
      <div className='testcarnoti'>
        <div>
          <h1 className='notiheader'> 이용방법</h1>
        </div>
        <div className='notitab'>
          <ul className='notiul'>A</ul>
          <ul className='notiul'>B</ul>
          <ul className='notiul'>C</ul>
          <ul className='notiul'>D</ul>
        </div>
        <div className='oneline'>
          <img src={chunsik} className='lineimg' />
          <p>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
        </div>
        <div className='twoline'>
          <p>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
          <img src={chunsik} className='lineimg' />
        </div>
        <div className='threeline'>
          <img src={chunsik} className='lineimg' />
          <p>
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
          </p>
        </div>
      </div>
    </>
  );
};

export default Testnoti;
