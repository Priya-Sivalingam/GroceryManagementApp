import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert'; // Import MUI Alert component

const ResetPassword = () => {
  const { token } = useParams(); 
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError("Both fields are required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear any previous errors and success messages
    setError('');
    setSuccess('');

    try {
      // Use the token from useParams directly
      const response = await Axios.post('http://localhost:3000/auth/reset-password', { 
        token, 
        password: formData.password 
      });

      if (response.data.status) {
        setSuccess("Your password has been reset successfully. Redirecting to Sign in...");
        setTimeout(() => navigate('/Signin'), 3000); // Redirect to Signin after 3 seconds
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.'); // Catch any backend errors
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Reset Password</h2>

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
            <label className="block text-gray-700 mb-2">New Password</label>
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

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="mt-2">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
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
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
