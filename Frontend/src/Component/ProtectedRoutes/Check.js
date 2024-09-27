import React from 'react';
import { Navigate } from 'react-router-dom';

const Check = ({ Component }) => {
  if (localStorage.getItem('email')) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default Check;
