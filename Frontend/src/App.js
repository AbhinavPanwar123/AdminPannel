import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Component/Login/SignIn';
import Dashboard from './Component/Dashboard/Dashboard';
import AdminCheck from './Component/ProtectedRoutes/AdminCheck';
import User from './Component/Users/User';
import Product from './Component/Products/Product';
import Check from './Component/ProtectedRoutes/Check';
import SignUp from './Component/Register/Signup';
import ForgotPassword from './Component/ForgotPassword/Forgot';
import ResetPassword from './Component/ForgotPassword/resetPass';
import Seller from './Component/Seller/Seller';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Check Component={SignIn} />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<AdminCheck Component={Dashboard} />} />
        <Route path="/user" element={<AdminCheck Component={User} />} />
        <Route path="/product" element={<AdminCheck Component={Product} />} />
        <Route path="/seller" element={<AdminCheck Component={Seller} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
