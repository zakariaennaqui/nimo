import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdLock } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        // Optional: Verify token is valid before showing reset form
        await axios.get(`/api/auth/verify-reset-token/${token}`);
      } catch (err) {
        setIsValidToken(false);
        setError('Invalid or expired password reset link');
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsValidToken(false);
      setError('Reset token is missing');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await axios.post('/api/auth/reset-password', {
        token,
        password
      });
      
      setIsSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
      
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to reset password');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow p-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error || 'Invalid or expired password reset link'}
          </div>
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-blue-500 hover:text-blue-600">
              Request a new password reset link
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow">
        {/* Header */}
        <div className="bg-blue-500 text-white py-5 px-6 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>
        
        <div className="px-6 py-8">
          {!isSuccess ? (
            <>
              <p className="text-gray-600 mb-6">
                Please enter your new password below.
              </p>
              
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-gray-700">
                    New Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <MdLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full focus:outline-none"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">
                    Confirm Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <MdLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-medium transition duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Resetting...' : 'Set New Password'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p>Password reset successful!</p>
                <p className="text-sm mt-1">You will be redirected to the login page shortly.</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <a href="/signin" className="inline-flex items-center text-blue-500 hover:text-blue-600">
              <IoArrowBack className="mr-1" />
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;