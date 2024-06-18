import React from 'react';
import reviewimglist from './reviewimglist';
import './Carreviewlist.scss';
const Carreviewtlist = () => {
  const reviewlist = [
    {
      id: 1,
      name: 'name1',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 2,
      name: 'name2',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 3,
      name: 'name3',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 4,
      name: 'name4',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 5,
      name: 'name5',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 6,
      name: 'name6',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 1,
      name: 'name1',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 2,
      name: 'name2',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 3,
      name: 'name3',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 4,
      name: 'name4',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 5,
      name: 'name5',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 6,
      name: 'name6',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 1,
      name: 'name1',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 2,
      name: 'name2',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 3,
      name: 'name3',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },

    {
      id: 4,
      name: 'name4',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 5,
      name: 'name5',
      img: reviewimglist.image1,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
    {
      id: 6,
      name: 'name6',
      img: reviewimglist.image2,
      text: '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    },
  ];

  return (
    <>
      <div className='carreviewlist'>
        {reviewlist.map((list) => (
          <div className='review' key={list.id}>
            <div className='reviewname'>{list.name}</div>
            <img
              className='reviewlistimg'
              src={`${list.img}`}
              alt='reviewlist'
            />
            <div className='reviewtext'>{list.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carreviewtlist;
