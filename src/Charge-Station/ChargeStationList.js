import React from 'react';
import Station from './Station';
import '../scss/ChargeStationList.scss';

const ChargeStationList = () => {
  const stations = [
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
    {
      name: '한국ICT인재개발원 신촌센터',
      address: '서울 마포구 백범로 23 케이터틀',
      ac: 2,
      dc: 3,
    },
  ];

  return (
    <div className='ListContainer'>
      {stations.map((station, index) => (
        <Station
          key={index}
          name={station.name}
          address={station.address}
          ac={station.ac}
          dc={station.dc}
        />
      ))}
    </div>
  );
};

export default ChargeStationList;
