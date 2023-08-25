// InformationForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SuccessPage from './SuccessPage';
import axios from 'axios';

const InformationForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [noteText, setNoteText] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([
    { name: '', email: '', accessCode: '' },
  ]);

  const airtableAPIKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const airtableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
  const airtableTable = 'theforevernotes';


  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleBeneficiaryChange = (index, field, value) => {
    const updatedBeneficiaries = [...beneficiaries];
    updatedBeneficiaries[index][field] = value;
    setBeneficiaries(updatedBeneficiaries);
  };

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: '', email: '', accessCode: '' }]);
  };

  const removeBeneficiary = (index) => {
    const updatedBeneficiaries = [...beneficiaries];
    updatedBeneficiaries.splice(index, 1);
    setBeneficiaries(updatedBeneficiaries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert note and beneficiaries to JSON strings
    const noteJson = JSON.stringify({
      text: noteText,
      timestamp: new Date().toISOString(),
    });
    const beneficiariesJson = JSON.stringify(beneficiaries);

    const dataStore = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      accessCode,
      note: noteJson,
      beneficiaries: beneficiariesJson,
    };

    try {
      // Perform API call to save data in Airtable
      await axios.post(
        `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`,
        {
          fields: dataStore,
        },
        {
          headers: {
            Authorization: `Bearer ${airtableAPIKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the access code state
      setAccessCode(accessCode);

      // Update the success state to true
      setSuccess(true);
    } catch (error) {
      console.error('Error saving data to Airtable:', error);
      // Handle error here
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      {success ? (
        <SuccessPage
          accessCode={accessCode}
          beneficiaries={beneficiaries}
          navigate={navigate}
        />
      ) : (
        <Box mt={5} p={3} boxShadow={2} borderRadius={10}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Access Code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Leave a Note
                </Typography>
                <TextField
                  label="Note"
                  value={noteText}
                  onChange={handleNoteChange}
                  multiline
                  rows={4}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Beneficiaries
                </Typography>
                {beneficiaries.map((beneficiary, index) => (
                  <Box key={index} mb={2} display="flex" alignItems="center">
                    <TextField
                      label={`Full Name of Beneficiary ${index + 1}`}
                      value={beneficiary.name}
                      onChange={(e) =>
                        handleBeneficiaryChange(index, 'name', e.target.value)
                      }
                      required
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label={`Email of Beneficiary ${index + 1}`}
                      type="email"
                      value={beneficiary.email}
                      onChange={(e) =>
                        handleBeneficiaryChange(index, 'email', e.target.value)
                      }
                      required
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label={`Access Code of Beneficiary ${index + 1}`}
                      value={beneficiary.accessCode}
                      onChange={(e) =>
                        handleBeneficiaryChange(
                          index,
                          'accessCode',
                          e.target.value
                        )
                      }
                      required
                      fullWidth
                      margin="dense"
                    />
                    {index > 0 && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => removeBeneficiary(index)}
                        style={{ marginLeft: '8px' }}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                ))}
                {beneficiaries.length < 3 && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addBeneficiary}
                    fullWidth
                  >
                    Add Another Beneficiary
                  </Button>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '16px' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/')}
                  style={{ marginTop: '16px' }}
                >
                  Go Back to Home Page
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default InformationForm;


