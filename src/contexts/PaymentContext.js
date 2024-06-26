import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  return (
    <PaymentContext.Provider
      value={{ paymentSuccess, setPaymentSuccess }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
