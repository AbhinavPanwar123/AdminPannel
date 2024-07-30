import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Redux/Slices/RegisterSlice';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Paper,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Z][a-zA-Z ]{2,}$/, 'Name must start with a capital letter and be at least 3 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10,12}$/, 'Phone number must be between 10 and 12 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    gstin: Yup.string()
      .matches(/^[A-Za-z0-9]{15}$/, 'GSTIN must be 15 alphanumeric characters')
      .required('GSTIN is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
               'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character')
      .required('Password is required'),
  });

const SellerSignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sellerData = useSelector((state) => state?.register?.sellers[0]);
  console.log('data->', sellerData);

  const formik = useFormik({
    initialValues: {
      name: sellerData?.name || '',
      email: sellerData?.email || '',
      phone: sellerData?.phone || '',
      address: sellerData?.address || '',
      gstin: sellerData?.gstin || '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      try {
        await axios.post('http://localhost:5000/users/sellerSignup', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        dispatch(signup(values));
        action.resetForm();
        navigate("/sellerSignin");
      } catch (error) {
        setError(error.response?.data?.msg || 'An error occurred');
        console.error('Error during sign up:', error);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                autoFocus
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                autoComplete="phone"
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('phone')}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                autoComplete="address"
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('address')}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                fullWidth
                id="gstin"
                name="gstin"
                label="GST Number"
                autoComplete="gstin"
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('gstin')}
                error={formik.touched.gstin && Boolean(formik.errors.gstin)}
                helperText={formik.touched.gstin && formik.errors.gstin}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sellerSignin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SellerSignUp;
