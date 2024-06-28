import React, { useState } from 'react';
import {
  API_BASE_URL,
  USER,
} from '../../../../config/host-config';
import handleRequest from '../../../../util/handleRequest';
import axiosInstance from '../../../../config/axios-config';

const UserInfoUpdate = () => {
  const URL = API_BASE_URL + USER;

  const [token, setToken] = useState('');

  const updateUser = (userName, phoneNumber, birthDay) => {
    handleRequest(
      () => axiosInstance.put(`${URL}/update`),
      (data) => {
        localStorage.setItem('ACCESS_TOKEN', data.token);
        localStorage.setItem(
          'LOGIN_USERNAME',
          data.userName,
        );
        localStorage.setItem(
          'USER_PHONENUMBER',
          data.phoneNumber,
        );
        setToken(data.token);
      },
    );
  };
};

export default UserInfoUpdate;
