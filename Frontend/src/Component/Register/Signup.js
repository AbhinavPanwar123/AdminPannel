import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { signup } from '../Redux/Slices/RegisterSlice';
import{Avatar,
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
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state)=>state?.register?.users[0])
  console.log('data->',userData)

  const formik = useFormik({
    initialValues: {
      name:userData?.name ||'',
      email: userData?.email ||'',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values,action) => {
      try {
        await axios.post('http://localhost:5000/users/user', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        dispatch(signup(values))
        navigate("/");
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
                autoFocus
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                  <Link href="/" variant="body2">
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

export default SignUp;
