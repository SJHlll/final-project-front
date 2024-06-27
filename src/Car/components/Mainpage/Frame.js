import React from 'react';
import './Frame.scss';
const Frame = ({ children }) => {
  return (
    <div className='maincontainer'>
      <div className='contentline'>{children}</div>
    </div>
  );
};

export default Frame;
