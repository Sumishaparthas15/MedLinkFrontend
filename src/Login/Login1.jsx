import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MedNavbar from '../Patients/PatComponents/MedNavbar';
import Footer from '../Patients/PatComponents/Footer';

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login1 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient'); // Default to 'patient'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [customError, setCustomError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setCustomError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let response;

      if (role === 'patient') {
        response = await axios.post('http://localhost:8080/api/patient_login/', { email, password });
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('patientEmail', email);
        localStorage.setItem("access", JSON.stringify(access_token));
        localStorage.setItem("refresh", JSON.stringify(refresh_token));
        navigate('/');
      } else if (role === 'hospital') {
        response = await axios.post('http://localhost:8080/api/hospital_login/', { email, password });
        const token = response.data.access;
        const hospitalId = response.data.hospital_id;
        localStorage.setItem('token', token);
        localStorage.setItem('hospitalEmail', email);
        localStorage.setItem('hospital_id', hospitalId); 
        navigate('/hospital_dashboard');
      } else if (role === 'admin') {
        response = await axios.post('http://localhost:8080/api/admin_login/', { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/overview');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        setCustomError('Account not approved by admin or OTP verification pending.');
      } else if (error.response && error.response.status === 401) {
        setCustomError('Invalid credentials.');
      } else {
        setCustomError('Server error. Please try again later.');
      }
    }
  };

  const renderRoleButtons = () => {
    const roles = ['patient', 'hospital', 'admin'];
    const otherRoles = roles.filter((r) => r !== role);

    return (
      <>
        {otherRoles.map((otherRole) => (
          <Button
            key={otherRole}
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setRole(otherRole)}
          >
            Login as {otherRole.charAt(0).toUpperCase() + otherRole.slice(1)}
          </Button>
        ))}
      </>
    );
  };

  return (
    <div>
      <MedNavbar />
      
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {role.charAt(0).toUpperCase() + role.slice(1)} Login
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              {customError && (
                <Typography color="error" variant="body2">
                  {customError}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </Box>
            {role === 'patient' && (
            <Link href="/register/patient/" variant="body2">
              {"Don't have an account? Register as Patient"}
            </Link>
          )}
          {role === 'hospital' && (
            <Link href="/hossignup" variant="body2">
              {"Don't have an account? Register as Hospital"}
            </Link>
          )}

            {renderRoleButtons()}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
};

export default Login1;
