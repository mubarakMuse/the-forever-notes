import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Switch,
    FormControlLabel,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LookupForm = () => {
    const navigate = useNavigate();

    const [isOwner, setIsOwner] = useState(true);
    const [lookupName, setLookupName] = useState('');
    const [lookupAccessCode, setLookupAccessCode] = useState('');
    const [lookupEmail, setLookupEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [note, setNote] = useState('');
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [isLookupSuccessful, setIsLookupSuccessful] = useState(false);

    const airtableAPIKey = process.env.REACT_APP_AIRTABLE_API_KEY;
    const airtableBaseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
    const airtableTable = 'theforevernotes';


    const handleLookup = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`,
                {
                    headers: {
                        Authorization: `Bearer ${airtableAPIKey}`,
                    },
                }
            );

            const records = response.data.records;

            let foundRecord = null;

            for (const record of records) {
                const { firstName, accessCode, beneficiaries } =
                    record.fields;

                if (isOwner) {
                    if (firstName === lookupName && accessCode === lookupAccessCode) {
                        foundRecord = record;
                        break;
                    }
                } else {
                    if (beneficiaries) {
                        const parsedBeneficiaries = JSON.parse(beneficiaries);
                        const matchingBeneficiary = parsedBeneficiaries.find(
                            (beneficiary) =>
                                beneficiary.email === lookupEmail &&
                                beneficiary.accessCode === lookupAccessCode
                        );

                        if (matchingBeneficiary) {
                            foundRecord = record;
                            break;
                        }
                    }
                }
            }

            if (foundRecord) {
                const { note, beneficiaries } = foundRecord.fields;

                setNote(JSON.parse(note).text);

                if (beneficiaries) {
                    setBeneficiaries(JSON.parse(beneficiaries));
                } else {
                    setBeneficiaries([]);
                }

                setIsLookupSuccessful(true);
            } else {
                setNote('No matching record found.');
                setBeneficiaries([]);
                setIsLookupSuccessful(true);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error looking up data:', error);
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setIsOwner(!isOwner);
        setLookupName('');
        setLookupAccessCode('');
        setLookupEmail('');
        setNote('');
        setBeneficiaries([]);
        setIsLookupSuccessful(false);
    };

    const handleGoBack = () => {
        navigate('/'); // Navigate back to home page
    };

    return (
        <Container maxWidth="md">
            <Box mt={5} p={3} boxShadow={2} borderRadius={10}>
                <Typography variant="h6" gutterBottom>
                    Lookup Information
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isOwner}
                            onChange={handleToggle}
                            color="primary"
                        />
                    }
                    label="Lookup for Owner"
                />
                <form>
                    {isOwner ? (
                        <Box>
                            {/* Owner Form */}
                            <TextField
                                label="Your First Name"
                                value={lookupName}
                                onChange={(e) => setLookupName(e.target.value)}
                                required
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Access Code"
                                value={lookupAccessCode}
                                onChange={(e) => setLookupAccessCode(e.target.value)}
                                required
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                    ) : (
                        <Box>
                            {/* Beneficiary Form */}
                            <TextField
                                label="Your Email"
                                type="email"
                                value={lookupEmail}
                                onChange={(e) => setLookupEmail(e.target.value)}
                                required
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Access Code"
                                value={lookupAccessCode}
                                onChange={(e) => setLookupAccessCode(e.target.value)}
                                required
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLookup}
                        style={{ marginTop: '16px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Lookup'}
                    </Button>
                </form>
                {isLookupSuccessful && (
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Note
                        </Typography>
                        <Typography>{note}</Typography>
                        {isOwner && (
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    Beneficiaries
                                </Typography>
                                {beneficiaries.length > 0 ? (
                                    beneficiaries.map((beneficiary, index) => (
                                        <Box key={index}>
                                            <Typography>
                                                Beneficiary {index + 1}:
                                                <br />
                                                Name: {beneficiary.name}
                                                <br />
                                                Email: {beneficiary.email}
                                                <br />
                                                Access Code: {beneficiary.accessCode}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No beneficiaries found.</Typography>
                                )}
                            </div>
                        )}
                    </Box>
                )}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGoBack}
                    style={{ marginTop: '16px' }}
                >
                    Go Back to Home Page
                </Button>
            </Box>
        </Container>
    );
};

export default LookupForm;
