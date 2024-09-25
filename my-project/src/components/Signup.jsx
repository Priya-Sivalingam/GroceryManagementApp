import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';  // Import MUI Alert component

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');  // State to store error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/Signup', formData)  // Send formData directly
      .then(response => {
        if (response.data.status) {
          navigate('/Signin');  // Navigate to sign-in page on successful signup
        } else {
          setError(response.data.message);  // Set error message if signup fails
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again later.');  // Catch any errors
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Sign Up</h2>

        {error && (  // Conditionally render the alert if there's an error message
          <Alert severity="error" className="mb-4">{error}</Alert>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-gray-700">Username</label>
            <div className="mt-2"> 
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className='mt-6'>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account? 
            <a href="/Signin" className="text-indigo-500 hover:underline"> Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
