// SuccessPage.js
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

const SuccessPage = ({ accessCode, beneficiaries, navigate }) => {
  return (
    <Container maxWidth="md">
      <Box mt={5} p={3} boxShadow={2} borderRadius={10}>
        <Typography variant="h6" gutterBottom>
          Success! Your Information has been Submitted
        </Typography>
        <Typography>
          Your access code: {accessCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Access Codes for Recipient(s)
        </Typography>
        {beneficiaries.map(({ name, accessCode }, index) => (
          <Typography key={index}>
            {name} : {accessCode}
          </Typography>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          style={{ marginTop: '16px' }}
        >
          Go Back to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
