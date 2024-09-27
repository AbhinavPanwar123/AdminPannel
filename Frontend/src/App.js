import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Component/Login/AdminSignIn';
import Dashboard from './Component/Dashboard/Dashboard';
import AdminCheck from './Component/ProtectedRoutes/AdminCheck';
import Product from './Component/Products/Product';
import Check from './Component/ProtectedRoutes/Check';
import ForgotPassword from './Component/ForgotPassword/Admin/Forgot';
import ResetPassword from './Component/ForgotPassword/Admin/resetPass';
import Seller from './Component/Seller/Seller';
import Profile from './Component/Seller/Profile';
import Setting from './Component/Setting/Setting';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';
import { ThemeContext } from './ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);
 
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark-theme' ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Check Component={SignIn} />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<AdminCheck Component={Dashboard} />} />
          <Route path="/product" element={<AdminCheck Component={Product} />} />
          <Route path="/seller" element={<AdminCheck Component={Seller} />} />
          <Route path="/setting" element={<AdminCheck Component={Setting} />} />
          <Route path="/seller/profile/:id" element={<AdminCheck Component={Profile} />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
