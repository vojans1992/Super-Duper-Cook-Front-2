import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import './App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const loginUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/login?username=${username}&password=${password}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000',
        },
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        console.log('Error during login');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 2 },
        }}
      >
        <TextField
          className="custom-textfield"          
          label="Username"
          variant="filled"
          color="primary"
          required
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="custom-textfield"
          label="Password"
          type="password"
          variant="filled"
          color="primary"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <ColorButton onClick={loginUser} variant="contained">
        Login
      </ColorButton>
   
      <div className="textLogin">
          Don't have an account? <Link href="/signup">Sign Up</Link>          
        </div>  
    </div>
  );
};

export default Login;