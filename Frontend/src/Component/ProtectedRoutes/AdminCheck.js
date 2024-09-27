import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminCheck = ({ Component }) => {
  if (!localStorage.getItem('email')) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default AdminCheck;
