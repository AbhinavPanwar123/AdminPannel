import React from 'react';
import { Navigate } from 'react-router-dom';

const Check = ({ Component }) => {

  if(localStorage.getItem('email')){
    console.log("protected");
   return <Navigate to="/dashboard"/>
  }

  return (
    <>
       <Component />
     </>
   )

};

export default Check;