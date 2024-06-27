import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();

  return (
    <>
      <h1>EventDetail</h1>
      <p>ID : {id}</p>
    </>
  );
};

export default EventDetail;
