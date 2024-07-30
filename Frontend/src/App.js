import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Component/Login/AdminSignIn';
import Dashboard from './Component/Dashboard/Dashboard';
import AdminCheck from './Component/ProtectedRoutes/AdminCheck';
import Product from './Component/Products/Product';
import Check from './Component/ProtectedRoutes/Check';
import ForgotPassword from './Component/ForgotPassword/Admin/Forgot';
import ResetPassword from './Component/ForgotPassword/Admin/resetPass';
import Seller from './Component/Seller/Seller';
import SellerSignUp from './Component/Register/SellerSignup';
import SellerSignIn from './Component/Login/SellerSignin';
import ForgotPasscode from './Component/ForgotPassword/Seller/ForgotPasscode';
import ChangePassword from './Component/ForgotPassword/Seller/ChangePassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* //Admin */}
        <Route path="/" element={<Check Component={SignIn} />} />
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

       {/* //Seller */}
        <Route path="/sellerSignin" element={<SellerSignIn/>} />
        <Route path='/sellerSignup' element={<SellerSignUp/>}/>
        <Route path='/sellerForgot' element={<ForgotPasscode/>}/>
        <Route path="/changePassword/:token" element={<ChangePassword />} />

        <Route path="/dashboard" element={<AdminCheck Component={Dashboard} />} />
        <Route path="/product" element={<AdminCheck Component={Product} />} />
        <Route path="/seller" element={<AdminCheck Component={Seller} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
