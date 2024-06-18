import React from 'react';
import './Carnotilist.scss';
import notiimgslist from './notilist';
import Modal from '../../Mainpage/Modalch';
const Carnotilist = () => {
  const notilist = [
    {
      id: 1,
      name: 'summerevent1',
      img: notiimgslist.image1,
    },
    {
      id: 2,
      name: 'summerevnet2',
      img: notiimgslist.image2,
    },

    {
      id: 3,
      name: 'summerevnet3',
      img: notiimgslist.image1,
    },

    {
      id: 4,
      name: 'summerevnet4',
      img: notiimgslist.image2,
    },
  ];

  return (
    <>
      <div className='carnotilist'>
        {notilist.map((list) => (
          <div className='notilist' key={list.id}>
            <img
              className='notilistimg'
              src={`${list.img}`}
              alt='notilist'
            />
            <div className='notilisttext'>{list.name}</div>
          </div>
        ))}
        <Modal />
      </div>
    </>
  );
};

export default Carnotilist;
