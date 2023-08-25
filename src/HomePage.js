import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '32px',
  };

  const titleStyle = {
    fontSize: '3rem',
    marginBottom: '16px',
    textAlign: 'center',
    color: '#333',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '32px',
    textAlign: 'center',
    color: '#555',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  };

  const buttonStyle = {
    width: '200px',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <Box style={containerStyle}>
      <Typography variant="h1" style={titleStyle}>
        Welcome to The Forever Notes
      </Typography>
      <Typography variant="h6" style={subtitleStyle}>
        Store and access important information securely.
      </Typography>
      <Box style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/create"
          style={buttonStyle}
        >
          Submit Information
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/lookup"
          style={buttonStyle}
        >
          Find Information
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
