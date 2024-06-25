import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/Join.scss'; // Make sure this import matches the SCSS file location

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthday: '',
    phone: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('user', JSON.stringify(formData));
    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(
        '/api/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setMessage('Registration successful!');
    } catch (error) {
      setMessage(
        'Registration failed: ' +
          error.response.data.message,
      );
    }

    setLoading(false);
  };

  return (
    <div className='register-page'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Birthday:
          <input
            type='date'
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Profile Image:
          <input
            type='file'
            onChange={handleFileChange}
            accept='image/*'
          />
        </label>
        <button type='submit' disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
