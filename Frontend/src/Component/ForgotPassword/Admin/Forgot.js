import React, { useState } from 'react';
import { Container, Paper, Box, Avatar, Typography, Grid, Link, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import EmailVerification from './emailVerify';
import ResetPassword from './resetPass';

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleEmailVerification = (email, token) => {
    setEmail(email);
    setResetToken(token);
    setIsEmailVerified(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
              Forgot Password
            </Typography>
            {!isEmailVerified ? (
              <EmailVerification
                setMessage={setMessage}
                setError={setError}
                setEmail={setEmail}
                setResetToken={setResetToken}
                onEmailVerified={handleEmailVerification}
              />
            ) : (
              <ResetPassword
                email={email}
                resetToken={resetToken}
                navigate={navigate}
              />
            )}
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {message && (
              <Typography sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            {!isEmailVerified && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/" variant="body2">
                    Remembered your password? Sign in
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
