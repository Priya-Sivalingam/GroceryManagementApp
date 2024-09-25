import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert'; // Import MUI Alert component

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');   // State to store error message
  const [success, setSuccess] = useState(''); // State to store success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    // Clear any previous errors and success messages
    setError('');
    setSuccess('');

    Axios.post('http://localhost:3000/auth/forgot-password', formData)
      .then(response => {
        if (response.data.status) {
          setSuccess("Please check your email for password reset instructions");
          setTimeout(() => navigate('/Signin'), 3000); // Redirect to Signin after 3 seconds
        } else {
          setError(response.data.message);
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again later.'); // Catch any backend errors
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Forget Password</h2>

        {/* Display error or success alert */}
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            {success}
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

          <div className="mt-6">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
