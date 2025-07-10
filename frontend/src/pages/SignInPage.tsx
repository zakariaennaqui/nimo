import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Logged in successfully!');
        navigate('/'); // Navigate to home or dashboard
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Illustration Side */}
          <div className="w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center p-8 text-white">
            <div className="mb-6">
              {/* Car illustration SVG */}
              <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M170 95H30C25.5817 95 22 91.4183 22 87V80C22 75.5817 25.5817 72 30 72H170C174.418 72 178 75.5817 178 80V87C178 91.4183 174.418 95 170 95Z" fill="white" />
                <path d="M160 72H40L50 50H150L160 72Z" fill="white" />
                <circle cx="58" cy="95" r="12" fill="#1E3A8A" stroke="white" strokeWidth="2" />
                <circle cx="142" cy="95" r="12" fill="#1E3A8A" stroke="white" strokeWidth="2" />
                <rect x="65" y="55" width="16" height="12" rx="2" fill="#BFDBFE" />
                <rect x="119" y="55" width="16" height="12" rx="2" fill="#BFDBFE" />
                <path d="M100 120C111.046 120 120 111.046 120 100C120 88.9543 111.046 80 100 80C88.9543 80 80 88.9543 80 100C80 111.046 88.9543 120 100 120Z" fill="#BFDBFE" />
                <path d="M97 100L102 105L108 95" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-center text-blue-100">
              Sign in to access your account and start renting premium cars for your next adventure.
            </p>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-500 p-6 text-center md:bg-white">
              <h1 className="text-white md:text-blue-500 text-2xl font-bold">Sign In</h1>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="john.doe@example.com"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      name="password"

                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.password}

                      onChange={handleChange}
                      minLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="mr-2"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-blue-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-6"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;