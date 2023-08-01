import React from 'react';
import './Login.css'; // Ako imate poseban CSS fajl za stilizaciju Login komponente, uvezite ga ovde
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 10 },
        }}
      >
        <TextField
          style={{ marginBottom: '1px', color: 'black' }} // Boja teksta u TextField-u
          className="custom-textfield"
          helperText={<span className="white-helper-text">Please enter your username</span>}
          id="demo-helper-text-aligned-username"
          label="Username"
          variant="filled"
          color="primary"
        />
        <TextField
          style={{ marginBottom: '1px', color: 'black' }} // Boja teksta u TextField-u
          className="custom-textfield"
          helperText={<span className="white-helper-text">Please enter your password</span>}
          id="demo-helper-text-aligned-password"
          label="Password"
          type="password"
          variant="filled"
          color="primary"
        />
      </Box>
      {/* Dodajte ostatak vašeg koda za login stranicu */}
    </div>
  );
};

export default Login;