import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../login.png';
import { message } from 'antd';
import api from '../Pages/api';
import TokenService from '../lib/localStorageService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    const hideMessage = message.loading('Logging in, please wait...', 0);

    try {
      e.preventDefault();
      const response = await api.post(`/auth/login`, {
        email,
        password,
        userRole: 'student',
      });
      const token = response?.data?.accessToken;
      hideMessage();
      TokenService.setToken(token);

      message.success('Login successful! Redirecting to dashboard...');
      navigate('/courses');
    } catch (error: any) {
      message.error(
        error.response?.data?.message ||
          'An error occurred during login. Please try again.'
      );
      console.error('Error while logging in user:', error.message);
      hideMessage();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-4xl h-[700px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-200 to-indigo-800 items-center justify-center">
          <img src={login} alt="Login" className="w-3/4" />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Welcome Back!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="username"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="mt-1 w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="mt-1 w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
