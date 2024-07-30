import React, { useState } from 'react';
import { Container, Paper, Box, Avatar, Typography, Grid, Link, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import EmailVerify from './Verify';
import ChangePassword from './ChangePassword';

const defaultTheme = createTheme();

const ForgotPasscode = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleEmailVerify = (email, token) => {
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
              <EmailVerify
                setMessage={setMessage}
                setError={setError}
                setEmail={setEmail}
                setResetToken={setResetToken}
                onEmailVerified={handleEmailVerify}
              />
            ) : (
              <ChangePassword
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
                  <Link component={RouterLink} to="/sellerSignin" variant="body2">
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

export default ForgotPasscode;
