import React, { useEffect, useState } from 'react';

const CarInfo = () => {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetch('/carsData.json')
      .then((response) => response.json())
      .then((data) => setCarsData(data))
      .catch((error) =>
        console.error('Error fetching data:', error),
      );
  }, []);

  return (
    <>
      {carsData.map((data) => (
        <div key={data.id} className='carDataContainer'>
          <img src={data.img} />
          <div className='carData'>
            <h2>{data.name}</h2>
            <p>브랜드: {data.brand}</p>
            <p>승객 수: {data.passenger}</p>
            <p>연식: {data.year}</p>
            <p>편의옵션: {data.ConvinOp}</p>
            <p>안전옵션: {data.safetyOp}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CarInfo;
