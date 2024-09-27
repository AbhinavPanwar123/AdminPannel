import React, { useContext } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

const Setting = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme from context
  const navigate = useNavigate();

  // Handle forgot password navigation
  const handleForgotPassword = () => {
    navigate('/forgot');
  };

  return (
    <Layout pageTitle="Settings">
      <div className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
          Settings
        </h1>

        {/* Forgot Password Section */}
        <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-xl p-8 mb-12 max-w-lg mx-auto transition-transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-white mb-4">
            Password & Security
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            If you need to reset your password, click the button below.
          </p>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg hover:from-indigo-500 hover:to-blue-500 transition duration-300 w-full"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
        </div>

        {/* Theme Preferences Section */}
        <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-xl p-8 mb-12 max-w-lg mx-auto transition-transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-white mb-4">
            Theme Preferences
          </h2>
          <button
            onClick={toggleTheme}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg hover:from-indigo-500 hover:to-blue-500 transition duration-300"
          >
            Switch to {theme === 'dark-theme' ? 'Light' : 'Dark'} Theme
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
