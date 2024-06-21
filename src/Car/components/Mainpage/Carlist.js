import React from 'react';
import './Carlist.scss';
import imgfile from './imafile';

const Carlist = () => {
  const cars = [
    {
      id: 1,
      name: '람보르기니',
      person: '2인',
      img: imgfile.image1,
    },
    {
      id: 2,
      name: 'k9',
      person: '5인',
      img: imgfile.image2,
    },
    {
      id: 3,
      name: '그렌져',
      person: '5인',
      img: imgfile.image3,
    },
    {
      id: 4,
      name: 'i8',
      person: '2인',
      img: imgfile.image4,
    },
    {
      id: 5,
      name: 'i7',
      person: '5인',
      img: imgfile.image5,
    },
    {
      id: 6,
      name: '타이칸',
      person: '5인',
      img: imgfile.image6,
    },
    {
      id: 7,
      name: '카이엔',
      person: '5인',
      img: imgfile.image7,
    },
    {
      id: 8,
      name: '모델 Y',
      person: '5인',
      img: imgfile.image8,
    },
  ];
  return (
    <>
      <div className='carlist'>
        <div className='carlistcontainer'>
          {cars.map((car) => (
            <div className='carbox' key={car.id}>
              <div className='inbox'>
                <img src={`${car.img}`} className='img' />
                <div className='carinfo'>
                  차량명: {car.name}
                  <br />
                  탑승인원: {car.person}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carlist;

// const imgfile = {
//   image1: require('../../assets/car1.png'),
//   image2: require('../../assets/car2.png'),
//   image3: require('../../assets/car3.png'),
//   image4: require('../../assets/car4.png'),
//   image5: require('../../assets/car5.png'),
//   image6: require('../../assets/car6.png'),
//   image7: require('../../assets/car7.png'),
//   image8: require('../../assets/car8.png'),
// };
// export default imgfile;
