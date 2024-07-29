import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminCheck = ({ Component }) => {

  console.log("localStorage.getItem('email')-<", !localStorage.getItem('email'));
  if(!localStorage.getItem('email')){
    console.log("in");
    return <Navigate to="/"/>
  }

  return (
    <>
      <Component />
    </>
  );
};

export default AdminCheck;

