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
    backgroundColor: 'white', // Changed background color to white
    padding: '32px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    color: 'black', // Changed title color to black
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '32px',
    textAlign: 'center',
    color: 'black', // Changed subtitle color to black
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
    color: 'white', // Changed button text color to white
  };

  return (
    <Box style={containerStyle}>
      <Typography variant="h1" style={titleStyle}>
        Welcome to Forever Notes
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
          style={{ ...buttonStyle, backgroundColor: 'black' }} // Changed button background color to black
        >
          Submit Information
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/lookup"
          style={{ ...buttonStyle, borderColor: 'black', color: 'black' }} // Changed button border color and text color to black
        >
          Find Information
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
