import React, { useState } from 'react';
import Button from '@mui/material/Button';  // Import MUI Button
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';  // Import MUI Alert component

const Signin = () => {
  const [formData, setFormData] = useState({
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

  Axios.defaults.withCredentials = true;  // Ensures cookies are sent with requests

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/Signin', formData)  // Send formData directly
      .then(response => {
        if (response.data.status) {  // Check if the status is true
          navigate('/'); 
        } else {
          setError('Sign-in failed. Invalid email or password.');  // Set error message
        }
      })
      .catch(err => {
        console.error(err);  // Handle errors in the console
        setError('An error occurred. Please try again later.');  // Set generic error message
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Sign In</h2>

        {/* Display the Alert component if there's an error */}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
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
              Sign In
            </Button>
            <div className='mt-4'>
            <a href="/forgetPassword" className="text-indigo-500 hover:underline"> Forget Password?</a>
            </div>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account? 
            <a href="/Signup" className="text-indigo-500 hover:underline"> Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
