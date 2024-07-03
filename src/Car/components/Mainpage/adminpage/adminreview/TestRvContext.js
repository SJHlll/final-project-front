import React, { createContext, useState } from 'react';

export const TestRvContext = createContext();

export const TestRvProvider = ({ children }) => {
  const [review, setReview] = useState([]);

  return (
    <TestRvContext.Provider value={{ review, setReview }}>
      {children}
    </TestRvContext.Provider>
  );
};
