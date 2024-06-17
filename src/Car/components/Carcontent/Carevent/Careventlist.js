import React from 'react';
import './Careventlist.scss';
import Bannerimgs from './bannerimgs';

const Careventlist = () => {
  const bannerlist = [
    {
      id: 1,
      name: 'summerevent1',
      img: Bannerimgs.image1,
    },
    { id: 2, name: 'summerevnet2', img: Bannerimgs.image2 },

    { id: 3, name: 'summerevnet3', img: Bannerimgs.image1 },

    { id: 4, name: 'summerevnet4', img: Bannerimgs.image2 },
    { id: 5, name: 'summerevnet5', img: Bannerimgs.image1 },
    { id: 6, name: 'summerevnet6', img: Bannerimgs.image2 },
    { id: 7, name: 'summerevnet7', img: Bannerimgs.image1 },

    { id: 8, name: 'summerevnet8', img: Bannerimgs.image2 },

    { id: 9, name: 'summerevnet9', img: Bannerimgs.image1 },
  ];

  return (
    <>
      <div className='careventlist'>
        {bannerlist.map((list) => (
          <div className='eventlist' key={list.id}>
            <img
              className='eventlistimg'
              src={`${list.img}`}
              alt='eventlist'
            />
            <div className='eventlisttext'>{list.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Careventlist;
